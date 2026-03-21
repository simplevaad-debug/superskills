"use client";

import Link from "next/link";
import { ClaudeLogo } from "@/components/claude-logo";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-8 border-t border-[#27272a] bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ClaudeLogo className="w-4 h-4" />
              <span className="text-sm font-medium text-[#71717a]">
                SuperSkills
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/tos"
                className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
              >
                {t("footer.tos")}
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/refund"
                className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
              >
                {t("footer.refund")}
              </Link>
              <Link
                href="/accessibility"
                className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
              >
                {t("footer.accessibility")}
              </Link>
            </div>
          </div>
          <p className="text-xs text-[#52525b] text-center sm:text-start">
            &copy; {new Date().getFullYear()} SuperSkills.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
