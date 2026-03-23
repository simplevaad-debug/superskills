"use client";

import { useState, useCallback, useRef } from "react";

// Global lock to prevent multiple concurrent checkouts across components
let globalCheckoutInProgress = false;

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(false);

  const checkout = useCallback(async () => {
    if (loading || globalCheckoutInProgress) return;
    globalCheckoutInProgress = true;
    abortRef.current = false;
    setLoading(true);

    try {
      const res = await fetch("/api/paypal/create-order", { method: "POST" });
      if (abortRef.current) return;

      const data = await res.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        globalCheckoutInProgress = false;
        setLoading(false);
      }
    } catch {
      globalCheckoutInProgress = false;
      setLoading(false);
    }
  }, [loading]);

  return { checkout, loading };
}
