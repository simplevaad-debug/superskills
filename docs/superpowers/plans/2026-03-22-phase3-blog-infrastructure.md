# Phase 3: Blog Infrastructure + Test Article

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full MDX blog system with one test article in 3 languages (EN/HE/AR), blog index page, per-post SEO, and auto-updating sitemap.

**Architecture:** MDX content files stored in `src/content/blog/[slug]/`, rendered via `next-mdx-remote` in a dynamic App Router route. Blog pages use a dedicated layout without Three.js (lighter bundle). Blog index lists all posts with metadata.

**Tech Stack:** Next.js 16 App Router, `next-mdx-remote`, TypeScript, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-21-seo-tracking-blog-design.md` (Phase 3 section)

**Important:** Next.js 16 has breaking changes. Check `node_modules/next/dist/docs/` before using metadata APIs. The CSP headers in `next.config.ts` need updating to allow `googletagmanager.com`.

**Security note:** JSON-LD uses `dangerouslySetInnerHTML` — safe here because all content comes from server-side frontmatter constants, never user input. Same pattern as existing `json-ld.tsx` and `gtm.tsx`.

---

## File Structure

### New Files
```
src/content/blog/what-are-claude-code-skills/en.mdx    — Test article (English)
src/content/blog/what-are-claude-code-skills/he.mdx    — Test article (Hebrew)
src/content/blog/what-are-claude-code-skills/ar.mdx    — Test article (Arabic)
src/lib/blog.ts                                         — Blog utilities (read MDX, parse frontmatter, list posts)
src/app/blog/page.tsx                                   — Blog index page (EN)
src/app/blog/[slug]/page.tsx                            — Blog post page (EN)
src/app/he/blog/[slug]/page.tsx                         — Blog post page (HE)
src/app/ar/blog/[slug]/page.tsx                         — Blog post page (AR)
src/components/blog/blog-layout.tsx                     — Blog post layout (no Three.js)
src/components/blog/blog-cta.tsx                        — Purchase CTA banner
src/components/blog/blog-card.tsx                       — Post card for index page
src/components/blog/mdx-components.tsx                  — Custom MDX component overrides
src/components/seo/article-json-ld.tsx                  — Article structured data
mdx-components.tsx                                      — Required root-level MDX components file
```

### Modified Files
```
src/app/sitemap.ts                — Add blog posts dynamically
next.config.ts                    — Add CSP rules for GTM
package.json                      — Add next-mdx-remote, gray-matter dependencies
```

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install next-mdx-remote and gray-matter**

```bash
cd /Users/simplevaad/Desktop/superskills && npm install next-mdx-remote gray-matter reading-time
```

`next-mdx-remote` — renders MDX on the server from content files
`gray-matter` — parses YAML frontmatter from MDX files
`reading-time` — calculates estimated reading time

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add next-mdx-remote, gray-matter, reading-time"
```

---

### Task 2: Blog Utilities (`src/lib/blog.ts`)

**Files:**
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Create blog utility functions**

This file provides:
- `getPostSlugs()` — returns all blog post directory names
- `getPost(slug, locale)` — reads MDX file, parses frontmatter, returns content + metadata
- `getAllPosts(locale)` — returns all posts sorted by date (newest first)

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  slug: string;
  readingTime: string;
  locale: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  );
}

export function getPost(slug: string, locale = "en"): Post | null {
  const filePath = path.join(CONTENT_DIR, slug, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    meta: {
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "SuperSkills",
      tags: data.tags ?? [],
      category: data.category ?? "",
      slug,
      readingTime: stats.text,
      locale,
    },
    content,
  };
}

export function getAllPosts(locale = "en"): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPost(slug, locale))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
    .map((p) => p.meta);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat: add blog utility functions (getPost, getAllPosts)"
```

---

### Task 3: MDX Components

**Files:**
- Create: `mdx-components.tsx` (project root)
- Create: `src/components/blog/mdx-components.tsx`

- [ ] **Step 1: Create root mdx-components.tsx**

Required by Next.js for MDX support:

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
```

- [ ] **Step 2: Create custom blog MDX components**

