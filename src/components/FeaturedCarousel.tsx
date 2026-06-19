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
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      }
    }
  }

  return (
    <div className="relative">
      {/* Carousel track */}
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

      {/* Navigation arrows — show on md+ when there are enough products */}
      {products.length > itemsPerView && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => scrollTo(scrollIndex - 1)}
            disabled={scrollIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous"
          >
            ←
          </button>
          {/* Dots */}
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${i === scrollIndex ? 'w-6 bg-gold' : 'w-2 bg-border'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <button
            onClick={() => scrollTo(scrollIndex + 1)}
            disabled={scrollIndex >= maxIndex}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
