'use client'
import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { navLinks, PHONE_DISPLAY, WA_LINK } from '@/lib/data'
import Logo from '@/components/layout/Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(6,13,26,0.92)' : 'rgba(6,13,26,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(255,255,255,0.04)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#beranda">
            <Logo variant="dark" />
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <Phone size={14} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)', boxShadow: '0 4px 16px rgba(27,78,216,0.4)' }}
            >
              Konsultasi Sekarang →
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: 'rgba(255,255,255,0.8)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-5 flex flex-col gap-4"
          style={{ background: 'rgba(6,13,26,0.97)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium py-1"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
            className="flex items-center gap-2 text-sm font-medium py-1"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm font-semibold px-5 py-3 rounded-lg text-center"
            style={{ background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)' }}
          >
            Konsultasi Sekarang →
          </a>
        </div>
      )}
    </header>
  )
}