Custom styling for MDX elements inside blog posts (headings, links, code blocks, etc.) matching the dark theme (#0a0a0b bg, #D97757 accent).

- [ ] **Step 3: Commit**

```bash
git add mdx-components.tsx src/components/blog/mdx-components.tsx
git commit -m "feat: add MDX components for blog styling"
```

---

### Task 4: Blog Layout & CTA Components

**Files:**
- Create: `src/components/blog/blog-layout.tsx`
- Create: `src/components/blog/blog-cta.tsx`
- Create: `src/components/blog/blog-card.tsx`

- [ ] **Step 1: Create blog CTA banner**

Purchase CTA shown at the end of every blog post. Links to `/#pricing`.

- [ ] **Step 2: Create blog layout**

Layout wrapper for blog posts — no Three.js, minimal header with back-to-blog link + SuperSkills branding, article area with post metadata (category, title, date, reading time), footer. Supports RTL via `meta.locale`.

- [ ] **Step 3: Create blog card component**

Card for the blog index page showing: category badge, title, description (2-line clamp), date, reading time.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/
git commit -m "feat: add blog layout, CTA, and card components"
```

---

### Task 5: Blog Post Page Route (EN)

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create dynamic blog post page**

Server component that:
- Uses `generateStaticParams` to pre-render all slugs
- Uses `generateMetadata` for per-post SEO (title, description, OG, canonical, hreflang alternates to HE/AR)
- Renders MDX via `MDXRemote` from `next-mdx-remote/rsc`
- Wraps content in `BlogLayout` + `BlogCTA`
- Includes `ArticleJsonLd`

Note: In Next.js 16, `params` is a Promise — must `await props.params`.

- [ ] **Step 2: Commit**

```bash
git add src/app/blog/[slug]/page.tsx
git commit -m "feat: add blog post dynamic route (EN)"
```

---

### Task 6: Blog Post Routes (HE + AR)

**Files:**
- Create: `src/app/he/blog/[slug]/page.tsx`
- Create: `src/app/ar/blog/[slug]/page.tsx`

- [ ] **Step 1: Create Hebrew blog post page**

Same as EN but with `locale="he"`, hreflang alternates pointing to EN/AR.

- [ ] **Step 2: Create Arabic blog post page**

Same as EN but with `locale="ar"`, hreflang alternates pointing to EN/HE.

- [ ] **Step 3: Commit**

```bash
git add src/app/he/blog/ src/app/ar/blog/
git commit -m "feat: add blog post routes for Hebrew and Arabic"
```

---

### Task 7: Blog Index Page

**Files:**
- Create: `src/app/blog/page.tsx`

- [ ] **Step 1: Create blog index page**

Server component showing all posts in English. Minimal header, title "Blog", description, grid of `BlogCard` components. Metadata with canonical `/blog`.

- [ ] **Step 2: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat: add blog index page"
```

---

### Task 8: Article JSON-LD

**Files:**
- Create: `src/components/seo/article-json-ld.tsx`

- [ ] **Step 1: Create Article structured data component**

Renders `Article` schema.org JSON-LD with: headline, description, datePublished, author, publisher (SuperSkills), image, url, keywords. Content is server-side constants from frontmatter — safe to inject.

- [ ] **Step 2: Commit**

```bash
git add src/components/seo/article-json-ld.tsx
git commit -m "feat: add Article JSON-LD structured data for blog posts"
```

---

### Task 9: Test Article Content

**Files:**
- Create: `src/content/blog/what-are-claude-code-skills/en.mdx`
- Create: `src/content/blog/what-are-claude-code-skills/he.mdx`
- Create: `src/content/blog/what-are-claude-code-skills/ar.mdx`

- [ ] **Step 1: Create English article**

~1000 words about what Claude Code skills are, how they work, and why developers should use them. Target keywords: "claude code skills", "what are skills".

Frontmatter:
```yaml
---
title: "What Are Claude Code Skills?"
description: "Learn what Claude Code skills are, how they work, and how they can transform your development workflow with AI-powered expertise."
date: "2026-03-22"
author: "SuperSkills"
tags: ["claude code", "skills", "ai coding", "developer tools"]
category: "Education"
---
```

- [ ] **Step 2: Create Hebrew translation**

Hebrew translation with translated frontmatter (title, description).

- [ ] **Step 3: Create Arabic translation**

Arabic translation with translated frontmatter (title, description).

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/
git commit -m "feat: add first blog post 'What Are Claude Code Skills?' in EN/HE/AR"
```

---

### Task 10: Update Sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add blog posts to sitemap**

Import `getPostSlugs` from blog utilities. Add `/blog` index page (priority 0.8, weekly). Map all slugs to sitemap entries with `alternates.languages` for HE/AR (priority 0.7, monthly).

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add blog posts to sitemap with hreflang alternates"
```

---

### Task 11: Update CSP Headers

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add googletagmanager.com to CSP**

Update CSP in `next.config.ts`:
- `script-src`: add `https://www.googletagmanager.com https://www.google-analytics.com`
- `connect-src`: add `https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com`
- `img-src`: add `https://www.googletagmanager.com`

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "fix: update CSP headers to allow GTM and GA4"
```

---

### Task 12: Build, Test & Deploy

- [ ] **Step 1: Run build**

```bash
cd /Users/simplevaad/Desktop/superskills && npx next build
```

Expected: Build succeeds with blog routes showing as static pages.

- [ ] **Step 2: Test locally**

```bash
npx next dev
```

Verify:
1. `http://localhost:3000/blog` — shows blog index with 1 post
2. `http://localhost:3000/blog/what-are-claude-code-skills` — shows EN article
3. `http://localhost:3000/he/blog/what-are-claude-code-skills` — shows HE article (RTL)
4. `http://localhost:3000/ar/blog/what-are-claude-code-skills` — shows AR article (RTL)
5. `http://localhost:3000/sitemap.xml` — includes blog post with alternates

- [ ] **Step 3: Deploy**

```bash
npx vercel --prod
```

- [ ] **Step 4: Verify live**

1. Open `https://superskills-one.vercel.app/blog`
2. Open `https://superskills-one.vercel.app/blog/what-are-claude-code-skills`
3. Check page source for Article JSON-LD
4. Check sitemap for blog entries

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Phase 3 blog infrastructure complete with test article"
```
