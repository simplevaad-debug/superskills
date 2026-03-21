"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal } from "lucide-react";
import { categories } from "@/lib/skills-data";
import { useI18n } from "@/lib/i18n/context";
import { analytics } from "@/lib/analytics";

export function SkillBrowser() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    if (!search) return;
    const timer = setTimeout(() => analytics.skillSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredSkills = useMemo(() => {
    if (!search.trim()) return categories[activeCategory].skills;
    const q = search.toLowerCase();
    return categories
      .flatMap((c) => c.skills)
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.slug.includes(q) ||
          s.description.toLowerCase().includes(q)
      );
  }, [activeCategory, search]);

  return (
    <section className="py-20 bg-[#141415]/50 border-y border-[#27272a]" id="skills" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold text-white mb-3">{t("skills.title")}</h2>
          <p className="text-[#a1a1aa] text-base">{t("skills.subtitle")}</p>
        </motion.div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
            <input
              type="text"
              placeholder={t("skills.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search skills"
              className="w-full pl-10 pr-4 py-2.5 bg-[#141415] border border-[#27272a] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D97757]/50 focus:border-[#D97757] placeholder:text-[#52525b]"
            />
          </div>
        </div>

        {!search && (
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide justify-center flex-wrap">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === i
                    ? "bg-[#D97757] text-white"
                    : "bg-[#141415] text-[#a1a1aa] hover:text-white border border-[#27272a] hover:border-[#3f3f46]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={search || activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {filteredSkills.map((skill, index) => (
              <div
                key={`${skill.slug}-${index}`}
                className="bg-[#141415] border border-[#27272a] rounded-lg p-4 hover:border-[#D97757]/40 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-[#52525b] mt-0.5 flex-shrink-0 group-hover:text-[#D97757] transition-colors" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <h3 className="font-medium text-white text-sm">{skill.name}</h3>
                    <p className="text-xs text-[#71717a] mt-1 line-clamp-2 leading-relaxed">{skill.description}</p>
                    <code className="text-[11px] text-[#D97757] mt-1.5 block font-mono">/{skill.slug}</code>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <p className="text-center text-[#52525b] py-12 text-sm">
            {t("skills.noResults")} &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </section>
  );
}
