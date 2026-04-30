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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#beranda" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Polakerja" width={140} height={36} priority />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-gray-600 hover:text-[#1B4ED8] transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="#kontak" className="bg-[#1B4ED8] text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
              Konsultasi Sekarang →
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#kontak" className="bg-[#1B4ED8] text-white text-sm font-semibold px-5 py-2.5 rounded-md text-center">
            Konsultasi Sekarang →
          </a>
        </div>
      )}
    </header>
  )
}
