"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Monitor, Server, Database, Cloud, Network, Shield,
  TrendingUp, Search, Mail, Megaphone, Brain, Gamepad2,
  Store, TestTube, Building2,
} from "lucide-react";
import { categories } from "@/lib/skills-data";
import { useI18n } from "@/lib/i18n/context";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Server, Database, Cloud, Network, Shield,
  TrendingUp, Search, Mail, Megaphone, Brain, Gamepad2,
  Store, TestTube, Building2,
};

export function CategoriesGrid() {
  const { t } = useI18n();

  return (
    <section className="py-20 bg-[#0a0a0b]/80" id="categories" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="categories-heading" className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t("categories.title")}
          </h2>
          <p className="text-[#a1a1aa] text-base max-w-xl mx-auto">
            {t("categories.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Monitor;
            return (
              <motion.div
                key={cat.name}
                className="group border border-[#27272a] rounded-xl p-5 hover:bg-[#141415] hover:border-[#3f3f46] transition-all cursor-default"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#141415] group-hover:bg-[#1c1c1e] rounded-lg flex items-center justify-center border border-[#27272a]">
                    <Icon className="w-4 h-4 text-[#D97757]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                    <p className="text-xs text-[#71717a]">{cat.skills.length} skills</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill.slug}
                      className="text-[11px] bg-[#D97757]/10 text-[#D97757] rounded-full px-2.5 py-0.5 font-mono border border-[#D97757]/20"
                    >
                      {skill.slug}
                    </span>
                  ))}
                  {cat.skills.length > 3 && (
                    <span className="text-[11px] text-[#52525b] px-1 py-0.5">
                      +{cat.skills.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
