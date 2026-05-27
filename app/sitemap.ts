import { MetadataRoute } from 'next'
import { MOCK_ARTICLES } from '@/lib/mock/articles'
import { CATEGORIES } from '@/lib/constants/categories'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://defiliban.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${BASE_URL}/newsletter`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.flatMap((cat) => {
    const pages: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'hourly',
        priority: 0.8,
      },
    ]
    for (const sub of cat.subcategories) {
      pages.push({
        url: `${BASE_URL}${sub.href}`,
        lastModified: now,
        changeFrequency: 'hourly',
        priority: 0.7,
      })
    }
    return pages
  })

  // Article pages
  const articlePages: MetadataRoute.Sitemap = MOCK_ARTICLES.map((a) => ({
    url: `${BASE_URL}/article/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}
