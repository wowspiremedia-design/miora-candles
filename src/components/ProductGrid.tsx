'use client'

import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '@/types'

type SortOption = 'price-asc' | 'price-desc'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sort, setSort] = useState<SortOption>('price-asc')
  const [maxPrice, setMaxPrice] = useState(() => {
    const prices = products.map((p) => p.price)
    return prices.length ? Math.ceil(Math.max(...prices)) : 5000
  })

  const priceMax = useMemo(() => {
    const prices = products.map((p) => p.price)
    return prices.length ? Math.ceil(Math.max(...prices)) : 5000
  }, [products])

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.price <= maxPrice)
      .sort((a, b) => sort === 'price-asc' ? a.price - b.price : b.price - a.price)
  }, [products, sort, maxPrice])

  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <p className="font-heading text-2xl text-secondary">No products in this category yet.</p>
        <p className="font-body mt-2 text-sm text-secondary">
          Add products in your Sanity Studio to see them here.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Filter / Sort bar — glassmorphism */}
      <div
        className="mb-8 flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:gap-6"
        style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '12px',
        }}
      >
        {/* Sort */}
        <div className="flex flex-col gap-1">
          <label htmlFor="sort" className="font-body text-xs font-medium uppercase tracking-widest text-secondary">
            Sort By
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="font-body text-sm text-primary outline-none"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(200,146,42,0.25)',
              borderRadius: '8px',
              padding: '8px 12px',
              minHeight: '44px',
            }}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Price range */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-body text-xs font-medium uppercase tracking-widest text-secondary">
              Max Price
            </label>
            <span className="font-body text-xs font-medium text-gold">
              ₹{maxPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-secondary">₹0</span>
            <input
              type="range"
              min={0}
              max={priceMax}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-gold"
              style={{ minHeight: '44px' }}
              aria-label="Maximum price"
            />
            <span className="font-body text-xs text-secondary">₹{priceMax.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Count */}
        <p className="font-body text-sm text-secondary whitespace-nowrap">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Product grid: 1 col mobile, 2 tablet, 3 desktop */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="font-heading text-xl text-secondary">No products match your filter.</p>
          <button
            onClick={() => setMaxPrice(priceMax)}
            className="mt-4 font-body text-sm text-gold underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
