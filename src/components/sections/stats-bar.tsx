"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

export function StatsBar() {
  const { t } = useI18n();

  const stats = [
    { value: "106", label: t("stats.skills") },
    { value: "15", label: t("stats.categories") },
    { value: "Every", label: t("stats.stacks") },
    { value: "$50", label: t("stats.price") },
  ];

  return (
    <section className="py-10 border-y border-[#27272a] bg-[#141415]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-[#71717a] mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
