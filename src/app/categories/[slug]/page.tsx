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
    <div>
      {/* Page header */}
      <div className="py-14 text-center" style={{ background: '#FDF0EC' }}>
        <p className="font-body mb-2 text-sm font-medium uppercase tracking-widest text-gold">
          Collection
        </p>
        {/* Gold rule */}
        <div
          className="mx-auto mb-5"
          aria-hidden="true"
          style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #C8922A, transparent)' }}
        />
        <h1 className="font-heading text-4xl font-light text-primary sm:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="font-body mx-auto mt-3 max-w-xl text-base text-secondary">
            {category.description}
          </p>
        )}
      </div>

      {/* Wave header → product grid */}
      <div style={{ lineHeight: 0, background: '#FDF0EC' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }} aria-hidden="true">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="#EEF6FD" />
        </svg>
      </div>

      {/* Products with filter */}
      <div className="py-14" style={{ background: '#EEF6FD' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
