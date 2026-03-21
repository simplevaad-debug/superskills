"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { icon: CreditCard, num: "01", title: t("how.step1.title"), description: t("how.step1.desc") },
    { icon: Download, num: "02", title: t("how.step2.title"), description: t("how.step2.desc") },
    { icon: Rocket, num: "03", title: t("how.step3.title"), description: t("how.step3.desc") },
  ];

  return (
    <section className="py-20 bg-[#0a0a0b]/80" id="how-it-works" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="how-heading" className="text-3xl sm:text-4xl font-bold text-white mb-3">{t("how.title")}</h2>
          <p className="text-[#a1a1aa] text-base">{t("how.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative border border-[#27272a] rounded-xl p-6 hover:bg-[#141415] transition-colors"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D97757]/10 rounded-lg flex items-center justify-center border border-[#D97757]/20">
                  <step.icon className="w-5 h-5 text-[#D97757]" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-mono text-[#52525b]">{step.num}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
