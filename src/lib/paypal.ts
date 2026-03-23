const PAYPAL_API = process.env.PAYPAL_SANDBOX === "true"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com";

function validateOrderId(orderId: string): void {
  if (!/^[A-Z0-9]{13,20}$/.test(orderId)) {
    throw new Error("Invalid PayPal order ID format");
  }
}

let cachedToken: { token: string; expiry: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiry) {
    return cachedToken.token;
  }

  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    throw new Error("PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET are required");
  }

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status}`);
  }

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("PayPal returned no access token");
  }

  cachedToken = {
    token: data.access_token,
    expiry: Date.now() + ((data.expires_in || 32400) - 60) * 1000,
  };

  return data.access_token;
}

export async function createOrder(): Promise<{ id: string; approvalUrl: string }> {
  const token = await getAccessToken();
  const baseUrl = process.env.BASE_URL || "https://superskills-one.vercel.app";

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "50.00",
          },
          description: "SuperSkills — 106 Pro Skills for Claude Code",
        },
      ],
      application_context: {
        brand_name: "SuperSkills",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: `${baseUrl}/api/paypal/complete`,
        cancel_url: `${baseUrl}/#pricing`,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("PayPal create order failed:", data.name, data.message);
    throw new Error(data.name || "PayPal order creation failed");
  }

  const approvalUrl = data.links?.find(
    (link: { rel: string; href: string }) => link.rel === "approve"
  )?.href || `https://www${process.env.PAYPAL_SANDBOX === "true" ? ".sandbox" : ""}.paypal.com/checkoutnow?token=${data.id}`;

  return { id: data.id, approvalUrl };
}

export async function captureOrder(orderId: string): Promise<{
  status: string;
  payer_email?: string;
  payer_name?: string;
  amount?: string;
  currency?: string;
}> {
  validateOrderId(orderId);
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("PayPal capture failed:", res.status, data.name);
    return { status: "FAILED" };
  }

  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];

  return {
    status: data.status,
    payer_email: data.payer?.email_address,
    payer_name: data.payer?.name
      ? `${data.payer.name.given_name || ""} ${data.payer.name.surname || ""}`.trim()
      : undefined,
    amount: capture?.amount?.value,
    currency: capture?.amount?.currency_code,
  };
}

export async function verifyOrderAmount(
  orderId: string,
  expectedAmount: string,
  expectedCurrency: string
): Promise<boolean> {
  validateOrderId(orderId);
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return false;

  const data = await res.json();
  const unit = data.purchase_units?.[0]?.amount;

  return (
    unit?.value === expectedAmount &&
    unit?.currency_code === expectedCurrency
  );
}
