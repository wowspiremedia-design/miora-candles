'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/types'

interface ProductImagesProps {
  images: SanityImage[]
  productName: string
}

export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!images?.length) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-section-alt">
        <svg className="h-20 w-20 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      </div>
    )
  }

  const mainUrl = urlFor(images[activeIdx]).width(800).height(800).fit('crop').url()

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-section-alt">
        <Image
          src={mainUrl}
          alt={`${productName} — image ${activeIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const thumbUrl = urlFor(img).width(120).height(120).fit('crop').url()
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  idx === activeIdx ? 'border-gold' : 'border-border hover:border-gold/50'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={thumbUrl}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="lazy"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
