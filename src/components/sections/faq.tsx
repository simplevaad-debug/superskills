"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";
import { analytics } from "@/lib/analytics";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q8"), a: t("faq.a8") },
  ];

  // Split into 2 columns
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  const renderFaq = (faq: { q: string; a: string }, globalIndex: number) => (
    <div key={globalIndex} className="border-b border-[#27272a] last:border-b-0">
      <button
        onClick={() => {
          if (openIndex !== globalIndex) analytics.faqExpand(faq.q);
          setOpenIndex(openIndex === globalIndex ? null : globalIndex);
        }}
        className="w-full flex items-center justify-between py-4 text-start cursor-pointer group"
        aria-expanded={openIndex === globalIndex}
        aria-controls={`faq-answer-${globalIndex}`}
      >
        <span className="font-medium text-[#e4e4e7] text-sm pe-4 group-hover:text-white transition-colors">
          {faq.q}
        </span>
        <ChevronRight
          className={cn(
            "w-4 h-4 text-[#52525b] flex-shrink-0 transition-transform duration-200",
            openIndex === globalIndex && "rotate-90 text-[#D97757]"
          )}
          strokeWidth={2}
        />
      </button>
      <div
        id={`faq-answer-${globalIndex}`}
        role="region"
        aria-hidden={openIndex !== globalIndex}
        className={cn(
          "overflow-hidden transition-all duration-200",
          openIndex === globalIndex ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <p className="text-sm text-[#71717a] leading-relaxed pe-8">
          {faq.a}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-20 border-t border-[#27272a] bg-[#0a0a0b]/80" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-white">
            {t("faq.title")}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Left column */}
          <div className="border-t border-[#27272a]">
            {leftFaqs.map((faq, i) => renderFaq(faq, i))}
          </div>
          {/* Right column */}
          <div className="border-t border-[#27272a]">
            {rightFaqs.map((faq, i) => renderFaq(faq, i + mid))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
