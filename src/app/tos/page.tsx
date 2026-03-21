"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n/context";

function TosContent() {
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

        <h1 className="text-3xl font-bold mb-2">{t("tos.title")}</h1>
        <p className="text-sm text-[#52525b] mb-10">
          {t("terms.lastUpdated")}: March 21, 2026
        </p>

        <div className="space-y-8 text-[#a1a1aa] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              1. {t("tos.s1.title")}
            </h2>
            <p>{t("tos.s1.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              2. {t("tos.s2.title")}
            </h2>
            <p>{t("tos.s2.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              3. {t("tos.s3.title")}
            </h2>
            <p>{t("tos.s3.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              4. {t("tos.s4.title")}
            </h2>
            <p>{t("tos.s4.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              5. {t("tos.s5.title")}
            </h2>
            <p>{t("tos.s5.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              6. {t("tos.s6.title")}
            </h2>
            <p>{t("tos.s6.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              7. {t("tos.s7.title")}
            </h2>
            <p>{t("tos.s7.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              8. {t("tos.s8.title")}
            </h2>
            <p>
              {t("tos.s8.body")}{" "}
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

export default function TosPage() {
  return (
    <I18nProvider>
      <TosContent />
    </I18nProvider>
  );
}
