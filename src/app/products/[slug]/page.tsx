import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { allProductSlugsQuery, productBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import ProductImages from '@/components/ProductImages'
import ProductEnquiry from '@/components/ProductEnquiry'
import type { Product } from '@/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allProductSlugsQuery)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch<Product | null>(productBySlugQuery, { slug })
  if (!product) return {}

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).fit('crop').url()
    : undefined

  return {
    title: `${product.name} | Handmade Candles Kolkata | Miora Candles`,
    description:
      product.shortDescription ||
      `Buy ${product.name} from Miora Candles, Kolkata. Handmade with natural ingredients. Pan-India delivery.`,
    alternates: { canonical: `https://mioracandles.in/products/${slug}` },
    openGraph: {
      title: `${product.name} | Miora Candles`,
      description: product.shortDescription || `Handmade ${product.name} from Kolkata`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await client.fetch<Product | null>(productBySlugQuery, { slug })

  if (!product) notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images?.map((img) =>
      urlFor(img).width(800).height(800).url()
    ),
    brand: { '@type': 'Brand', name: 'Miora Candles' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Miora Candles' },
    },
  }

  const details: { label: string; value: string | undefined }[] = [
    { label: 'Material', value: product.material },
    { label: 'Burn Time', value: product.burnTime },
    { label: 'Fragrance Notes', value: product.fragranceNotes },
    { label: 'Weight', value: product.weight },
    { label: 'Category', value: product.categoryName },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="bg-page-bg">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-section-alt py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 font-body text-sm text-secondary">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              {product.categorySlug && product.categoryName ? (
                <>
                  <Link
                    href={`/categories/${product.categorySlug}`}
                    className="hover:text-gold transition-colors"
                  >
                    {product.categoryName}
                  </Link>
                  <span>/</span>
                </>
              ) : (
                <>
                  <Link href="/categories" className="hover:text-gold transition-colors">Shop</Link>
                  <span>/</span>
                </>
              )}
              <span className="text-primary">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product detail */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Images */}
            <ProductImages images={product.images ?? []} productName={product.name} />

            {/* Info */}
            <div className="flex flex-col gap-6">
              {/* Category tag */}
              {product.categoryName && product.categorySlug && (
                <Link
                  href={`/categories/${product.categorySlug}`}
                  className="inline-flex w-fit items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-body text-xs font-medium text-gold transition-colors hover:bg-gold/20"
                >
                  {product.categoryName}
                </Link>
              )}

              {/* Name & price */}
              <div>
                <h1 className="font-heading text-4xl font-light leading-tight text-primary sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-3 font-body text-3xl font-semibold text-gold">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                {!product.inStock && (
                  <span className="mt-2 inline-block rounded-full bg-red-50 px-3 py-1 font-body text-xs font-medium text-red-600">
                    Currently Out of Stock
                  </span>
                )}
              </div>

              {/* Short description */}
              {product.shortDescription && (
                <p className="font-body text-base leading-relaxed text-secondary">
                  {product.shortDescription}
                </p>
              )}

              {/* Product details table */}
              {details.some((d) => d.value) && (
                <div className="rounded-xl border border-border bg-section-alt p-4">
                  <h2 className="font-heading mb-3 text-lg font-semibold text-primary">
                    Product Details
                  </h2>
                  <dl className="grid gap-2">
                    {details
                      .filter((d) => d.value)
                      .map((d) => (
                        <div key={d.label} className="flex items-start gap-3">
                          <dt className="font-body w-32 flex-shrink-0 text-sm font-medium text-secondary">
                            {d.label}
                          </dt>
                          <dd className="font-body text-sm text-primary">{d.value}</dd>
                        </div>
                      ))}
                  </dl>
                </div>
              )}

              {/* Enquiry widget */}
              <ProductEnquiry
                productName={product.name}
                price={product.price}
                inStock={product.inStock}
              />

              {/* Shipping note */}
              <p className="font-body text-xs text-secondary">
                🚚 Shipping cost calculated based on your city. Enquire on WhatsApp for exact quote.
                Pan-India delivery available.
              </p>
            </div>
          </div>

          {/* Full description */}
          {product.fullDescription && (
            <div className="mt-16 border-t border-border pt-12">
              <h2 className="font-heading mb-6 text-3xl font-light text-primary">
                About This Candle
              </h2>
              <div className="prose prose-sm max-w-3xl font-body text-secondary [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading [&_a]:text-gold">
                <PortableText value={product.fullDescription} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
