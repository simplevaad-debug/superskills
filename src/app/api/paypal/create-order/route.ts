import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { id, approvalUrl } = await createOrder();
    return NextResponse.json({ id, approvalUrl });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("PayPal create order error:", msg);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
