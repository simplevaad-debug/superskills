# SuperSkills — SEO, Tracking & Blog Design

## Context

SuperSkills is a single-page Next.js 16 landing page selling 106 Claude Code skills for $50 via PayPal. The site supports EN/HE/AR (i18n via client-side context, not URL segments). Currently deployed at https://superskills-one.vercel.app.

**Problem:** The site has zero SEO infrastructure — no sitemap, no robots.txt, no structured data, no blog, no tracking beyond Vercel Analytics. The site is the sole sales channel (no sales calls, no other funnels). Every visitor must be captured, measured, and converted.

**Goal:** Maximize organic traffic and conversions by implementing technical SEO, full analytics tracking, and a content blog in 3 languages.

**Target audience:** Developers (beginner to advanced) using Claude, Claude Code, and Cline who want to improve their AI-assisted development skills.

**Competition:** No direct competitors selling skills packages. Free skills exist scattered across GitHub repos but require manual discovery and setup.

**Important:** Next.js 16 has breaking changes. Consult `node_modules/next/dist/docs/` before implementing `sitemap.ts`, `robots.ts`, metadata APIs, and route handlers.

---

## Prerequisites

### i18n Routing Strategy
The current site uses **client-side i18n** (React context + localStorage). For SEO, blog posts MUST have unique URLs per language so Google can index each version separately.

**Chosen approach:** Blog uses URL-based locale prefix (`/blog/[slug]` for EN, `/he/blog/[slug]` for HE, `/ar/blog/[slug]` for AR). The homepage remains client-side i18n (single URL, content switches dynamically). This is a pragmatic hybrid — no need to restructure the entire site.

### New Dependencies
- `next-mdx-remote` — MDX rendering for blog posts
- No other new dependencies required (GTM/GA4/Meta Pixel are loaded via script tags, not npm packages)

---

## Phase 1: Technical SEO (Foundation)

### 1.1 sitemap.xml
- Dynamic Next.js `sitemap.ts` in `src/app/`
- Includes: homepage, all blog posts, terms/tos/refund pages
- Auto-updates when new blog posts are added
- Multi-language blog entries with `hreflang` alternates

### 1.2 robots.txt
- Next.js `robots.ts` in `src/app/`
- Allow all crawlers on public pages
- Disallow: `/api/`, `/success/`, `/private/`
- Point to sitemap URL

### 1.3 Structured Data (JSON-LD)
- **Product schema** on homepage:
  - Name: "SuperSkills — 106 Pro Skills for Claude Code"
  - Price: $50.00 USD
  - Availability: InStock
  - Brand: SuperSkills
  - Category: Software / Developer Tools
- **FAQ schema** from existing FAQ section data
- **Organization schema** with brand info
- ~~WebSite schema with search action~~ — removed (no search functionality exists)

### 1.4 Meta Tags Enhancement
- Full OpenGraph tags (og:image, og:price:amount, og:price:currency)
- Twitter Card (summary_large_image)
- **Static OG image** at `public/og-image.png` (1200x630) — simpler than auto-generation
- Canonical URLs on every page
- `hreflang` alternate links for EN/HE/AR on blog posts

### 1.5 Technical Optimizations
- `<link rel="canonical">` on all pages
- `hreflang` tags in `<head>` for blog locale variants
- Proper `lang` and `dir` attributes (already partially done)

---

## Phase 2: Analytics & Tracking

### 2.1 Google Tag Manager (GTM)
- Single GTM container script in `layout.tsx`
- All other tags managed through GTM web console (no direct GA4/Meta Pixel script tags in code)
- Data layer events pushed from React components for key actions
- **Env var:** `NEXT_PUBLIC_GTM_ID` in `.env.local`

### 2.2 Google Analytics 4 (GA4)
- Configured inside GTM web console (not in code)
- Custom events pushed to data layer from code:
  - `purchase_click` — when user clicks Buy button
  - `purchase_complete` — on success page load
  - `download_click` — when user clicks Download
  - `language_change` — when user switches locale
  - `skill_search` — when user searches in skill browser
  - `faq_expand` — when user opens FAQ item
