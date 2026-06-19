import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Miora Candles | Handmade Luxury Candles Kolkata',
    template: '%s | Miora Candles',
  },
  description:
    'Discover premium handmade candles crafted in Kolkata. Soy wax, beeswax, gel, scented, decorative candles and gift sets. Pan-India delivery.',
  keywords: [
    'handmade candles',
    'luxury candles',
    'soy candles',
    'scented candles',
    'Kolkata candles',
    'Miora Candles',
    'buy candles online India',
  ],
  authors: [{ name: 'Miora Candles' }],
  creator: 'Miora Candles',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mioracandles.in',
    siteName: 'Miora Candles',
    title: 'Miora Candles | Handmade Luxury Candles Kolkata',
    description:
      'Premium handmade candles crafted with love in Kolkata. Where every flame tells a story.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miora Candles | Handmade Luxury Candles Kolkata',
    description:
      'Premium handmade candles crafted with love in Kolkata. Where every flame tells a story.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-page-bg text-primary antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
