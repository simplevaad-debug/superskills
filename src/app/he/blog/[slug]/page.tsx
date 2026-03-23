import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getPost, getPostSlugs } from "@/lib/blog";
import { BlogLayout } from "@/components/blog/blog-layout";
import { BlogCta } from "@/components/blog/blog-cta";
import { blogMdxComponents } from "@/components/blog/mdx-components";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug, "he");

  if (!post) {
    return {};
  }

  return {
    title: `${post.meta.title} | SuperSkills Blog`,
    description: post.meta.description,
    alternates: {
      canonical: `/he/blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPageHe(props: Props) {
  const { slug } = await props.params;
  const post = getPost(slug, "he");

  if (!post) {
    notFound();
  }

  return (
    <BlogLayout meta={post.meta}>
      <ArticleJsonLd meta={post.meta} />
      <MDXRemote source={post.content} components={blogMdxComponents} />
      <BlogCta />
    </BlogLayout>
  );
}
