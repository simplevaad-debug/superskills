import { NextRequest, NextResponse } from "next/server";
import { captureOrder, verifyOrderAmount } from "@/lib/paypal";
import { generateDownloadToken } from "@/lib/tokens";
import { savePurchase, isOrderAlreadyUsed } from "@/lib/supabase";

const EXPECTED_AMOUNT = "50.00";
const EXPECTED_CURRENCY = "USD";

function redirect(url: string, req: NextRequest) {
  const res = NextResponse.redirect(new URL(url, req.url));
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return res;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const payerId = req.nextUrl.searchParams.get("PayerID");

  if (!token || !payerId) {
    return redirect("/#pricing", req);
  }

  try {
    // Atomic replay guard
    const alreadyUsed = await isOrderAlreadyUsed(token);
    if (alreadyUsed) {
      return redirect("/#pricing", req);
    }

    const orderValid = await verifyOrderAmount(token, EXPECTED_AMOUNT, EXPECTED_CURRENCY);
    if (!orderValid) {
      console.error(`Order ${token} failed amount verification`);
      return redirect("/#pricing", req);
    }

    const result = await captureOrder(token);

    if (result.status === "COMPLETED") {
      // savePurchase throws on failure — no silent swallowing
      const saved = await savePurchase({
        paypal_order_id: token,
        payer_email: result.payer_email,
        payer_name: result.payer_name,
        amount: result.amount || EXPECTED_AMOUNT,
        currency: result.currency || EXPECTED_CURRENCY,
        status: "COMPLETED",
      });

      if (!saved) {
        // Duplicate order — already processed
        return redirect("/#pricing", req);
      }

      const downloadToken = generateDownloadToken(token);
      return redirect(`/success?token=${downloadToken}`, req);
    }

    return redirect("/#pricing", req);
  } catch (error) {
    console.error("PayPal complete error:", error);
    return redirect("/#pricing", req);
  }
}
