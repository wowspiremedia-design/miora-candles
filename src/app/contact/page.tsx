import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Miora Candles Kolkata',
  description:
    'Get in touch with Miora Candles. Visit us in Rajpur Sonarpur, Kolkata or reach us via WhatsApp for custom orders and enquiries. Pan-India delivery.',
  alternates: { canonical: 'https://mioracandles.in/contact' },
  openGraph: {
    title: 'Contact | Miora Candles',
    description: 'Reach out to Miora Candles via WhatsApp or visit us in Kolkata.',
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Miora Candles',
  description: 'Premium handmade candles crafted in Kolkata — soy, beeswax, gel, scented and decorative candles.',
  url: 'https://mioracandles.in',
  telephone: '+919330799407',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Promodnagar, Chowhat',
    addressLocality: 'Rajpur Sonarpur',
    addressRegion: 'West Bengal',
    postalCode: '700149',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.4167',
    longitude: '88.3833',
  },
  openingHours: 'Mo-Su 09:00-20:00',
  priceRange: '₹₹',
  servesCuisine: undefined,
  hasMap: 'https://www.google.com/maps/place/Miora+Candles/data=!4m2!3m1!1s0x0:0x32f83560b9dbaa45',
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <div className="bg-page-bg">
        {/* Page header */}
        <div className="border-b border-border bg-section-alt py-14 text-center">
          <p className="font-body mb-2 text-sm font-medium uppercase tracking-widest text-gold">
            Reach Us
          </p>
          <h1 className="font-heading text-4xl font-light text-primary sm:text-5xl">
            Get In Touch
          </h1>
          <p className="font-body mx-auto mt-3 max-w-xl text-base text-secondary">
            For custom orders, bulk enquiries, or just to say hello — we&apos;re always happy to hear from you.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-heading mb-6 text-3xl font-light text-primary">
                  Contact Details
                </h2>

                <div className="flex flex-col gap-5">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919330799407?text=Hi%20Miora%20Candles!%20I%20would%20like%20to%20enquire%20about%20your%20candles."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-50">
                      <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading text-lg font-semibold text-primary transition-colors group-hover:text-gold">
                        WhatsApp
                      </p>
                      <p className="font-body text-sm text-secondary">+91 93307 99407</p>
                      <p className="font-body mt-1 text-xs text-gold">
                        Tap to open WhatsApp chat →
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+919330799407"
                    className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading text-lg font-semibold text-primary transition-colors group-hover:text-gold">
                        Phone
                      </p>
                      <p className="font-body text-sm text-secondary">+91 93307 99407</p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading text-lg font-semibold text-primary">Address</p>
                      <address className="mt-1 font-body text-sm not-italic text-secondary">
                        Promodnagar, Chowhat<br />
                        Rajpur Sonarpur<br />
                        Kolkata, West Bengal 700149
                      </address>
                      <a
                        href="https://www.google.com/maps/place/Miora+Candles/data=!4m2!3m1!1s0x0:0x32f83560b9dbaa45"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body mt-2 block text-xs text-gold hover:underline"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Shipping note */}
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading text-lg font-semibold text-primary">Shipping</p>
                      <p className="font-body mt-1 text-sm text-secondary">
                        We deliver pan-India. Shipping cost is extra and depends on your location.
                        WhatsApp us for a shipping quote before placing your order.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-3xl font-light text-primary">
                Find Us
              </h2>
              <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.0!2d88.3833!3d22.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x32f83560b9dbaa45!2sMiora%20Candles!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Miora Candles location on Google Maps"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Miora+Candles/data=!4m2!3m1!1s0x0:0x32f83560b9dbaa45"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-body text-sm font-medium text-secondary shadow-sm transition-colors hover:border-gold hover:text-gold"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Open in Google Maps
              </a>

              {/* Quick WhatsApp CTA */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center">
                <p className="font-heading mb-2 text-xl font-semibold text-primary">
                  Prefer to chat?
                </p>
                <p className="font-body mb-4 text-sm text-secondary">
                  Send us a WhatsApp message and we&apos;ll respond promptly.
                </p>
                <a
                  href="https://wa.me/919330799407?text=Hi%20Miora%20Candles!%20I%20would%20like%20to%20enquire%20about%20your%20candles."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-gold"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
