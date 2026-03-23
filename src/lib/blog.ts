import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

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
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getPost(slug: string, locale: string): Post | null {
  const filePath = path.join(CONTENT_DIR, slug, `${locale}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const stats = readingTime(content);

  const meta: PostMeta = {
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ? String(data.date) : '',
    author: data.author ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    category: data.category ?? '',
    slug,
    readingTime: stats.text,
    locale,
  };

  return { meta, content };
}

export function getAllPosts(locale: string): Post[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPost(slug, locale))
    .filter((post): post is Post => post !== null);

  return posts.sort((a, b) => {
    const dateA = new Date(a.meta.date).getTime();
    const dateB = new Date(b.meta.date).getTime();
    return dateB - dateA;
  });
}
