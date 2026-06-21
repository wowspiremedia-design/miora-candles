'use client'

import { useState, useRef } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '@/types'

interface FeaturedCarouselProps {
  products: Product[]
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [scrollIndex, setScrollIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  if (!products.length) {
    return (
      <p className="font-body text-center text-secondary">
        No featured products yet. Add some in Sanity Studio.
      </p>
    )
  }

  const itemsPerView = 3
  const maxIndex = Math.max(0, products.length - itemsPerView)

  const scrollTo = (idx: number) => {
    const clamped = Math.min(Math.max(idx, 0), maxIndex)
    setScrollIndex(clamped)
    if (trackRef.current) {
      const card = trackRef.current.children[clamped] as HTMLElement
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="min-w-[300px] max-w-[340px] flex-shrink-0 snap-start sm:min-w-[320px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length > itemsPerView && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => scrollTo(scrollIndex - 1)}
            disabled={scrollIndex === 0}
            className="flex h-11 w-11 items-center justify-center font-body text-secondary transition-all duration-300 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '50%',
              boxShadow: '0 4px 16px rgba(242,196,196,0.2)',
            }}
            aria-label="Previous"
          >
            ←
          </button>

          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === scrollIndex ? '24px' : '8px',
                background: i === scrollIndex ? '#C8922A' : 'rgba(200,146,42,0.25)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}

          <button
            onClick={() => scrollTo(scrollIndex + 1)}
            disabled={scrollIndex >= maxIndex}
            className="flex h-11 w-11 items-center justify-center font-body text-secondary transition-all duration-300 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '50%',
              boxShadow: '0 4px 16px rgba(242,196,196,0.2)',
            }}
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