- E-commerce tracking: purchase event with $50 value
- **Env var:** `NEXT_PUBLIC_GA4_ID` in `.env.local` (used in GTM config)

### 2.3 Meta Pixel (Facebook/Instagram)
- Configured inside GTM web console (not in code)
- Events pushed to data layer:
  - `PageView` — all pages
  - `ViewContent` — homepage (product page)
  - `InitiateCheckout` — Buy button click
  - `Purchase` — success page (value: $50, currency: USD)
- **Env var:** `NEXT_PUBLIC_META_PIXEL_ID` in `.env.local` (used in GTM config)

### 2.4 Google Search Console
- Verification via meta tag in `layout.tsx`
- Submit sitemap.xml after deployment
- Monitor indexing and search performance
- **Env var:** `NEXT_PUBLIC_GSC_VERIFICATION` in `.env.local`

---

## Phase 3: Blog System & Content

### 3.1 Blog Architecture
- MDX files stored in `src/content/blog/[slug]/en.mdx`, `he.mdx`, `ar.mdx`
- Route: `src/app/blog/[slug]/page.tsx` (EN default)
- Route: `src/app/[locale]/blog/[slug]/page.tsx` (HE, AR)
- Blog index: `src/app/blog/page.tsx`
- Frontmatter: title, description, date, author, tags, category, readingTime
- `next-mdx-remote` for rendering MDX on the server
- Blog pages do NOT load Three.js/R3F (no Background3D component) — lighter bundle

### 3.2 Blog Features
- Reading time estimation (calculated from word count)
- Table of contents (auto-generated from headings)
- Related posts (based on shared tags)
- CTA banner in every post ("Get all 106 skills for $50")
- Social sharing buttons (Twitter, LinkedIn, copy link)
- SEO per post: unique meta tags, OG image, Article schema (JSON-LD)
- ~~RSS feed~~ — deferred to future phase (low ROI for 10-article blog)

### 3.3 Initial 10 Articles (x3 languages = 30 pages)

| # | Title (EN) | Target Keywords | Category |
|---|-----------|-----------------|----------|
| 1 | What Are Claude Code Skills? | claude code skills, what are skills | Education |
| 2 | How to Install Claude Code | install claude code, claude code setup | Tutorial |
| 3 | 10 Skills Every Developer Needs in Claude Code | best claude code skills, top skills | Listicle |
| 4 | Claude Code vs Cursor vs GitHub Copilot | claude code vs cursor, ai coding comparison | Comparison |
| 5 | How to Write Your Own Claude Code Skill | create claude code skill, custom skills | Tutorial |
| 6 | Claude Code for DevOps Engineers | claude code devops, ai devops tools | Use Case |
| 7 | Claude Code for Frontend Developers | claude code react, ai frontend development | Use Case |
| 8 | AI-Powered Development Workflow with Claude Code | ai development workflow, claude code workflow | Education |
| 9 | From Junior to Senior: How AI Skills Accelerate Your Career | ai developer career, junior to senior developer | Career |
| 10 | The Future of AI-Assisted Coding | future of ai coding, ai programming 2026 | Thought Leadership |

### 3.4 Content Strategy
- Each article: 1000-2000 words, AI-generated with human review
- Include code examples where relevant
- End with CTA to buy SuperSkills
- Internal linking between related articles
- Target long-tail keywords that Claude Code users search for
- Hebrew and Arabic versions are translations (not separate articles)

---

## Skills to Use for Implementation

| Task | Skill |
|------|-------|
| Structured Data | `schema-markup` |
| SEO Audit & Technical | `seo-audit` |
| AI Search Optimization | `ai-seo` |
| Analytics Setup | `analytics-tracking` |
| Content Strategy | `content-strategy` |
| Blog Copy | `copywriting` |
| Meta Tags / OG | `seo-audit` |
| Email Marketing | `email-sequence` |
| Social Content | `social-content` |
| Lead Magnets | `lead-magnets` |

