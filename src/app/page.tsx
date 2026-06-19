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

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    client.fetch<Category[]>(allCategoriesQuery),
    client.fetch<Product[]>(featuredProductsQuery),
  ])

  return (
    <>
      {/* ── Hero ── */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center border-b border-[#E8DDD0] bg-page-bg px-4 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="font-body mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Handcrafted in Kolkata
          </p>
          <h1 className="font-heading mb-6 text-5xl font-light leading-tight text-primary sm:text-6xl lg:text-7xl">
            Where Every Flame<br />
            <em className="text-gold">Tells a Story</em>
          </h1>
          <p className="font-body mx-auto mb-10 max-w-xl text-lg text-secondary">
            Premium handmade candles crafted with love — from soy wax to beeswax,
            scented to decorative. Pan‑India delivery.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/categories"
              className="rounded-full bg-primary px-8 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-colors hover:bg-gold"
            >
              Shop All Candles
            </Link>
            <a
              href="https://wa.me/919330799407?text=Hi%20Miora%20Candles!%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-primary px-8 py-3.5 font-body text-sm font-medium tracking-wide text-primary transition-colors hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll hint */}
      </section>

      {/* ── Marquee strip ── */}
      <MarqueeStrip />

      {/* ── Featured Categories ── */}
      {categories.length > 0 && (
        <section className="border-b border-[#E8DDD0] bg-[#FDFAF5] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="font-body mb-2 text-sm font-medium uppercase tracking-widest text-gold">
                Our Collections
              </p>
              <h2 className="font-heading text-4xl font-light text-primary sm:text-5xl">
                Shop by Category
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/categories"
                className="inline-block rounded-full border border-primary px-8 py-3 font-body text-sm font-medium text-primary transition-colors hover:border-gold hover:text-gold"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Products ── */}
      {featuredProducts.length > 0 && (
        <section className="border-b border-[#E8DDD0] bg-[#FDFAF5] py-16 sm:py-20">
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
                className="inline-block rounded-full bg-primary px-8 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-gold"
              >
                Shop All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Story / About strip ── */}
      <section className="border-b border-[#E8DDD0] bg-[#F5EFE4] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-body mb-4 text-sm font-medium uppercase tracking-widest text-gold">
            Our Story
          </p>
          <h2 className="font-heading mb-6 text-4xl font-light text-primary sm:text-5xl">
            Crafted with Intention
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
            className="inline-block rounded-full border border-gold px-8 py-3 font-body text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ── WhatsApp CTA banner ── */}
      <section className="bg-gold py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading mb-3 text-3xl font-light text-white sm:text-4xl">
            Have a custom order in mind?
          </h2>
          <p className="font-body mb-6 text-base text-white/80">
            We love creating bespoke candles for weddings, corporates, and gift sets. Chat with us!
          </p>
          <a
            href="https://wa.me/919330799407?text=Hi%20Miora%20Candles!%20I%20am%20interested%20in%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-body text-sm font-semibold text-gold transition-opacity hover:opacity-90"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
