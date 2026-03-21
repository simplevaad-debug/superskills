import { NextRequest, NextResponse } from "next/server";
import { captureOrder, verifyOrderAmount } from "@/lib/paypal";
import { generateDownloadToken } from "@/lib/tokens";
import { savePurchase, isOrderAlreadyUsed } from "@/lib/supabase";

const EXPECTED_AMOUNT = "50.00";
const EXPECTED_CURRENCY = "USD";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/#pricing", req.url));
  }

  try {
    // Prevent replay attack: reject if order was already processed
    const alreadyUsed = await isOrderAlreadyUsed(token);
    if (alreadyUsed) {
      return NextResponse.redirect(new URL("/#pricing", req.url));
    }

    const orderValid = await verifyOrderAmount(token, EXPECTED_AMOUNT, EXPECTED_CURRENCY);
    if (!orderValid) {
      console.error(`Order ${token} failed amount verification`);
      return NextResponse.redirect(new URL("/#pricing", req.url));
    }

    const result = await captureOrder(token);

    if (result.status === "COMPLETED") {
      // Save purchase to DB
      await savePurchase({
        paypal_order_id: token,
        payer_email: result.payer_email,
        payer_name: result.payer_name,
        amount: result.amount || EXPECTED_AMOUNT,
        currency: result.currency || EXPECTED_CURRENCY,
        status: "COMPLETED",
      });

      const downloadToken = generateDownloadToken(token);
      return NextResponse.redirect(
        new URL(`/success?token=${downloadToken}`, req.url)
      );
    }

    return NextResponse.redirect(new URL("/#pricing", req.url));
  } catch (error) {
    console.error("PayPal complete error:", error);
    return NextResponse.redirect(new URL("/#pricing", req.url));
  }
}
