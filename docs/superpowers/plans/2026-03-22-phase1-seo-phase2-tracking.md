# Phase 1 (Technical SEO) + Phase 2 (Tracking) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete SEO infrastructure (sitemap, robots, structured data, meta tags) and full analytics tracking (GTM, GA4, Meta Pixel, Search Console) to the SuperSkills landing page.

**Architecture:** All SEO files use Next.js 16 App Router file conventions (`sitemap.ts`, `robots.ts`). Tracking uses a single GTM container script with data layer events pushed from React components. No new dependencies needed.

**Tech Stack:** Next.js 16 App Router, TypeScript, Vercel, Google Tag Manager, GA4, Meta Pixel

**Spec:** `docs/superpowers/specs/2026-03-21-seo-tracking-blog-design.md`

**Important:** Next.js 16 has breaking changes. Before implementing metadata APIs, check `node_modules/next/dist/docs/` for current conventions.

**Security note:** JSON-LD and GTM scripts use `dangerouslySetInnerHTML` — this is safe here because all content is hardcoded server-side constants, never user input.

---

## File Structure

### New Files
```
src/app/sitemap.ts              — Dynamic XML sitemap
src/app/robots.ts               — robots.txt
src/components/seo/json-ld.tsx  — Structured data (Product, FAQ, Organization)
src/components/seo/gtm.tsx      — GTM script + noscript components
src/lib/analytics.ts            — Data layer push helper + event types
public/og-image.png             — Static OG image (1200x630)
```

### Modified Files
```
src/app/layout.tsx              — Add GTM script, GSC verification, enhanced metadata
src/app/page.tsx                — Add JSON-LD structured data component
src/components/sections/pricing-card.tsx  — Push purchase_click event
src/components/sections/skill-browser.tsx — Push skill_search event
src/components/sections/faq.tsx           — Push faq_expand event
src/lib/i18n/context.tsx                  — Push language_change event
src/app/success/success-content.tsx       — Push purchase_complete + download_click events
.env.local                      — Add GTM_ID, GA4_ID, META_PIXEL_ID, GSC_VERIFICATION
.env.example                    — Add placeholder env vars
```

---

### Task 1: robots.ts

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create robots.ts**

Use Next.js 16 MetadataRoute.Robots convention. Configure:
- userAgent: "*", allow: "/", disallow: ["/api/", "/success/", "/private/"]
- sitemap pointing to BASE_URL/sitemap.xml

- [ ] **Step 2: Verify locally**

Run: `npm run dev` then open `http://localhost:3000/robots.txt`
Expected: Valid robots.txt with sitemap URL and disallow rules

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat: add robots.txt with sitemap reference"
```

---

### Task 2: sitemap.ts

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create sitemap.ts**

Use Next.js 16 MetadataRoute.Sitemap convention. Include:
- Homepage (priority 1.0, weekly)
- /tos, /terms, /refund (priority 0.3, yearly)
- Comment placeholder for blog posts (Phase 3)

- [ ] **Step 2: Verify locally**

Open `http://localhost:3000/sitemap.xml`
Expected: Valid XML sitemap with 4 URLs

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add dynamic sitemap.xml"
```

---

### Task 3: JSON-LD Structured Data

**Files:**
- Create: `src/components/seo/json-ld.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create JSON-LD component**

Create `ProductJsonLd` component that renders 3 JSON-LD script blocks:
1. **Product schema** — name, description, price $50 USD, InStock, brand SuperSkills
2. **FAQ schema** — 8 FAQ items from the English translations (hardcoded server-side constants)
3. **Organization schema** — name SuperSkills, URL, logo

All data is hardcoded constants (not user input), making the use of script injection safe.

- [ ] **Step 2: Add JSON-LD to page.tsx**

Import `ProductJsonLd` and add it inside the `I18nProvider`, before `SkipToContent`.

- [ ] **Step 3: Verify**

View page source at `http://localhost:3000`, search for `application/ld+json`. Should see 3 JSON-LD blocks.

- [ ] **Step 4: Commit**

```bash
git add src/components/seo/json-ld.tsx src/app/page.tsx
git commit -m "feat: add Product, FAQ, Organization structured data"
```

---

### Task 4: Enhanced Metadata + OG Image

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `public/og-image.png`

- [ ] **Step 1: Update metadata in layout.tsx**

Replace existing metadata export. Add:
- `metadataBase` pointing to BASE_URL
- `alternates.canonical: "/"`
- `openGraph.images` with `/og-image.png` (1200x630)
- `twitter.card: "summary_large_image"` with image
- `other` fields: `product:price:amount: "50.00"`, `product:price:currency: "USD"`

- [ ] **Step 2: Create placeholder OG image**

Create a simple 1200x630 placeholder PNG at `public/og-image.png`. User will replace with designed version later.

- [ ] **Step 3: Verify**

