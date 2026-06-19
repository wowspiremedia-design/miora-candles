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
    <header className="sticky top-0 z-50 border-b border-border bg-page-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium tracking-wide text-primary transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/categories"
            className="rounded-full border border-primary bg-primary px-5 py-2 font-body text-sm font-medium text-white transition-colors hover:border-gold hover:bg-gold"
          >
            Enquire Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-primary transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-primary transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-primary transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-page-bg md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-4 py-3 font-body text-base font-medium text-primary transition-colors hover:bg-section-alt hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/categories"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-full bg-primary px-4 py-3 text-center font-body text-sm font-medium text-white transition-colors hover:bg-gold"
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
