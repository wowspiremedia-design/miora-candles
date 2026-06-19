import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { allProductSlugsQuery, allCategorySlugsQuery } from '@/sanity/lib/queries'

const BASE_URL = 'https://mioracandles.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(allProductSlugsQuery),
    client.fetch<{ slug: string }[]>(allCategorySlugsQuery),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((s) => ({
    url: `${BASE_URL}/categories/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((s) => ({
    url: `${BASE_URL}/products/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
