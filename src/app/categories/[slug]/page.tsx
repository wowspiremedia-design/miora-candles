import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import {
  allCategorySlugsQuery,
  categoryBySlugQuery,
  productsByCategoryQuery,
} from '@/sanity/lib/queries'
import ProductGrid from '@/components/ProductGrid'
import type { Category, Product } from '@/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(allCategorySlugsQuery)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await client.fetch<Category | null>(categoryBySlugQuery, { slug })
  if (!category) return {}
  return {
    title: `${category.name} | Buy Handmade Candles Online | Miora Candles`,
    description:
      category.description ||
      `Shop handmade ${category.name.toLowerCase()} from Miora Candles, Kolkata. Pan-India delivery available.`,
    alternates: { canonical: `https://mioracandles.in/categories/${slug}` },
    openGraph: {
      title: `${category.name} | Miora Candles`,
      description:
        category.description ||
        `Shop handmade ${category.name.toLowerCase()} crafted in Kolkata.`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const [category, products] = await Promise.all([
    client.fetch<Category | null>(categoryBySlugQuery, { slug }),
    client.fetch<Product[]>(productsByCategoryQuery, { slug }),
  ])

  if (!category) notFound()

  return (
    <div className="bg-page-bg">
      {/* Page header */}
      <div className="border-b border-border bg-section-alt py-14 text-center">
        <p className="font-body mb-2 text-sm font-medium uppercase tracking-widest text-gold">
          Collection
        </p>
        <h1 className="font-heading text-4xl font-light text-primary sm:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="font-body mx-auto mt-3 max-w-xl text-base text-secondary">
            {category.description}
          </p>
        )}
      </div>

      {/* Products with filter */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
