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

function headers() {
  const key = getSupabaseKey();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

/**
 * Save purchase atomically. Returns false if order already exists (duplicate).
 * Throws on unexpected errors.
 */
export async function savePurchase(data: {
  paypal_order_id: string;
  payer_email?: string;
  payer_name?: string;
  amount: string;
  currency: string;
  status: string;
}): Promise<boolean> {
  const res = await fetch(`${getSupabaseUrl()}/rest/v1/purchases`, {
    method: "POST",
    headers: {
      ...headers(),
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 409) {
    return false; // Duplicate — already processed
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to save purchase: ${text}`);
  }

  return true;
}

export async function isOrderAlreadyUsed(paypal_order_id: string): Promise<boolean> {
  const res = await fetch(
    `${getSupabaseUrl()}/rest/v1/purchases?paypal_order_id=eq.${encodeURIComponent(paypal_order_id)}&select=id&limit=1`,
    { headers: headers() }
  );
  if (!res.ok) return true; // Fail closed
  const data = await res.json();
  return data.length > 0;
}

/**
 * Track download count per order. Returns current count.
 */
export async function trackDownload(orderId: string): Promise<number> {
  // Get current download count
  const res = await fetch(
    `${getSupabaseUrl()}/rest/v1/purchases?paypal_order_id=eq.${encodeURIComponent(orderId)}&select=download_count`,
    { headers: headers() }
  );

  if (!res.ok) return 999; // Fail closed

  const data = await res.json();
  if (data.length === 0) return 999;

  const currentCount = data[0].download_count || 0;

  // Increment download count
  await fetch(
    `${getSupabaseUrl()}/rest/v1/purchases?paypal_order_id=eq.${encodeURIComponent(orderId)}`,
    {
      method: "PATCH",
      headers: { ...headers(), Prefer: "return=minimal" },
      body: JSON.stringify({ download_count: currentCount + 1 }),
    }
  );

  return currentCount + 1;
}
