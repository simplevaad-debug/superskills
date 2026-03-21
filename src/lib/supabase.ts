const envCache: Record<string, string> = {};

function requireEnv(name: string): string {
  if (!envCache[name]) {
    const value = process.env[name];
    if (!value) throw new Error(`${name} environment variable is required`);
    envCache[name] = value;
  }
  return envCache[name];
}

function getSupabaseUrl() { return requireEnv("SUPABASE_URL"); }
function getSupabaseKey() { return requireEnv("SUPABASE_SERVICE_KEY"); }

export async function savePurchase(data: {
  paypal_order_id: string;
  payer_email?: string;
  payer_name?: string;
  amount: string;
  currency: string;
  status: string;
}) {
  const res = await fetch(`${getSupabaseUrl()}/rest/v1/purchases`, {
    method: "POST",
    headers: {
      apikey: getSupabaseKey(),
      Authorization: `Bearer ${getSupabaseKey()}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Failed to save purchase:", await res.text());
  }
}

export async function isOrderAlreadyUsed(paypal_order_id: string): Promise<boolean> {
  const res = await fetch(
    `${getSupabaseUrl()}/rest/v1/purchases?paypal_order_id=eq.${encodeURIComponent(paypal_order_id)}&select=id&limit=1`,
    {
      headers: {
        apikey: getSupabaseKey(),
        Authorization: `Bearer ${getSupabaseKey()}`,
      },
    }
  );
  if (!res.ok) return true; // Fail closed: treat DB errors as "already used"
  const data = await res.json();
  return data.length > 0;
}
