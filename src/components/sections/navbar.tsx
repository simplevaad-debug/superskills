"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ClaudeLogo } from "@/components/claude-logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useI18n } from "@/lib/i18n/context";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#27272a] bg-[#0a0a0b]/80 backdrop-blur-md" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 cursor-pointer">
            <ClaudeLogo className="w-7 h-7" />
            <span className="text-lg font-semibold text-white">SuperSkills</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#pricing"
              className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {t("nav.cta")}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              className="text-white p-1 cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#0a0a0b]/95 backdrop-blur-md border-t border-[#27272a]"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-[#a1a1aa] hover:text-white py-1.5 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="block bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium text-center mt-3 cursor-pointer"
              >
                {t("nav.cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
