import { PostMeta } from "@/lib/blog";

const BASE_URL = process.env.BASE_URL ?? "https://superskills-one.vercel.app";

export function ArticleJsonLd({ meta }: { meta: PostMeta }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Person", name: meta.author },
    publisher: { "@type": "Organization", name: "SuperSkills", url: BASE_URL },
    image: `${BASE_URL}/og-image.png`,
    url: `${BASE_URL}/blog/${meta.slug}`,
    keywords: meta.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