---

## Phase 4: Email Marketing (Lead Collection + Mass Sending)

### 4.1 Email Collection
- Simple opt-in form on the homepage ("Get Claude Code tips & updates")
- Placement: above the footer or as a sticky banner
- Fields: email only (minimal friction)
- Emails saved to Supabase `subscribers` table (email, locale, subscribed_at, status)
- Double opt-in NOT required initially (keep it simple)

### 4.2 Supabase Schema
```sql
CREATE TABLE public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  locale text DEFAULT 'en',
  subscribed_at timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON public.subscribers FOR ALL TO service_role USING (true);
```

### 4.3 Mass Sending via Resend
- **Resend** (resend.com) as email provider
- API route: `POST /api/email/send` — server-side only, protected (admin key or similar)
- Fetches all active subscribers from Supabase, sends via Resend batch API
- Templates: simple HTML email with subject, body, CTA button, unsubscribe link
- Unsubscribe link updates subscriber status in Supabase
- **Env vars:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (e.g., `updates@superskills.dev`)
- **Note:** Resend requires a verified domain. User must configure DNS records.

### 4.4 Email Use Cases
- New blog post announcement
- Product updates / new skills added
- Special promotions / discounts
- Tips & tutorials (content repurposed from blog)

---

## Phase 5: Social Content — TikTok + Twitter/X

