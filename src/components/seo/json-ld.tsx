const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://superskills-one.vercel.app";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SuperSkills — 106 Pro Skills for Claude Code",
  description:
    "Supercharge Claude Code with 106 expert-crafted skills across 15 categories.",
  brand: {
    "@type": "Brand",
    name: "SuperSkills",
  },
  category: "Software > Developer Tools",
  url: BASE_URL,
  image: `${BASE_URL}/og-image.png`,
  offers: {
    "@type": "Offer",
    price: "50.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly are Claude Code skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skills are structured prompt files that give Claude Code domain-specific expertise. Each skill file teaches Claude a specialized workflow, set of best practices, or technical domain so it can perform at an expert level in that area without you having to re-explain context every time.",
      },
    },
    {
      "@type": "Question",
      name: "How do I install the skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download the ZIP, extract it to ~/.claude/skills/, and restart Claude Code. Your skills are immediately available. No configuration, no API keys, no setup scripts — it just works.",
      },
    },
    {
      "@type": "Question",
      name: "Do these work with any Claude Code version?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Skills are a core feature of Claude Code and work across all versions. As long as you're running Claude Code, the skills will be recognized and activated automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What stacks and frameworks are covered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "React, Next.js, Vue, Angular on frontend. Python, Go, Rust, Java, C# on backend. Plus DevOps, databases, testing, security, mobile, AI/ML, and more — 15 categories in total covering the full modern development stack.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — one-time $50 purchase. You get all 106 skills plus free updates for 1 year. No recurring charges, no usage fees, no hidden costs.",
      },
    },
    {
      "@type": "Question",
      name: "Can I see a sample before buying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every skill is listed on this page with its name and description. You can browse all 106 skills across every category before purchasing so you know exactly what you're getting.",
      },
    },
    {
      "@type": "Question",
      name: "What if I only need a few categories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At less than $0.50 per skill, even 10-20 skills deliver incredible value. The skills you don't use today won't slow you down, and you'll likely find yourself reaching for more categories as your projects evolve.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer refunds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Since this is a digital product delivered instantly, we don't offer refunds after download. If you have a technical issue or the skills don't work as described, contact us and we'll make it right.",
      },
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SuperSkills",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
};

export function ProductJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
