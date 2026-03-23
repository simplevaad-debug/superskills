import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { PostMeta } from '@/lib/blog';

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-[#27272a] rounded-xl p-6 hover:border-[#3f3f46] bg-[#141415] transition-colors"
    >
      {post.category && (
        <span className="text-xs text-[#D97757] uppercase tracking-wider">
          {post.category}
        </span>
      )}
      <h2 className="text-lg font-semibold text-white mt-2 mb-2">
        {post.title}
      </h2>
      {post.description && (
        <p className="text-sm text-[#71717a] mb-3 line-clamp-2">
          {post.description}
        </p>
      )}
      <div className="flex items-center gap-3 text-xs text-[#52525b]">
        {post.date && <span>{post.date}</span>}
        {post.readingTime && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
        )}
      </div>
    </Link>
  );
}
