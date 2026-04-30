'use client'
import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { navLinks, PHONE_DISPLAY, WA_LINK } from '@/lib/data'
import Logo from '@/components/layout/Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,9,26,0.85)' : 'rgba(5,9,26,0.5)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#beranda"><Logo variant="dark" /></a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              <Phone size={13} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-sm text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.03]"
              style={{ background: 'rgba(27,78,216,0.35)', borderColor: 'rgba(59,130,246,0.3)', boxShadow: '0 4px 20px rgba(27,78,216,0.25)' }}
            >
              Konsultasi Sekarang →
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-4 py-5 flex flex-col gap-4 border-t"
          style={{ background: 'rgba(5,9,26,0.95)', backdropFilter: 'blur(24px)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium py-1"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="text-white text-sm font-semibold px-5 py-3 rounded-xl text-center"
            style={{ background: 'rgba(27,78,216,0.5)', border: '1px solid rgba(59,130,246,0.3)' }}
          >
            Konsultasi Sekarang →
          </a>
        </div>
      )}
    </header>
  )
}
