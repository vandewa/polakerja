# Polakerja Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a pixel-accurate Next.js 16 landing page for Polakerja Consulting matching the client design.

**Architecture:** Single-page App Router app with all sections as isolated components in `components/sections/`. All content hardcoded in `lib/data.ts`. Framer Motion handles all scroll-triggered and stagger animations.

**Tech Stack:** Next.js 16.2.4, Tailwind CSS v4, Framer Motion, Lucide React, next/image, Vercel

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `app/`, `public/`, config files (auto-generated)

**Step 1: Run scaffolding command**

```bash
cd C:/laragon/www/polakerja
npx create-next-app@16.2.4 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

Expected: Project files created including `app/`, `public/`, `tailwind.config.ts`, `next.config.ts`

**Step 2: Install additional dependencies**

```bash
npm install framer-motion lucide-react
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running on http://localhost:3000

**Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 16 project with Tailwind and Framer Motion"
```

---

### Task 2: Global Styles, Fonts & Color Tokens

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`

**Step 1: Update `tailwind.config.ts` with brand colors**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B4ED8',
        navy: '#1E3A5F',
        'navy-dark': '#162D4A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
export default config
```

**Step 2: Update `app/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
}
```

**Step 3: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Polakerja Consulting — ISO, Legalitas & Perizinan Terpercaya',
  description: 'Kami membantu perusahaan membangun sistem manajemen yang efektif, memenuhi standar, dan siap bersaing di tingkat global.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

**Step 4: Verify styles applied**

Run `npm run dev`, open http://localhost:3000, inspect font is Inter.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: configure global styles, Inter font, and brand color tokens"
```

---

### Task 3: Content Data File

**Files:**
- Create: `lib/data.ts`

**Step 1: Create `lib/data.ts` with all hardcoded content**

```ts
export const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Blog', href: '#blog' },
  { label: 'Kontak', href: '#kontak' },
]

export const layananData = [
  {
    id: 'iso',
    title: 'Sertifikasi ISO',
    icon: 'Shield',
    items: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 37001'],
  },
  {
    id: 'legalitas',
    title: 'Legalitas & Perizinan',
    icon: 'FileText',
    items: ['Pendirian Perusahaan', 'Perizinan Akta', 'NIB & OSS', 'NIV Online'],
  },
  {
    id: 'sbu',
    title: 'SBU & SKK',
    icon: 'Briefcase',
    items: ['SBU Konsultansi', 'SBU Non Konsultansi', 'SKK Konstruksi'],
  },
  {
    id: 'sistem',
    title: 'Sistem Manajemen',
    icon: 'Settings',
    items: ['Penyusunan Dokumen', 'Implementasi Sistem', 'Internal Audit', 'Management Review'],
  },
  {
    id: 'pendampingan',
    title: 'Pendampingan',
    icon: 'Users',
    items: ['Audit Sertifikasi', 'Audit Eksternal', 'Perbaikan (CAPA)', 'Training & Workshop'],
  },
]

export const statsData = [
  { value: 150, suffix: '+', label: 'Proyek Selesai', description: 'Berbagai industri telah mempercayakan proyek dan legalitasnya.' },
  { value: 100, suffix: '+', label: 'Klien Puas', description: 'Kepuasan klien selalu kami prioritaskan di setiap langkah.' },
  { value: 98, suffix: '%', label: 'Tingkat Keberhasilan', description: 'Proses sertifikasi & perizinan berhasil hingga tahap akhir.' },
  { value: 10, suffix: '+', label: 'Tahun Pengalaman', description: 'Tim kami berpengalaman melayani klien dari berbagai sektor.' },
]

export const prosesData = [
  { step: 1, title: 'Konsultasi Awal', icon: 'MessageCircle', description: 'Memahami kebutuhan, tujuan, dan kondisi bisnis Anda.' },
  { step: 2, title: 'Analisis & Perencanaan', icon: 'ClipboardList', description: 'Analisis gap dan merencanakan implementasi yang tepat.' },
  { step: 3, title: 'Implementasi', icon: 'Zap', description: 'Pendampingan penerapan sistem dan dokumen secara efektif.' },
  { step: 4, title: 'Audit & Evaluasi', icon: 'Search', description: 'Audit internal dan evaluasi kesiapan untuk sertifikasi.' },
  { step: 5, title: 'Sertifikasi & Perizinan', icon: 'Award', description: 'Mendampingi hingga terbit dan diterbitkan.' },
]

export const tentangPoints = [
  'Tim konsultan berpengalaman & bersertifikasi',
  'Metodologi praktis dan mudah diterapkan',
  'Pendampingan sampai tuntas',
  'Layanan profesional dan tepat waktu',
  'Komitmen & Integritas terjamin',
]

export const testimoniData = [
  {
    quote: 'Polakerja Consulting sangat membantu kami dalam proses sertifikasi ISO 9001. Tim mereka profesional, responsif, dan selalu siap membantu. Terima kasih!',
    name: 'Andi Pratama',
    role: 'Direktur Operasional',
    company: 'PT. Maju Bersama',
  },
  {
    quote: 'Proses SBU dan SKK kami jadi jauh lebih mudah dan terarah berkat pendampingan dari Polakerja Consulting. Highly recommended!',
    name: 'Risa Kumiwati',
    role: 'Project Manager',
    company: 'PT. Cipta Karya',
  },
  {
    quote: 'Dokumen sertifikasi yang disiapkan sangat rapi dan lengkap. Audit berjalan lancar dan kami berhasil mendapat sertifikat tanpa masalah.',
    name: 'Budi Santoso',
    role: 'Direktur Utama',
    company: 'PT. Solusi Prima',
  },
]
```

**Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add hardcoded content data file"
```

---

### Task 4: Navbar Component

**Files:**
- Create: `components/layout/Navbar.tsx`

**Step 1: Create Navbar with sticky scroll behavior**

```tsx
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
              <a key={link.href} href={link.href} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#kontak" className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
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
          <a href="#kontak" className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-md text-center">
            Konsultasi Sekarang →
          </a>
        </div>
      )}
    </header>
  )
}
```

**Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add sticky Navbar with mobile menu"
```

---

### Task 5: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

**Step 1: Create Hero section**

```tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Gedung perkantoran"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p {...fadeUp(0)} className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Konsultan ISO & Legalitas Terpercaya
            </motion.p>
            <motion.h1 {...fadeUp(0.1)} className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Bangun Sistem.<br />
              Pastikan Kepatuhan.<br />
              <span className="text-primary">Dorong Pertumbuhan.</span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="text-gray-600 text-lg mb-8 max-w-lg">
              Kami membantu perusahaan membangun sistem manajemen yang efektif, memenuhi standar, dan siap bersaing di tingkat global. 100% Komitmen Klien.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-8">
              {['Berpengalaman & Professional', 'Pendekatan Praktis & Efisien', '100% Komitmen Klien'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
              <a href="#kontak" className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Konsultasi Gratis
              </a>
              <a href="#layanan" className="border border-primary text-primary font-semibold px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
                Lihat Layanan →
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm ml-auto border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-primary rounded-sm" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">Solusi Tepat untuk Bisnis yang Ingin Tumbuh & Berkelanjutan</h3>
              <p className="text-gray-500 text-sm mb-6">Partner terpercaya untuk kepatuhan dan pertumbuhan bisnis Anda.</p>
              <div className="flex flex-wrap gap-2">
                {['ISO · Legalitas', 'SBU · SKK · COS'].map((tag) => (
                  <span key={tag} className="bg-blue-50 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with Framer Motion animations"
```

---

### Task 6: Layanan Section

**Files:**
- Create: `components/sections/Layanan.tsx`

**Step 1: Create Layanan section with stagger animation**

```tsx
'use client'
import { motion } from 'framer-motion'
import { Shield, FileText, Briefcase, Settings, Users } from 'lucide-react'
import { layananData } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  Shield, FileText, Briefcase, Settings, Users,
}

export default function Layanan() {
  return (
    <section id="layanan" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Layanan Kami</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Solusi Lengkap untuk Kebutuhan Bisnis Anda</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {layananData.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(27,78,216,0.12)' }}
                className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-sm cursor-pointer transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {item.items.map((sub) => (
                    <li key={sub} className="text-gray-500 text-sm">{sub}</li>
                  ))}
                </ul>
                <a href="#kontak" className="text-primary text-sm font-semibold mt-auto hover:underline">
                  Selengkapnya →
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/sections/Layanan.tsx
git commit -m "feat: add Layanan section with stagger card animations"
```

