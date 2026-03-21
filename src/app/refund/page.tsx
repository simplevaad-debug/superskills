"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n/context";

function RefundContent() {
  const { t, locale } = useI18n();
  const isRtl = locale === "he" || locale === "ar";

  return (
    <div
      className="min-h-screen bg-[#0a0a0b] text-[#fafafa]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#71717a] hover:text-[#D97757] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("legal.back")}
        </Link>

        <h1 className="text-3xl font-bold mb-2">{t("refund.title")}</h1>
        <p className="text-sm text-[#52525b] mb-10">
          {t("terms.lastUpdated")}: March 21, 2026
        </p>

        <div className="space-y-8 text-[#a1a1aa] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              {t("refund.s1.title")}
            </h2>
            <p>{t("refund.s1.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              {t("refund.s2.title")}
            </h2>
            <p>{t("refund.s2.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              {t("refund.s3.title")}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t("refund.s3.f1")}</li>
              <li>{t("refund.s3.f2")}</li>
              <li>{t("refund.s3.f3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              {t("refund.s4.title")}
            </h2>
            <p>
              {t("refund.s4.body")}{" "}
              <a
                href="mailto:netanelpro0123@gmail.com"
                className="text-[#D97757] hover:underline"
              >
                netanelpro0123@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function RefundPage() {
  return (
    <I18nProvider>
      <RefundContent />
    </I18nProvider>
  );
}
