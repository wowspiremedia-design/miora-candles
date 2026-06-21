import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { allCategoriesQuery, featuredProductsQuery } from '@/sanity/lib/queries'
import CategoryCard from '@/components/CategoryCard'
import FeaturedCarousel from '@/components/FeaturedCarousel'
import MarqueeStrip from '@/components/MarqueeStrip'
import type { Category, Product } from '@/types'

export const metadata: Metadata = {
  title: 'Miora Candles | Handmade Luxury Candles Kolkata',
  description:
    'Discover premium handmade candles crafted in Kolkata — soy wax, beeswax, gel candles, scented candles & gift sets. Pan-India delivery available.',
  alternates: { canonical: 'https://mioracandles.in' },
}

const WA_SVG = (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  const path = flip
    ? 'M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z'
    : 'M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z'
  return (
    <div style={{ lineHeight: 0, background: from }}>
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '60px', display: 'block' }}
        aria-hidden="true"
      >
        <path d={path} fill={to} />
      </svg>
    </div>
  )
}

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    client.fetch<Category[]>(allCategoriesQuery),
    client.fetch<Product[]>(featuredProductsQuery),
  ])

  /* Determine background of the section immediately before Story */
  const preStoryBg = featuredProducts.length > 0
    ? '#FAF8F5'
    : categories.length > 0
    ? '#EEF6FD'
    : '#FDF0EC'

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6">
        {/* Ambient blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: '-50px', right: '-80px',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(242,196,196,0.45) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            bottom: '-80px', left: '-80px',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(200,223,240,0.40) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(70px)',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(200,146,42,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="font-body mb-5 text-sm font-medium uppercase tracking-[0.35em] text-gold">
            Handcrafted in Kolkata
          </p>
          <h1
            className="font-heading mb-6 font-light leading-tight text-primary"
            style={{ fontSize: 'clamp(40px, 8vw, 96px)' }}
          >
            Where Every Flame
            <br />
            <em className="gold-gradient-text not-italic">Tells a Story</em>
          </h1>
          <p className="font-body mx-auto mb-10 max-w-xl text-lg text-secondary">
            Premium handmade candles crafted with love — from soy wax to beeswax,
            scented to decorative. Pan‑India delivery.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/categories"
              className="font-body text-sm font-medium text-white transition-colors duration-300 hover:bg-gold"
              style={{
                background: '#1A1208',
                borderRadius: '2px',
                padding: '14px 32px',
                letterSpacing: '2px',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Shop All Candles
            </Link>
            <a
              href="https://wa.me/919330799407?text=Hi%20Miora%20Candles!%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 font-body text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-white"
              style={{
                border: '1px solid #C8922A',
                borderRadius: '2px',
                padding: '14px 32px',
                letterSpacing: '1px',
              }}
            >
              {WA_SVG}
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeStrip />

      {/* ── Categories ── */}
      {categories.length > 0 && (
        <>
          <Wave from="#FDF0EC" to="#EEF6FD" />
          <section className="py-16 sm:py-20" style={{ background: '#EEF6FD' }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="font-body mb-2 text-sm font-medium uppercase tracking-widest text-gold">
                  Our Collections
                </p>
                <h2 className="font-heading text-4xl font-light text-primary sm:text-5xl">
                  Shop by Category
                </h2>
              </div>
              {/* 1 col mobile, 2 tablet, 3 desktop */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => (
                  <CategoryCard key={cat._id} category={cat} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/categories"
                  className="inline-flex min-h-[44px] items-center font-body text-sm font-medium text-primary transition-colors duration-300 hover:text-gold"
                  style={{ border: '1px solid #1A1208', borderRadius: '2px', padding: '12px 32px', letterSpacing: '1px' }}
                >
                  View All Categories
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Featured Products ── */}
      {featuredProducts.length > 0 && (
        <>
          <Wave
            from={categories.length > 0 ? '#EEF6FD' : '#FDF0EC'}
            to="#FAF8F5"
            flip={categories.length > 0}
          />
          <section className="py-16 sm:py-20" style={{ background: '#FAF8F5' }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="font-body mb-2 text-sm font-medium uppercase tracking-widest text-gold">
                  Handpicked for You
                </p>
                <h2 className="font-heading text-4xl font-light text-primary sm:text-5xl">
                  Featured Products
                </h2>
              </div>
              <FeaturedCarousel products={featuredProducts} />
              <div className="mt-10 text-center">
                <Link
                  href="/categories"
                  className="inline-flex min-h-[44px] items-center font-body text-sm font-medium text-white transition-colors duration-300 hover:bg-gold"
                  style={{ background: '#1A1208', borderRadius: '2px', padding: '12px 32px', letterSpacing: '2px' }}
                >
                  Shop All Products
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Wave into Story ── */}
      <Wave from={preStoryBg} to="#FDF0EC" />

      {/* ── Our Story ── */}
      <section className="py-16 sm:py-20" style={{ background: '#FDF0EC' }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-body mb-4 text-sm font-medium uppercase tracking-widest text-gold">
            Our Story
          </p>
          {/* Gold rule */}
          <div
            className="mx-auto mb-6"
            style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #C8922A, transparent)' }}
            aria-hidden="true"
          />
          <h2 className="font-heading mb-6 text-4xl font-light text-primary sm:text-5xl">
            Crafted with{' '}
            <em className="gold-gradient-text not-italic">Intention</em>
          </h2>
          <p className="font-body mb-4 text-base leading-relaxed text-secondary">
            At Miora Candles, every candle is born in our Kolkata workshop from natural soy wax,
            pure beeswax, and carefully chosen fragrance oils. We believe a flame should do more
            than light a room — it should set a mood, tell a story, carry a memory.
          </p>
          <p className="font-body mb-8 text-base leading-relaxed text-secondary">
            From intimate wedding favours to everyday home accents, each piece is hand-poured,
            hand-labelled, and packed with care for delivery across India.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center font-body text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-white"
            style={{ border: '1px solid #C8922A', borderRadius: '2px', padding: '12px 32px', letterSpacing: '1px' }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ── Custom Order CTA ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #F2C4C4 0%, #FAF8F5 50%, #C8DFF0 100%)' }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2
            className="font-heading mb-3 font-light text-primary"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
          >
            Have a custom order in mind?
          </h2>
          <p className="font-body mb-8 text-base text-secondary">
            We love creating bespoke candles for weddings, corporates, and gift sets. Chat with us!
          </p>
          <a
            href="https://wa.me/919330799407?text=Hi%20Miora%20Candles!%20I%20am%20interested%20in%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 bg-white font-body text-sm font-semibold text-primary transition-all duration-300 hover:bg-gold hover:text-white"
            style={{
              border: '1px solid rgba(200,146,42,0.4)',
              borderRadius: '2px',
              padding: '14px 36px',
              letterSpacing: '1px',
            }}
          >
            {WA_SVG}
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Wave into footer ── */}
      <Wave from="#C8DFF0" to="#1A1208" flip />
    </>
  )
}
