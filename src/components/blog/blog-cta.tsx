"use client";

import { Zap, Loader2 } from "lucide-react";
import { useCheckout } from "@/lib/use-checkout";

export function BlogCta() {
  const { checkout, loading } = useCheckout();

  return (
    <div className="my-10 rounded-xl border border-[#27272a] bg-[#141415] p-6 text-center">
      <div className="flex justify-center mb-3">
        <Zap className="w-8 h-8 text-[#D97757]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        Get all 106 skills for $50
      </h3>
      <p className="text-[#71717a] text-sm mb-5">
        One ZIP, instant upgrade. Frontend, backend, DevOps, marketing, and more.
      </p>
      <button
        onClick={checkout}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Get SuperSkills — $50 →"
        )}
      </button>
    </div>
  );
}
