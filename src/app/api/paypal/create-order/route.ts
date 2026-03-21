import { NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

export async function POST() {
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
