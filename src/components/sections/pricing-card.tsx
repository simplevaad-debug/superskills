"use client";

import { motion } from "framer-motion";
import { Check, Zap, Shield, Clock, Package, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { ClaudeLogo } from "@/components/claude-logo";
import { useI18n } from "@/lib/i18n/context";
import { analytics } from "@/lib/analytics";

const highlights = [
  { icon: Package, label: "106 Skills" },
  { icon: Zap, label: "Instant Download" },
  { icon: Clock, label: "1 Year Updates" },
  { icon: Shield, label: "Secure Payment" },
];

export function PricingCard() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  const features = [
    t("pricing.f1"), t("pricing.f2"), t("pricing.f3"), t("pricing.f4"),
    t("pricing.f5"), t("pricing.f6"), t("pricing.f7"), t("pricing.f8"),
  ];

  const [error, setError] = useState<string | null>(null);
  const [lastClick, setLastClick] = useState(0);

  const handleCheckout = async () => {
    if (loading) return;
    if (Date.now() - lastClick < 5000) return; // 5 שניות בין לחיצות
    setLastClick(Date.now());
    setLoading(true);
    analytics.purchaseClick();
    setError(null);
    try {
      const res = await fetch("/api/paypal/create-order", { method: "POST" });
      const data = await res.json();
      if (data.approvalUrl) {
        try {
          const url = new URL(data.approvalUrl);
          if (url.hostname.endsWith(".paypal.com") && url.protocol === "https:") {
            window.location.href = data.approvalUrl;
            return;
          } else {
            setError(t("pricing.error") || "Something went wrong. Please try again.");
            setLoading(false);
          }
        } catch {
          setError(t("pricing.error") || "Something went wrong. Please try again.");
          setLoading(false);
        }
      } else {
        setError(t("pricing.error") || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError(t("pricing.error") || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#0a0a0b] relative overflow-hidden" id="pricing" aria-labelledby="pricing-heading">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(217, 119, 87, 0.08), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold text-white mb-3">{t("pricing.title")}</h2>
          <p className="text-[#a1a1aa] text-base">{t("pricing.subtitle")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {highlights.map((h) => (
            <div key={h.label} className="flex items-center justify-center gap-2 py-3 border border-[#27272a] rounded-lg bg-[#141415]/50">
              <h.icon className="w-4 h-4 text-[#D97757]" strokeWidth={1.5} />
              <span className="text-xs text-[#a1a1aa] font-medium">{h.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="border border-[#27272a] rounded-2xl overflow-hidden bg-[#141415] max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-e border-[#27272a]">
              <div className="flex items-center gap-2 mb-6">
                <ClaudeLogo className="w-6 h-6" />
                <span className="text-sm text-[#a1a1aa] font-medium">{t("pricing.pack")}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-bold text-white">$50</span>
                <span className="text-sm text-[#52525b]">{t("pricing.oneTime")}</span>
              </div>

              <p className="text-sm text-[#71717a] mb-8">
                {t("pricing.subtitle")}
              </p>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-white text-black py-3.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("pricing.loading")}
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    {t("pricing.cta")}
                  </>
                )}
              </button>

              {error && (
                <p className="text-center text-xs text-red-400 mb-2">{error}</p>
              )}

              <p className="text-center text-[11px] text-[#52525b]">
                {t("pricing.secure")}
              </p>
            </div>

            <div className="p-8 md:p-10">
              <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
                What&apos;s included
              </h3>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#3fb950] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-sm text-[#a1a1aa]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
