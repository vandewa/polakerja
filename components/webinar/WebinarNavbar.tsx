'use client'
import Link from 'next/link'
import Logo from '@/components/layout/Logo'

export default function WebinarNavbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-sm font-medium tracking-tight">
            Polakerja <span className="text-neutral-400">/ Webinar</span>
          </span>
        </Link>
        <a
          href="https://polakerja.com"
          className="text-sm text-neutral-600 hover:text-neutral-900 transition"
        >
          ← Polakerja.com
        </a>
      </div>
    </header>
  )
}