View page source. Check for og:image, twitter:card, canonical link, product:price meta tags.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx public/og-image.png
git commit -m "feat: enhance metadata with OG image, Twitter Card, canonical URL"
```

---

### Task 5: GTM Script Component

**Files:**
- Create: `src/components/seo/gtm.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `.env.local`
- Modify: `.env.example`

- [ ] **Step 1: Create GTM component**

Create `GTMHead` (uses next/script with afterInteractive strategy) and `GTMNoScript` components. Both read from `NEXT_PUBLIC_GTM_ID` env var. Return null if env var is not set (graceful degradation).

The GTM script is the standard Google-provided snippet — it is safe to inject as it only loads the GTM container.

- [ ] **Step 2: Add GTM to layout.tsx**

Add `GTMHead` inside `<head>` area (or after `<html>` tag). Add `GTMNoScript` right after `<body>` opening.

- [ ] **Step 3: Add env vars**

Add to `.env.local` (empty values — user fills in after creating GTM account):
```
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
```

Add same to `.env.example` with placeholder values.

- [ ] **Step 4: Verify**

Open page source. Without GTM_ID set, no GTM script should render. With it set, GTM script should load.

- [ ] **Step 5: Commit**

```bash
git add src/components/seo/gtm.tsx src/app/layout.tsx .env.example
git commit -m "feat: add GTM container with graceful env var fallback"
```

---

### Task 6: Analytics Helper + Data Layer Events

**Files:**
- Create: `src/lib/analytics.ts`

- [ ] **Step 1: Create analytics helper**

Create `pushEvent(event, params)` function that pushes to `window.dataLayer`. Add typed helpers:
- `analytics.purchaseClick()` — value: 50, currency: USD
- `analytics.purchaseComplete()` — value: 50, currency: USD
- `analytics.downloadClick()`
- `analytics.languageChange(locale)`
- `analytics.skillSearch(query)`
- `analytics.faqExpand(question)`

Add Window type augmentation for `dataLayer`.

- [ ] **Step 2: Commit**

```bash
git add src/lib/analytics.ts
git commit -m "feat: add analytics data layer helper with typed events"
```

---

### Task 7: Wire Events into Components

**Files:**
- Modify: `src/components/sections/pricing-card.tsx`
- Modify: `src/components/sections/skill-browser.tsx`
- Modify: `src/components/sections/faq.tsx`
- Modify: `src/lib/i18n/context.tsx`
- Modify: `src/app/success/success-content.tsx`

- [ ] **Step 1: pricing-card.tsx — purchase_click**

Import `analytics`. Call `analytics.purchaseClick()` in `handleCheckout` after `setLoading(true)`.

- [ ] **Step 2: skill-browser.tsx — skill_search**

Import `analytics`. When search term changes and is non-empty, call `analytics.skillSearch(search)` with a 500ms debounce to avoid firing on every keystroke.

- [ ] **Step 3: faq.tsx — faq_expand**

Import `analytics`. When opening a FAQ item (not closing), call `analytics.faqExpand(faq.q)`.

- [ ] **Step 4: i18n/context.tsx — language_change**

Import `analytics`. Inside `setLocale`, call `analytics.languageChange(newLocale)`.

- [ ] **Step 5: success-content.tsx — purchase_complete + download_click**

Import `analytics` and `useEffect`. Fire `analytics.purchaseComplete()` on mount via `useEffect`. Add `onClick={() => analytics.downloadClick()}` to the download link.

- [ ] **Step 6: Verify**

Open browser console. Navigate site — click Buy, search skills, expand FAQ, change language. Check `window.dataLayer` has entries for each event.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/pricing-card.tsx src/components/sections/skill-browser.tsx src/components/sections/faq.tsx src/lib/i18n/context.tsx src/app/success/success-content.tsx
git commit -m "feat: wire analytics events into all interactive components"
```

---

### Task 8: Google Search Console Verification

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add GSC verification meta tag**

In metadata `other` field, conditionally add `google-site-verification` from `NEXT_PUBLIC_GSC_VERIFICATION` env var.

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Google Search Console verification meta tag"
```

---

### Task 9: Build + Deploy + Verify

- [ ] **Step 1: Run build**

```bash
npx next build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

- [ ] **Step 3: Verify SEO**

After deploy:
1. Open `https://superskills-one.vercel.app/robots.txt` — should show robots rules
2. Open `https://superskills-one.vercel.app/sitemap.xml` — should show 4 URLs
3. View page source on homepage — should have 3 JSON-LD blocks
4. Check meta tags: og:image, twitter:card, canonical, product:price
5. If GTM ID is set: check GTM script is loaded

- [ ] **Step 4: Submit to Search Console**

1. Go to Google Search Console
2. Add property: `https://superskills-one.vercel.app`
3. Verify via HTML meta tag (already added)
4. Submit sitemap: `https://superskills-one.vercel.app/sitemap.xml`

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: Phase 1 (SEO) + Phase 2 (Tracking) complete"
```
