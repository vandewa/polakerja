'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.88)'
          : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(27,78,216,0.08)' : '1px solid rgba(255,255,255,0.3)',
        boxShadow: scrolled ? '0 2px 24px rgba(27,78,216,0.07)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#beranda" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Polakerja" width={140} height={36} priority />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: '#374151' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1B4ED8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="#kontak"
              className="text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all"
              style={{ background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)' }}
            >
              Konsultasi Sekarang →
            </a>
          </div>
          <button className="md:hidden p-2 text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)' }}
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="text-white text-sm font-semibold px-5 py-2.5 rounded-md text-center"
            style={{ background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)' }}
          >
            Konsultasi Sekarang →
          </a>
        </div>
      )}
    </header>
  )
}
