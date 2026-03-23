import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | SuperSkills",
  description:
    "Tips, tutorials, and insights about Claude Code skills and AI-assisted development.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts("en");

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <header className="border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-white">
            SuperSkills
          </Link>
          <Link href="/#pricing" className="text-sm text-[#D97757]">
            Get Skills →
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Blog</h1>
        <p className="text-[#71717a] mb-10">
          Tips, tutorials, and insights about Claude Code skills and AI-assisted
          development.
        </p>

        {posts.length === 0 ? (
          <p className="text-[#52525b]">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.meta.slug} post={post.meta} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-8 text-center text-xs text-[#3f3f46]">
        © {new Date().getFullYear()} SuperSkills. All rights reserved.
      </footer>
    </div>
  );
}
