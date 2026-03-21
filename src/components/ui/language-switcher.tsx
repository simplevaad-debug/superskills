"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { localeConfig, type Locale } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer px-2 py-1.5 rounded-md hover:bg-[#27272a]"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium">{localeConfig[locale].flag}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 bg-[#141415] border border-[#27272a] rounded-lg shadow-xl z-50 py-1 min-w-[140px]">
            {(Object.keys(localeConfig) as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer ${
                  locale === loc
                    ? "text-white bg-[#27272a]"
                    : "text-[#a1a1aa] hover:text-white hover:bg-[#1c1c1e]"
                }`}
              >
                <span>{localeConfig[loc].flag}</span>
                <span>{localeConfig[loc].label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
