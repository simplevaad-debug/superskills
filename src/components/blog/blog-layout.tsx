import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Globe } from 'lucide-react';
import type { PostMeta } from '@/lib/blog';

const localeLabels: Record<string, string> = {
  en: 'English',
  he: 'עברית',
  ar: 'العربية',
};

function getLocalePath(slug: string, locale: string) {
  if (locale === 'en') return `/blog/${slug}`;
  return `/${locale}/blog/${slug}`;
}

export function BlogLayout({
  meta,
  children,
}: {
  meta: PostMeta;
  children: React.ReactNode;
}) {
  const dir = meta.locale === 'en' ? 'ltr' : 'rtl';
  const otherLocales = ['en', 'he', 'ar'].filter((l) => l !== meta.locale);

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <header className="border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-[#71717a] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-[#52525b]">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[#a1a1aa]">{localeLabels[meta.locale]}</span>
              {otherLocales.map((locale) => (
                <Link
                  key={locale}
                  href={getLocalePath(meta.slug, locale)}
                  className="hover:text-white transition-colors"
                >
                  {localeLabels[locale]}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              className="text-sm font-semibold text-white hover:text-[#D97757] transition-colors"
            >
              SuperSkills
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article
        className="max-w-7xl mx-auto px-6 py-12"
        dir={dir}
      >
        {meta.category && (
          <span className="text-xs text-[#D97757] uppercase tracking-wider">
            {meta.category}
          </span>
        )}
        <h1 className="text-4xl font-bold text-white mt-2 mb-4">
          {meta.title}
        </h1>
        <div className="flex items-center gap-4 text-[#52525b] text-sm mb-10">
          {meta.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {meta.date}
            </span>
          )}
          {meta.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {meta.readingTime}
            </span>
          )}
        </div>

        <div className="prose prose-invert prose-sm max-w-none">
          {children}
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-8 text-center text-xs text-[#3f3f46]">
        © {new Date().getFullYear()} SuperSkills. All rights reserved.
      </footer>
    </div>
  );
}
