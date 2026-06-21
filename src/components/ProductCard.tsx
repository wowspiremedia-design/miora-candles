'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { Product } from '@/types'

const WA_SVG = (
  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [qty, setQty] = useState(1)
  const [city, setCity] = useState('')

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(600).height(600).fit('crop').url()
    : null

  const whatsappMessage = encodeURIComponent(
    `Hi Miora Candles! I am interested in ${product.name} (₹${product.price}) × ${qty}. Delivery to: ${city || '[City]'}. Please share shipping cost and availability. Thank you!`
  )
  const whatsappUrl = `https://wa.me/919330799407?text=${whatsappMessage}`
  const canEnquire = city.trim().length > 0

  return (
    <article className="product-glass-card group flex flex-col">
      {/* Image */}
      <Link href={`/products/${product.slug.current}`} className="relative block overflow-hidden" style={{ borderRadius: '15px 15px 0 0' }}>
        <div className="relative aspect-square w-full" style={{ background: '#FDF0EC' }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-16 w-16" style={{ color: '#E8DDD0' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
          )}
          {product.categoryName && (
            <span
              className="absolute left-3 top-3 font-body text-xs font-medium text-secondary"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '20px',
                padding: '3px 10px',
              }}
            >
              {product.categoryName}
            </span>
          )}
          {!product.inStock && (
            <span
              className="absolute right-3 top-3 font-body text-xs font-medium text-white"
              style={{ background: 'rgba(26,18,8,0.75)', borderRadius: '20px', padding: '3px 10px' }}
            >
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Info — z-10 so it sits above the ::before glow */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={`/products/${product.slug.current}`}>
            <h3 className="font-heading text-lg font-semibold text-primary transition-colors duration-300 hover:text-gold line-clamp-2">
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
          <div
            className="flex items-center"
            style={{ border: '1px solid rgba(200,146,42,0.3)', borderRadius: '8px' }}
          >
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="min-h-[44px] px-3 font-body text-base text-secondary transition-colors duration-300 hover:text-gold disabled:opacity-40"
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
              className="min-h-[44px] px-3 font-body text-base text-secondary transition-colors duration-300 hover:text-gold disabled:opacity-40"
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
          className="w-full font-body text-sm text-primary placeholder-secondary outline-none"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(200,146,42,0.2)',
            borderRadius: '8px',
            padding: '8px 12px',
            transition: 'border-color 0.3s ease',
            minHeight: '44px',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(200,146,42,0.6)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(200,146,42,0.2)' }}
        />

        {/* WhatsApp enquire */}
        <a
          href={canEnquire ? whatsappUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-[44px] items-center justify-center gap-2 font-body text-sm font-medium ${
            canEnquire && product.inStock ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          style={{
            background: canEnquire && product.inStock ? '#1A1208' : 'rgba(232,221,208,0.6)',
            color: canEnquire && product.inStock ? '#FFFFFF' : '#7A6E60',
            borderRadius: '4px',
            padding: '10px 16px',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (canEnquire && product.inStock) e.currentTarget.style.background = '#C8922A'
          }}
          onMouseLeave={(e) => {
            if (canEnquire && product.inStock) e.currentTarget.style.background = '#1A1208'
          }}
          onClick={(e) => { if (!canEnquire || !product.inStock) e.preventDefault() }}
          title={!product.inStock ? 'Out of stock' : !canEnquire ? 'Enter your city first' : 'Enquire on WhatsApp'}
        >
          {WA_SVG}
          {!product.inStock ? 'Out of Stock' : 'Enquire on WhatsApp'}
        </a>
      </div>
    </article>
  )
}
