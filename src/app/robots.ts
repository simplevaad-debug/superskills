import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL || 'https://superskills-one.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/success/', '/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
