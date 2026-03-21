"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ClaudeLogo } from "@/components/claude-logo";
import { useI18n } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="hero-heading" className="relative min-h-screen flex flex-col items-center justify-start pt-28 pb-16 px-6 overflow-hidden">
      {/* Glow effects */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(217, 119, 87, 0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute top-[200px] right-[10%] w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent 70%)",
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27272a] bg-[#141415]/80 backdrop-blur-sm">
          <ClaudeLogo className="w-4 h-4" />
          <span className="text-xs text-[#a1a1aa]">{t("hero.badge")}</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        id="hero-heading"
        className="text-4xl md:text-5xl lg:text-7xl font-bold text-center max-w-4xl leading-[1.1] mb-6"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255,255,255,0.6))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.03em",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {t("hero.title1")}
        <br />
        {t("hero.title2")}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-base md:text-lg text-[#a1a1aa] text-center max-w-2xl mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t("hero.subtitle")}
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a
          href="#pricing"
          className="bg-white text-black px-7 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-2"
        >
          {t("hero.cta")}
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#skills"
          className="text-sm text-[#a1a1aa] hover:text-white transition-colors cursor-pointer px-4 py-3"
        >
          {t("hero.browse")}
        </a>
      </motion.div>

      {/* Terminal mockup */}
      <motion.div
        className="w-full max-w-3xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div
          className="absolute -inset-4 rounded-2xl pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(217, 119, 87, 0.2), transparent 70%)",
          }}
        />
        <div className="relative bg-[#141415] rounded-xl border border-[#27272a] overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a] bg-[#0f0f10]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f85149]" />
              <div className="w-3 h-3 rounded-full bg-[#d29922]" />
              <div className="w-3 h-3 rounded-full bg-[#3fb950]" />
            </div>
            <span className="text-xs text-[#52525b] font-mono">claude-code</span>
            <div className="w-16" />
          </div>
          <div className="p-5 font-mono text-[13px] leading-7 space-y-1">
            <p>
              <span className="text-[#3fb950]">~</span>
              <span className="text-[#52525b]"> $ </span>
              <span className="text-[#c9d1d9]">unzip superskills.zip -d ~/.claude/skills/</span>
            </p>
            <p className="text-[#52525b]">extracting: 106 skills across 15 categories...</p>
            <p className="text-[#3fb950]">Done. Claude Code supercharged.</p>
            <p className="mt-3">
              <span className="text-[#3fb950]">~</span>
              <span className="text-[#52525b]"> $ </span>
              <span className="text-[#c9d1d9]">claude</span>
            </p>
            <p>
              <span className="text-[#D97757]">/react-expert</span>
              <span className="text-[#52525b]"> </span>
              <span className="text-[#c9d1d9]">Build a dashboard with server components</span>
            </p>
            <p className="text-[#3fb950]">Activating react-expert — React 18+ with RSC, Suspense...</p>
            <p className="mt-3">
              <span className="text-[#D97757]">/seo-audit</span>
              <span className="text-[#52525b]"> </span>
              <span className="text-[#c9d1d9]">Audit my landing page for technical SEO</span>
            </p>
            <p className="text-[#3fb950]">Activating seo-audit — Core Web Vitals, meta tags...</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
