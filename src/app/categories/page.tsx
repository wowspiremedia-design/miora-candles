import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allCategoriesQuery } from '@/sanity/lib/queries'
import CategoryCard from '@/components/CategoryCard'
import type { Category } from '@/types'

export const metadata: Metadata = {
  title: 'Shop All Candle Collections | Buy Handmade Candles Online | Miora Candles',
  description:
    'Browse all our handmade candle collections — soy candles, beeswax, gel, scented, decorative candles and gift sets. Crafted in Kolkata, delivered pan-India.',
  alternates: { canonical: 'https://mioracandles.in/categories' },
  openGraph: {
    title: 'Shop All Collections | Miora Candles',
    description: 'Explore premium handmade candle collections from Kolkata.',
  },
}

export default async function CategoriesPage() {
  const categories = await client.fetch<Category[]>(allCategoriesQuery)

  return (
    <div className="bg-page-bg">
      {/* Page header */}
      <div className="border-b border-border bg-section-alt py-14 text-center">
        <p className="font-body mb-2 text-sm font-medium uppercase tracking-widest text-gold">
          Our Collections
        </p>
        <h1 className="font-heading text-4xl font-light text-primary sm:text-5xl">
          Shop by Category
        </h1>
        <p className="font-body mx-auto mt-3 max-w-xl text-base text-secondary">
          Discover our range of handcrafted candles, each made with natural ingredients and
          thoughtful design.
        </p>
      </div>

      {/* Categories grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-heading text-2xl text-secondary">
              No categories found yet.
            </p>
            <p className="font-body mt-2 text-sm text-secondary">
              Add categories in your Sanity Studio to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