### 5.1 Content Format
- **Carousel posts** (image slides) for TikTok + Twitter/X
- 4-7 slides per post
- Typical flow: Hook slide → Pain point → Solution → SuperSkills demo → Price/CTA → Social proof (optional)
- Design: dark theme matching the site (#0a0a0b background, #D97757 accent)
- Sizes: 1080x1920px (9:16 TikTok), 1080x1080px (1:1 Twitter/X)
- Content in **English AND Hebrew** — separate posts per language

### 5.2 Hashtag Research
- Research trending and niche hashtags for each platform using:
  - **Apify** scrapers (TikTok hashtag explorer, Twitter trending) — via API
  - Manual research on TikTok Discover and Twitter/X trends
- Build a hashtag bank organized by category:
  - **Primary** (high volume): #ClaudeCode, #AIcoding, #DevTools, #CodingTips
  - **Niche** (targeted): #ClaudeAI, #AIProgramming, #CodeSkills, #AIWorkflow
  - **Hebrew**: #קלודקוד, #פיתוחתוכנה, #בינהמלאכותית, #מפתחים
- Each post gets 5-8 relevant hashtags (not spammy)
- Track hashtag performance monthly and rotate underperformers

### 5.3 Keyword Research
- Target keywords for both organic (blog SEO) and social content:
  - **EN primary:** "Claude Code skills", "Claude Code tutorial", "AI coding tools", "Claude Code vs Cursor"
  - **EN long-tail:** "how to use Claude Code", "best Claude Code skills 2026", "Claude Code for beginners"
  - **HE primary:** "קלוד קוד", "כלי AI לפיתוח", "סקילים לקלוד"
  - **HE long-tail:** "איך להתקין קלוד קוד", "כלים לפיתוח עם AI", "קלוד קוד למתחילים"
- Cross-reference keywords between blog articles and social posts for consistency
- Use Google Search Console data (after Phase 2) to refine keyword targeting

### 5.4 Content Calendar (Initial 10 Posts)

| # | Hook (Slide 1) | Theme | Language |
|---|----------------|-------|----------|
| 1 | "You're using Claude Code wrong" | Common mistakes developers make | EN |
| 2 | "אתה משתמש בקלוד קוד לא נכון" | Same as above — Hebrew version | HE |
| 3 | "Junior devs don't know this trick" | Skills that accelerate career growth | EN |
| 4 | "I write code 10x faster. Here's how" | AI-assisted development workflow | EN |
| 5 | "אני כותב קוד פי 10 יותר מהר" | Same — Hebrew version | HE |
| 6 | "106 superpowers for $50" | Direct product showcase | EN |
| 7 | "Claude Code vs Cursor — honest comparison" | Tool comparison | EN |
| 8 | "This one skill saved me 4 hours" | Specific skill deep-dive | EN |
| 9 | "Free skills on GitHub vs SuperSkills" | Why pay when free exists | EN |
| 10 | "How I built a $50 product in one weekend" | Behind-the-scenes / founder story | EN |

### 5.5 Deliverables
- Figma-ready or HTML-rendered slide templates
- Text content for each slide (EN + HE versions)
- Design system consistent with the site
- Exportable as images (PNG)
- Hashtag sets per post

### 5.6 Production Notes
- Content is generated as text + design specs — user creates final visuals or uses Canva/Figma
- Each carousel links to superskills-one.vercel.app in bio/post
- Posts scheduled 2-3x per week per platform
- Cross-post TikTok carousels to Twitter/X with adjusted sizing

---

## Phase 6: Paid Ads (Gradual Scale)

### 6.1 Strategy
- Start small ($5-10/day) and scale based on ROAS
- Focus on platforms with developer audience
- All ads link to superskills-one.vercel.app homepage
- Track conversions via GA4 + Meta Pixel (already set up in Phase 2)

### 6.2 Platforms

**Meta Ads (Facebook/Instagram) — Phase 6a:**
- Retargeting: visitors who didn't buy (Meta Pixel audience)
- Lookalike audiences based on purchasers
- Carousel ads reusing TikTok content
- Budget: start at $5/day

**Google Ads — Phase 6b:**
- Search ads on high-intent keywords: "Claude Code skills", "Claude Code plugins"
- Budget: start at $10/day
- Landing page: homepage with purchase tracking

**Twitter/X Ads — Phase 6c (optional):**
- Promoted posts from organic content that performed well
- Target: developers, AI/ML interests
- Budget: start at $5/day

### 6.3 Languages
- EN campaigns: global targeting (US, UK, EU, India)
- HE campaigns: Israel targeting only
- Separate ad sets per language

### 6.4 Env Vars (for tracking)
- Already covered by GTM + GA4 + Meta Pixel from Phase 2
- No additional code needed — ad platform tracking is handled via the existing pixel/tags

---

## Skills to Use for Implementation

| Task | Skill |
|------|-------|
| Structured Data | `schema-markup` |
| SEO Audit & Technical | `seo-audit` |
| AI Search Optimization | `ai-seo` |
| Analytics Setup | `analytics-tracking` |
| Content Strategy | `content-strategy` |
| Blog Copy | `copywriting` |
| Meta Tags / OG | `seo-audit` |
| Email Marketing | `email-sequence` |
| Social Content | `social-content` |
| Paid Ads Strategy | `paid-ads` |
| Ad Creative | `ad-creative` |
| Keyword Research | `seo-audit` + `content-strategy` |

---

## Success Criteria

1. Google indexes all pages within 2 weeks of launch
2. Structured data validates in Google Rich Results Test
3. GA4 tracks all key events (purchase click, complete, download)
4. Meta Pixel fires Purchase event on success page
5. Blog posts rank for target keywords within 1-3 months
6. Organic traffic grows month-over-month
7. Conversion rate (visitor -> purchase) is measurable and trackable
8. Email subscriber list grows weekly
9. Resend delivers emails with >95% delivery rate
10. TikTok + Twitter/X carousels posted 2-3x/week
11. Hashtag bank maintained and updated monthly
12. Paid ads achieve positive ROAS within 30 days of launch

---

## Out of Scope

- A/B testing (future)
- RSS feed (deferred)
- Dedicated landing pages per skill category (user declined)
- Full site i18n URL migration (homepage stays client-side i18n)
- Video content creation (carousels only, no filmed videos)
- Instagram / LinkedIn (TikTok + Twitter/X only for now)
- Arabic social content (deferred — blog only for Arabic)
