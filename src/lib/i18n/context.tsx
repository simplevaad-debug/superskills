"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { type Locale, translations, localeConfig } from "./translations";
import { analytics } from "@/lib/analytics";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    analytics.languageChange(newLocale);
    if (typeof window !== "undefined") {
      document.documentElement.lang = newLocale;
      document.documentElement.dir = localeConfig[newLocale].dir;
      localStorage.setItem("locale", newLocale);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && translations[saved]) {
      setLocale(saved);
    }
  }, [setLocale]);

  const t = useCallback(
    (key: string) => translations[locale][key] || translations.en[key] || key,
    [locale]
  );

  const dir = localeConfig[locale].dir;
  const isRtl = dir === "rtl";

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir, isRtl }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
