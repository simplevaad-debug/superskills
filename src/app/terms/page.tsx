"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n/context";

function TermsContent() {
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

        <h1 className="text-3xl font-bold mb-2">{t("terms.title")}</h1>
        <p className="text-sm text-[#52525b] mb-10">
          {t("terms.lastUpdated")}: March 21, 2026
        </p>

        <div className="space-y-8 text-[#a1a1aa] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              1. {t("terms.s1.title")}
            </h2>
            <p>{t("terms.s1.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              2. {t("terms.s2.title")}
            </h2>
            <p>{t("terms.s2.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              3. {t("terms.s3.title")}
            </h2>
            <p>{t("terms.s3.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              4. {t("terms.s4.title")}
            </h2>
            <p>{t("terms.s4.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              5. {t("terms.s5.title")}
            </h2>
            <p>{t("terms.s5.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              6. {t("terms.s6.title")}
            </h2>
            <p>{t("terms.s6.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#fafafa] mb-3">
              7. {t("terms.s7.title")}
            </h2>
            <p>
              {t("terms.s7.body")}{" "}
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

export default function TermsPage() {
  return (
    <I18nProvider>
      <TermsContent />
    </I18nProvider>
  );
}
