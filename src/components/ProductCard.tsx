'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [qty, setQty] = useState(1)
  const [city, setCity] = useState('')

  const imageUrl =
    product.images?.[0]
      ? urlFor(product.images[0]).width(600).height(600).fit('crop').url()
      : null

  const whatsappMessage = encodeURIComponent(
    `Hi Miora Candles! I am interested in ${product.name} (₹${product.price}) × ${qty}. Delivery to: ${city || '[City]'}. Please share shipping cost and availability. Thank you!`
  )
  const whatsappUrl = `https://wa.me/919330799407?text=${whatsappMessage}`

  const canEnquire = city.trim().length > 0

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Product image */}
      <Link href={`/products/${product.slug.current}`} className="relative block overflow-hidden">
        <div className="relative aspect-square w-full bg-section-alt">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-16 w-16 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
          )}
          {/* Category tag */}
          {product.categoryName && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 font-body text-xs font-medium text-secondary shadow-sm backdrop-blur-sm">
              {product.categoryName}
            </span>
          )}
          {!product.inStock && (
            <span className="absolute right-3 top-3 rounded-full bg-primary/80 px-2.5 py-0.5 font-body text-xs font-medium text-white">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={`/products/${product.slug.current}`}>
            <h3 className="font-heading text-lg font-semibold text-primary transition-colors hover:text-gold line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.shortDescription && (
            <p className="mt-1 font-body text-sm text-secondary line-clamp-2">
              {product.shortDescription}
            </p>
          )}
        </div>

        <p className="font-body text-xl font-semibold text-gold">
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        {/* Quantity selector */}
        <div className="flex items-center gap-3">
          <span className="font-body text-sm text-secondary">Qty:</span>
          <div className="flex items-center rounded-lg border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1.5 font-body text-base text-secondary transition-colors hover:text-gold disabled:opacity-40"
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center font-body text-sm font-medium text-primary">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(100, q + 1))}
              className="px-3 py-1.5 font-body text-base text-secondary transition-colors hover:text-gold disabled:opacity-40"
              disabled={qty >= 100}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* City input */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Your city (for shipping)"
          className="w-full rounded-lg border border-border bg-page-bg px-3 py-2 font-body text-sm text-primary placeholder-secondary outline-none transition-colors focus:border-gold"
        />

        {/* WhatsApp enquire */}
        <a
          href={canEnquire ? whatsappUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-medium transition-colors ${
            canEnquire && product.inStock
              ? 'bg-primary text-white hover:bg-gold cursor-pointer'
              : 'cursor-not-allowed bg-border text-secondary'
          }`}
          onClick={(e) => {
            if (!canEnquire || !product.inStock) e.preventDefault()
          }}
          title={!product.inStock ? 'Out of stock' : !canEnquire ? 'Enter your city first' : 'Enquire on WhatsApp'}
        >
          <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {!product.inStock ? 'Out of Stock' : 'Enquire on WhatsApp'}
        </a>
      </div>
    </article>
  )
}
