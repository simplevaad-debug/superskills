import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GTMHead, GTMNoScript } from "@/components/seo/gtm";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0b",
};

export const metadata: Metadata = {
  title: "SuperSkills — 106 Pro Skills for Claude Code | $50",
  description:
    "Supercharge Claude Code with 106 expert-crafted skills across 15 categories. Frontend, backend, DevOps, marketing, AI/ML, and more. One ZIP, instant upgrade.",
  metadataBase: new URL(
    process.env.BASE_URL || "https://superskills-one.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SuperSkills — 106 Pro Skills for Claude Code",
    description:
      "Supercharge Claude Code with 106 expert-crafted skills. One purchase, instant upgrade.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["he_IL", "ar_SA"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SuperSkills — 106 Pro Skills for Claude Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperSkills — 106 Pro Skills for Claude Code",
    description:
      "106 expert-crafted skills for Claude Code. One ZIP, instant upgrade. $50.",
    images: ["/og-image.png"],
  },
  other: {
    "color-scheme": "dark",
    "product:price:amount": "50.00",
    "product:price:currency": "USD",
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { "google-site-verification": process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <GTMHead />
      <body className="min-h-screen bg-[#0a0a0b]">
        <GTMNoScript />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
