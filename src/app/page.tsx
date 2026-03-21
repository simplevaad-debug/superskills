"use client";

import dynamic from "next/dynamic";
import { I18nProvider } from "@/lib/i18n/context";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { AccessibilityWidget } from "@/components/ui/accessibility-widget";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { CategoriesGrid } from "@/components/sections/categories-grid";
import { SkillBrowser } from "@/components/sections/skill-browser";
import { HowItWorks } from "@/components/sections/how-it-works";
import { BeforeAfter } from "@/components/sections/before-after";
import { PricingCard } from "@/components/sections/pricing-card";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { ProductJsonLd } from "@/components/seo/json-ld";

const Background3D = dynamic(
  () => import("@/components/ui/background-3d").then((m) => m.Background3D),
  { ssr: false }
);

export default function Home() {
  return (
    <I18nProvider>
      <ProductJsonLd />
      <SkipToContent />
      <Background3D />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content" role="main" tabIndex={-1}>
          <Hero />
          <StatsBar />
          <CategoriesGrid />
          <SkillBrowser />
          <HowItWorks />
          <BeforeAfter />
          <PricingCard />
          <FAQ />
        </main>
        <Footer />
      </div>
      <AccessibilityWidget />
    </I18nProvider>
  );
}
