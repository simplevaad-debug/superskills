import { NextRequest, NextResponse } from "next/server";
import { captureOrder, verifyOrderAmount } from "@/lib/paypal";
import { generateDownloadToken } from "@/lib/tokens";
import { isOrderAlreadyUsed, savePurchase } from "@/lib/supabase";

const EXPECTED_AMOUNT = "50.00";
const EXPECTED_CURRENCY = "USD";

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();

    if (!orderID || typeof orderID !== "string") {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const alreadyUsed = await isOrderAlreadyUsed(orderID);
    if (alreadyUsed) {
      return NextResponse.json(
        { error: "Order already processed" },
        { status: 409 }
      );
    }

    const orderValid = await verifyOrderAmount(orderID, EXPECTED_AMOUNT, EXPECTED_CURRENCY);
    if (!orderValid) {
      return NextResponse.json(
        { error: "Order verification failed" },
        { status: 403 }
      );
    }

    const result = await captureOrder(orderID);

    if (result.status === "COMPLETED") {
      const saved = await savePurchase({
        paypal_order_id: orderID,
        payer_email: result.payer_email,
        payer_name: result.payer_name,
        amount: result.amount || EXPECTED_AMOUNT,
        currency: result.currency || EXPECTED_CURRENCY,
        status: "COMPLETED",
      });

      if (!saved) {
        return NextResponse.json(
          { error: "Order already processed" },
          { status: 409 }
        );
      }

      const token = generateDownloadToken(orderID);
      return NextResponse.json({
        status: "COMPLETED",
        downloadUrl: `/api/download?token=${token}`,
      });
    }

    return NextResponse.json({ status: result.status });
  } catch (error: unknown) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture payment" },
      { status: 500 }
    );
  }
}
