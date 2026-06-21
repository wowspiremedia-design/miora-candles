'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(250,248,245,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(200,146,42,0.15)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile header: spacer | logo center | hamburger */}
        <div className="flex items-center justify-between py-4 md:hidden">
          <div className="w-10" aria-hidden="true" />
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src="/Miora_candle_logo.png"
                alt="Miora Candles Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
          </Link>
          <button
            className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-6 bg-primary transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-primary transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-primary transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Desktop header: logo left, nav right */}
        <div className="hidden items-center justify-between py-4 md:flex">
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src="/Miora_candle_logo.png"
                alt="Miora Candles Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
          </Link>
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium tracking-wide text-primary transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/categories"
              className="font-body text-sm font-medium text-white transition-colors duration-300 hover:bg-gold"
              style={{ background: '#1A1208', borderRadius: '2px', padding: '10px 24px', letterSpacing: '2px' }}
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col md:hidden"
          style={{
            top: '80px',
            background: 'rgba(250,248,245,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <nav className="flex flex-col items-center justify-center gap-8 px-8 py-16">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-3xl font-light text-primary transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/categories"
              onClick={() => setMenuOpen(false)}
              className="mt-2 font-body text-sm font-medium text-white transition-colors duration-300 hover:bg-gold"
              style={{
                background: '#1A1208',
                borderRadius: '2px',
                padding: '14px 40px',
                letterSpacing: '2px',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
