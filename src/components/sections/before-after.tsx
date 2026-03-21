"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function BeforeAfter() {
  const { t } = useI18n();

  const without = [t("ba.w1"), t("ba.w2"), t("ba.w3"), t("ba.w4"), t("ba.w5")];
  const withSkills = [t("ba.s1"), t("ba.s2"), t("ba.s3"), t("ba.s4"), t("ba.s5")];

  return (
    <section className="py-20 border-y border-[#27272a] bg-[#141415]/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("ba.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <motion.div
            className="border border-[#27272a] rounded-xl p-6"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-semibold text-[#52525b] uppercase tracking-wider mb-5">
              {t("ba.without")}
            </h3>
            <ul className="space-y-3">
              {without.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#71717a]">
                  <X className="w-4 h-4 text-red-500/70 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="border border-[#D97757]/30 rounded-xl p-6 bg-[#D97757]/5"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-5">
              {t("ba.with")}
            </h3>
            <ul className="space-y-3">
              {withSkills.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white">
                  <Check className="w-4 h-4 text-[#3fb950] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