---

### Task 7: Stats Section

**Files:**
- Create: `components/sections/Stats.tsx`

**Step 1: Create Stats with counter animation**

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData } from '@/lib/data'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-extrabold text-white">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {statsData.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <Counter value={item.value} suffix={item.suffix} />
              <p className="text-blue-200 font-semibold text-base">{item.label}</p>
              <p className="text-blue-300/70 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/sections/Stats.tsx
git commit -m "feat: add Stats section with counter animation"
```

---

### Task 8: Proses Section

**Files:**
- Create: `components/sections/Proses.tsx`

**Step 1: Create Proses section**

```tsx
'use client'
import { motion } from 'framer-motion'
import { MessageCircle, ClipboardList, Zap, Search, Award } from 'lucide-react'
import { prosesData } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  MessageCircle, ClipboardList, Zap, Search, Award,
}

export default function Proses() {
  return (
    <section id="proses" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Proses Kami</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Pendekatan Sistematis, Hasil Optimal</h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-blue-100 z-0" />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {prosesData.map((item, i) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="w-20 h-20 bg-white border-2 border-blue-100 rounded-full flex items-center justify-center shadow-md">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Langkah {item.step}</p>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/sections/Proses.tsx
git commit -m "feat: add Proses section with horizontal step layout"
```

---

### Task 9: Tentang Kami Section

**Files:**
- Create: `components/sections/TentangKami.tsx`

**Step 1: Create TentangKami section**

```tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { tentangPoints } from '@/lib/data'

export default function TentangKami() {
  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Tentang Kami</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Mengapa Memilih<br />Polakerja Consulting?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kami bukan hanya konsultan. Kami adalah mitra strategis yang membantu membangun fondasi bisnis Anda secara terstruktur, melalui evaluasi reguler, dan dengan tenaga ahli yang kompeten setiap minggu.
            </p>
            <ul className="flex flex-col gap-4 mb-10">
              {tentangPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <a href="#kontak" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Selengkapnya Tentang Kami →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Tim Polakerja Consulting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy/40" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Image src="/logo.svg" alt="Polakerja" width={120} height={30} className="mb-2 brightness-0 invert" />
                <p className="text-white text-sm font-medium">Partner Anda untuk Kepatuhan dan Pertumbuhan Berkelanjutan</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              {['Profesional', 'Terpercaya', 'Berkelanjutan'].map((badge) => (
                <div key={badge} className="flex-1 bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-primary font-bold text-sm">{badge}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/sections/TentangKami.tsx
git commit -m "feat: add TentangKami section with split layout and slide animations"
```

---

### Task 10: Testimoni Section

**Files:**
- Create: `components/sections/Testimoni.tsx`

**Step 1: Create Testimoni section**

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimoniData } from '@/lib/data'

export default function Testimoni() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimoni" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Kepercayaan Mereka, Prioritas Kami</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimoniData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`bg-white rounded-2xl p-8 shadow-sm border-2 cursor-pointer transition-all ${active === i ? 'border-primary shadow-blue-100 shadow-lg' : 'border-transparent hover:border-blue-100'}`}
            >
              <Quote size={32} className="text-primary mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{item.quote}"</p>
              <div>
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.role}</p>
                <p className="text-primary text-sm font-medium">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {testimoniData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${active === i ? 'bg-primary w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/sections/Testimoni.tsx
git commit -m "feat: add Testimoni section with interactive dot navigation"
```

---

### Task 11: CTA Section

**Files:**
- Create: `components/sections/CTA.tsx`

**Step 1: Create CTA section**

```tsx
'use client'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Siap Meningkatkan Sistem dan Kepatuhan Bisnis Anda?
            </h2>
            <p className="text-blue-200 text-base">
              Konsultasikan kebutuhan Anda dengan tim ahli kami sekarang juga.
            </p>
          </div>
          <a
            href="#kontak"
            className="shrink-0 bg-white text-primary font-bold px-8 py-4 rounded-md hover:bg-blue-50 transition-colors text-base whitespace-nowrap"
          >
            Konsultasi Gratis Sekarang →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/sections/CTA.tsx
git commit -m "feat: add CTA section"
```

---

### Task 12: Footer Component

**Files:**
- Create: `components/layout/Footer.tsx`

**Step 1: Create Footer**

```tsx
import Image from 'next/image'
import { Instagram, Linkedin, Facebook } from 'lucide-react'

const footerLinks = {
  Layanan: ['Sertifikasi ISO', 'Legalitas & Perizinan', 'SBU & SKK', 'Sistem Manajemen', 'Pendampingan'],
  Perusahaan: ['Tentang Kami', 'Blog', 'Karir', 'Kontak'],
}

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white pt-16 pb-8" style={{ backgroundColor: '#162D4A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <Image src="/logo.svg" alt="Polakerja" width={140} height={36} className="brightness-0 invert mb-4" />
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-200 text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-bold text-white mb-4">Kontak Kami</h4>
            <ul className="flex flex-col gap-3 text-blue-200 text-sm">
              <li>+62 852-3456-7890</li>
              <li>info@polakerja.id</li>
              <li className="leading-relaxed">Jl. Terusbagus No. 16,<br />Jakarta Selatan, DKI Jakarta 12560</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-300 text-xs">
          <p>© 2024 Polakerja Consulting. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
          <p>Part of <span className="text-white font-semibold">Pola Group</span></p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer with 4-column layout and social links"
```

---

### Task 13: Assemble app/page.tsx

**Files:**
- Modify: `app/page.tsx`

**Step 1: Wire all sections into page.tsx**

```tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Layanan from '@/components/sections/Layanan'
import Stats from '@/components/sections/Stats'
import Proses from '@/components/sections/Proses'
import TentangKami from '@/components/sections/TentangKami'
import Testimoni from '@/components/sections/Testimoni'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Layanan />
        <Stats />
        <Proses />
        <TentangKami />
        <Testimoni />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
```

**Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble all sections in page.tsx"
```

---

### Task 14: Add Placeholder Logo & Final Polish

**Files:**
- Create: `public/logo.svg`
- Modify: `next.config.ts` (allow Unsplash images)

**Step 1: Add placeholder logo SVG (until client provides real one)**

```svg
<!-- public/logo.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="140" height="36" viewBox="0 0 140 36">
  <rect width="32" height="32" x="0" y="2" rx="6" fill="#1B4ED8"/>
  <text x="10" y="22" font-family="Inter,sans-serif" font-size="14" font-weight="800" fill="white">P</text>
  <text x="38" y="24" font-family="Inter,sans-serif" font-size="16" font-weight="700" fill="#1E3A5F">polakerja</text>
  <text x="38" y="34" font-family="Inter,sans-serif" font-size="8" font-weight="500" fill="#6B7280">CONSULTING</text>
</svg>
```

**Step 2: Update `next.config.ts` to allow Unsplash images**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
```

**Step 3: Run full build to catch any errors**

```bash
npm run build
```

Expected: Compiled successfully with no errors.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add placeholder logo and configure Unsplash image domains"
```

---

### Task 15: Deploy to Vercel

**Step 1: Push to GitHub (create repo first if needed)**

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

**Step 2: Deploy via Vercel CLI or dashboard**

Option A — CLI:
```bash
npx vercel --yes
```

Option B — Dashboard: Import repo at vercel.com/new

**Step 3: Verify live URL works, check all sections and animations**

Open the deployed URL and verify:
- [ ] Navbar sticky + shadow on scroll
- [ ] Hero image loads, animations play
- [ ] Layanan cards hover effect
- [ ] Stats counter animates on scroll
- [ ] Proses steps animate in sequence
- [ ] Tentang Kami slide-in works
- [ ] Testimoni dots interactive
- [ ] CTA section visible
- [ ] Footer links present
- [ ] Mobile responsive at 375px

**Step 4: Final commit if any fixes needed**

```bash
git add .
git commit -m "fix: post-deploy visual polish"
git push
```
