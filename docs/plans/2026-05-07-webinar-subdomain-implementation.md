# Webinar Subdomain Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `webinar.polakerja.com` — subdomain dengan landing page custom per webinar, tombol Daftar redirect ke URL produk mayar.id.

**Architecture:** Single Next.js 16 project (codebase ini). Subdomain di-route via `proxy.ts` (Next.js 16 rename dari middleware) yang detect `host` header → rewrite ke `/webinar/*`. Konten per webinar di file komponen sendiri (`components/webinar/pages/[Slug].tsx`), dispatched lewat registry. Metadata terpusat di `lib/webinars.ts`. Tidak ada DB, auth, webhook, atau API — pembayaran murni redirect ke mayar.id.

**Tech Stack:** Next.js 16.2.4 App Router, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12, Lucide icons.

**Reference docs:**
- Design: `docs/plans/2026-05-07-webinar-subdomain-design.md`
- Next.js 16 Proxy: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`
- AGENTS.md (root) — Next.js 16 has breaking changes, baca docs sebelum coding

**Commit convention:** mengikuti pola di repo (`feat:`, `fix:`, `docs:`, `chore:`).

---

## Phase A — Foundation

### Task 1: Webinar registry + metadata helpers

**Files:**
- Create: `lib/webinars.ts`

**Step 1: Tulis types + helpers + 1 sample entry**

```ts
// lib/webinars.ts
export type WebinarStatus = 'upcoming' | 'live' | 'past'

export type Speaker = {
  name: string
  role: string
  photo: string
}

export type Webinar = {
  slug: string
  title: string
  subtitle?: string
  description: string
  thumbnail: string
  startsAt: string
  durationMinutes: number
  format: 'zoom' | 'meet' | 'youtube-live' | 'offline'
  price: number
  earlyBirdPrice?: number
  earlyBirdEndsAt?: string
  mayarUrl: string
  speakers: Speaker[]
  category: 'iso' | 'legalitas' | 'sbu' | 'sistem' | 'umum'
  recordingUrl?: string
}

export const webinars: Webinar[] = [
  {
    slug: 'iso-9001-jan2026',
    title: 'Roadmap ISO 9001 dalam 60 Hari untuk UMKM',
    subtitle: 'Dari nol sampai siap audit sertifikasi',
    description:
      'Panduan praktis menyiapkan ISO 9001 untuk UMKM tanpa konsultan mahal. Cocok untuk pemilik bisnis yang ingin tender pemerintah atau ekspor.',
    thumbnail: '/webinar/thumbnails/iso-9001-jan2026.jpg',
    startsAt: '2026-01-15T19:00:00+07:00',
    durationMinutes: 90,
    format: 'zoom',
    price: 99000,
    earlyBirdPrice: 49000,
    earlyBirdEndsAt: '2026-01-10T23:59:59+07:00',
    mayarUrl: 'https://mayar.id/polakerja/iso-9001-jan2026',
    speakers: [
      {
        name: 'Damar Wisnu',
        role: 'Lead Auditor ISO 9001',
        photo: '/webinar/speakers/damar.jpg',
      },
    ],
    category: 'iso',
  },
]

export const getWebinarStatus = (w: Webinar, now: Date = new Date()): WebinarStatus => {
  const start = new Date(w.startsAt).getTime()
  const end = start + w.durationMinutes * 60_000
  const t = now.getTime()
  if (t < start) return 'upcoming'
  if (t <= end) return 'live'
  return 'past'
}

export const getUpcomingWebinars = (now: Date = new Date()) =>
  webinars
    .filter((w) => getWebinarStatus(w, now) !== 'past')
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))

export const getPastWebinars = (now: Date = new Date()) =>
  webinars
    .filter((w) => getWebinarStatus(w, now) === 'past')
    .sort((a, b) => +new Date(b.startsAt) - +new Date(a.startsAt))

export const getWebinarBySlug = (slug: string): Webinar | undefined =>
  webinars.find((w) => w.slug === slug)
```

**Step 2: Manual smoke verify via tsc**

Run: `npx tsc --noEmit`
Expected: tidak ada error TypeScript

**Step 3: Commit**

```
git add lib/webinars.ts
git commit -m "feat(webinar): registry types + metadata helpers"
```

---

### Task 2: Subdomain routing via proxy.ts

**Files:**
- Create: `proxy.ts` (root)

**Step 1: Tulis proxy**

```ts
// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const WEBINAR_HOSTS = new Set([
  'webinar.polakerja.com',
  'webinar.localhost:3000',
  'webinar.localhost',
])

export function proxy(req: NextRequest) {
  const host = req.headers.get('host') ?? ''
  const isWebinar = WEBINAR_HOSTS.has(host)
  const url = req.nextUrl.clone()

  if (isWebinar && !url.pathname.startsWith('/webinar')) {
    url.pathname = url.pathname === '/' ? '/webinar' : `/webinar${url.pathname}`
    return NextResponse.rewrite(url)
  }

  if (!isWebinar && url.pathname.startsWith('/webinar')) {
    const target = req.nextUrl.clone()
    target.host = 'webinar.polakerja.com'
    target.pathname = url.pathname.replace(/^\/webinar/, '') || '/'
    return NextResponse.redirect(target, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
}
```

**Step 2: Manual verify dev**

Edit hosts file: `127.0.0.1 webinar.localhost` (atau gunakan `webinar.localhost:3000` langsung — beberapa browser auto-resolve `*.localhost`).

Run dev: `npm run dev`
Test:
- Visit `http://localhost:3000/` → harus tetap render landing utama (Hero, Layanan, dll)
- Visit `http://webinar.localhost:3000/` → harus 404 (belum ada `app/webinar/page.tsx`) — ini expected, bukti rewrite ke `/webinar`

**Step 3: Commit**

```
git add proxy.ts
git commit -m "feat(webinar): proxy.ts for subdomain rewriting"
```

---

## Phase B — Layout Shell

### Task 3: Webinar navbar component

**Files:**
- Create: `components/webinar/WebinarNavbar.tsx`

**Step 1: Tulis navbar minimalis**

Pakai brand Logo dari `components/layout/Logo.tsx`. Style refer ke `components/layout/Navbar.tsx` tapi disederhanakan: cuma logo (link ke `/`), CTA "Lihat Semua Webinar" di kanan kalau di detail page, atau "Konsultasi Polakerja" yang link ke `https://polakerja.com`.

```tsx
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
```

**Step 2: Commit**

```
git add components/webinar/WebinarNavbar.tsx
git commit -m "feat(webinar): WebinarNavbar component"
```

---

### Task 4: Webinar layout + index page placeholder

**Files:**
- Create: `app/webinar/layout.tsx`
- Create: `app/webinar/page.tsx` (placeholder, akan diisi di Task 17)

**Step 1: Layout**

```tsx
// app/webinar/layout.tsx
import WebinarNavbar from '@/components/webinar/WebinarNavbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: { default: 'Webinar Polakerja', template: '%s — Webinar Polakerja' },
  description: 'Webinar legalitas, sertifikasi, dan sistem manajemen dari Polakerja.',
}

export default function WebinarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebinarNavbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

**Step 2: Index placeholder**

```tsx
// app/webinar/page.tsx
export default function WebinarIndexPage() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-3xl font-medium">Webinar Polakerja</h1>
      <p className="mt-2 text-neutral-600">Halaman index. Belum diisi.</p>
    </section>
  )
}
```

**Step 3: Manual verify**

Visit `http://webinar.localhost:3000/` → render header webinar + placeholder + footer.

**Step 4: Commit**

```
git add app/webinar/layout.tsx app/webinar/page.tsx
git commit -m "feat(webinar): layout + index placeholder"
```

---

### Task 5: Detail page dispatcher + registry + 404

**Files:**
- Create: `components/webinar/pages/registry.ts`
- Create: `app/webinar/[slug]/page.tsx`
- Create: `app/webinar/[slug]/not-found.tsx`

**Step 1: Empty registry**

```ts
// components/webinar/pages/registry.ts
import type { ComponentType } from 'react'
import type { Webinar } from '@/lib/webinars'

export type WebinarPageProps = { webinar: Webinar }
export const webinarPages: Record<string, ComponentType<WebinarPageProps>> = {}
```

**Step 2: Dispatcher**

```tsx
// app/webinar/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWebinarBySlug, webinars } from '@/lib/webinars'
import { webinarPages } from '@/components/webinar/pages/registry'

type Params = Promise<{ slug: string }>

export const generateStaticParams = () => webinars.map((w) => ({ slug: w.slug }))

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const w = getWebinarBySlug(slug)
  if (!w) return {}
  return {
    title: w.title,
    description: w.description,
    openGraph: {
      title: w.title,
      description: w.description,
      images: [w.thumbnail],
      type: 'website',
    },
  }
}

export default async function WebinarDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const webinar = getWebinarBySlug(slug)
  const Page = webinarPages[slug]
  if (!webinar || !Page) notFound()
  return <Page webinar={webinar} />
}
```

**Step 3: 404**

```tsx
// app/webinar/[slug]/not-found.tsx
import Link from 'next/link'

export default function WebinarNotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm uppercase tracking-widest text-neutral-500">Webinar tidak ditemukan</p>
      <h1 className="mt-3 text-3xl font-medium">Halaman ini tidak tersedia</h1>
      <p className="mt-2 text-neutral-600 max-w-md">
        Webinar yang kamu cari mungkin sudah selesai, dipindah, atau URL-nya keliru.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm hover:bg-neutral-800 transition"
      >
        Lihat semua webinar
      </Link>
    </section>
  )
}
```

**Step 4: Commit**

```
git add components/webinar/pages/registry.ts app/webinar/[slug]/page.tsx app/webinar/[slug]/not-found.tsx
git commit -m "feat(webinar): detail dispatcher + registry + 404"
```

---

## Phase C — Reusable Blocks

> **Convention untuk semua block:**
> - Place di `components/webinar/blocks/`
> - Selalu accept optional `className?: string` untuk override Tailwind
> - Pakai `'use client'` HANYA jika butuh hooks/event handlers
> - Import Lucide icons via `import { Icon } from 'lucide-react'`

### Task 6: MayarPayButton

**Files:** Create `components/webinar/blocks/MayarPayButton.tsx`

```tsx
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn' // create di Step 2 jika belum ada

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
  secondary: 'bg-amber-500 text-white hover:bg-amber-600',
  ghost: 'border border-neutral-300 text-neutral-900 hover:bg-neutral-50',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function MayarPayButton({
  href,
  children = 'Daftar Sekarang',
  variant = 'primary',
  size = 'md',
  className,
}: {
  href: string
  children?: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
}) {
  if (!href) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MayarPayButton] href is empty — tombol disable.')
    }
    return (
      <span className={cn('inline-flex items-center gap-2 rounded-full opacity-50 cursor-not-allowed', variants[variant], sizes[size], className)}>
        {children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-medium transition shadow-sm hover:shadow-md',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4" />
    </a>
  )
}
```

**Step 2: Bikin `lib/cn.ts` kalau belum ada**

```ts
// lib/cn.ts
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
```

(Note: kalau project butuh class merging penuh, install `clsx` + `tailwind-merge` nanti — untuk fase 1 cukup helper sederhana ini.)

**Step 3: Commit**

```
git add components/webinar/blocks/MayarPayButton.tsx lib/cn.ts
git commit -m "feat(webinar): MayarPayButton block + cn helper"
```

---

### Task 7: CountdownTimer

**Files:** Create `components/webinar/blocks/CountdownTimer.tsx`

```tsx
'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type Diff = { d: number; h: number; m: number; s: number; expired: boolean }

function diff(target: number): Diff {
  const ms = target - Date.now()
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true }
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return { d, h, m, s, expired: false }
}

export default function CountdownTimer({
  endsAt,
  className,
  hideWhenExpired = true,
}: {
  endsAt: string
  className?: string
  hideWhenExpired?: boolean
}) {
  const target = new Date(endsAt).getTime()
  const [t, setT] = useState<Diff>(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (t.expired && hideWhenExpired) return null

  return (
    <div className={cn('inline-flex items-center gap-3 font-mono tabular-nums', className)}>
      <Cell value={t.d} label="hari" />
      <span className="text-neutral-400">:</span>
      <Cell value={t.h} label="jam" />
      <span className="text-neutral-400">:</span>
      <Cell value={t.m} label="menit" />
      <span className="text-neutral-400">:</span>
      <Cell value={t.s} label="detik" />
    </div>
  )
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-medium">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</span>
    </div>
  )
}
```

**Commit:**
```
git add components/webinar/blocks/CountdownTimer.tsx
git commit -m "feat(webinar): CountdownTimer block"
```

---

### Task 8: WebinarHero

**Files:** Create `components/webinar/blocks/WebinarHero.tsx`

Hero dengan judul, tanggal terformat Indo (DateTimeFormat 'id-ID'), badge format (Zoom/Meet/dll), CTA primer. Optional `bgImage` atau `bgVideo` (kalau ada, render absolute background dengan overlay gradient untuk readability).

```tsx
import Image from 'next/image'
import { Calendar, Clock, Video } from 'lucide-react'
import MayarPayButton from './MayarPayButton'
import CountdownTimer from './CountdownTimer'
import { cn } from '@/lib/cn'

const formatLabels = { zoom: 'Zoom', meet: 'Google Meet', 'youtube-live': 'YouTube Live', offline: 'Offline' } as const

const dateFmt = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta',
})

export default function WebinarHero({
  title,
  subtitle,
  startsAt,
  durationMinutes,
  format,
  mayarUrl,
  bgImage,
  bgVideo,
  showCountdown = true,
  className,
}: {
  title: string
  subtitle?: string
  startsAt: string
  durationMinutes: number
  format: keyof typeof formatLabels
  mayarUrl: string
  bgImage?: string
  bgVideo?: string
  showCountdown?: boolean
  className?: string
}) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {bgVideo && (
        <video
          src={bgVideo}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {bgImage && !bgVideo && (
        <Image src={bgImage} alt="" fill priority className="object-cover" />
      )}
      {(bgImage || bgVideo) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      )}

      <div className={cn(
        'relative max-w-5xl mx-auto px-6 py-24 md:py-32',
        bgImage || bgVideo ? 'text-white' : 'text-neutral-900',
      )}>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest opacity-80">
          <span className="inline-flex items-center gap-1.5"><Video className="size-3.5" /> {formatLabels[format]}</span>
          <span className="opacity-50">•</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {durationMinutes} menit</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl opacity-80 max-w-2xl">{subtitle}</p>}

        <div className="mt-8 flex items-center gap-2 text-sm opacity-90">
          <Calendar className="size-4" />
          {dateFmt.format(new Date(startsAt))} WIB
        </div>

        {showCountdown && (
          <div className="mt-6">
            <CountdownTimer endsAt={startsAt} />
          </div>
        )}

        <div className="mt-10">
          <MayarPayButton href={mayarUrl} size="lg" variant="secondary">
            Daftar Sekarang
          </MayarPayButton>
        </div>
      </div>
    </section>
  )
}
```

**Commit:**
```
git add components/webinar/blocks/WebinarHero.tsx
git commit -m "feat(webinar): WebinarHero block"
```

---

### Task 9: VideoHero + WebinarPitch

**Files:**
- Create `components/webinar/blocks/VideoHero.tsx`
- Create `components/webinar/blocks/WebinarPitch.tsx`

```tsx
// VideoHero.tsx
import { cn } from '@/lib/cn'
export default function VideoHero({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  return (
    <div className={cn('relative aspect-video rounded-2xl overflow-hidden bg-neutral-900', className)}>
      <video src={src} poster={poster} controls playsInline preload="metadata" className="w-full h-full object-cover" />
    </div>
  )
}
```

```tsx
// WebinarPitch.tsx
import { cn } from '@/lib/cn'
export default function WebinarPitch({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('max-w-3xl mx-auto px-6 py-20', className)}>
      <div className="prose prose-neutral max-w-none text-lg leading-relaxed">{children}</div>
    </section>
  )
}
```

**Commit:**
```
git add components/webinar/blocks/VideoHero.tsx components/webinar/blocks/WebinarPitch.tsx
git commit -m "feat(webinar): VideoHero + WebinarPitch blocks"
```

---

### Task 10: LearningOutcomes + AgendaTimeline

**Files:**
- Create `components/webinar/blocks/LearningOutcomes.tsx`
- Create `components/webinar/blocks/AgendaTimeline.tsx`

```tsx
// LearningOutcomes.tsx
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function LearningOutcomes({
  title = 'Yang akan kamu pelajari',
  items,
  variant = 'grid',
  className,
}: { title?: string; items: string[]; variant?: 'grid' | 'list'; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <ul className={cn(
        'mt-10',
        variant === 'grid' ? 'grid sm:grid-cols-2 gap-6' : 'space-y-4',
      )}>
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 grid place-items-center size-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shrink-0">
              <Check className="size-3.5" />
            </span>
            <span className="text-neutral-800 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

```tsx
// AgendaTimeline.tsx
import { cn } from '@/lib/cn'

export type AgendaItem = { time: string; title: string; description?: string }

export default function AgendaTimeline({
  title = 'Agenda Sesi',
  items,
  className,
}: { title?: string; items: AgendaItem[]; className?: string }) {
  return (
    <section className={cn('max-w-3xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <ol className="mt-10 relative border-l border-neutral-200 ml-4 space-y-8">
        {items.map((it, i) => (
          <li key={i} className="pl-8 relative">
            <span className="absolute -left-2.5 top-1 size-5 rounded-full bg-neutral-900 text-white text-[10px] grid place-items-center">
              {i + 1}
            </span>
            <div className="text-xs uppercase tracking-widest text-neutral-500">{it.time}</div>
            <div className="mt-1 text-lg font-medium">{it.title}</div>
            {it.description && <p className="mt-1 text-neutral-600">{it.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}
```

**Commit:**
```
git add components/webinar/blocks/LearningOutcomes.tsx components/webinar/blocks/AgendaTimeline.tsx
git commit -m "feat(webinar): LearningOutcomes + AgendaTimeline blocks"
```

---

### Task 11: SpeakerCard + AudienceTarget + BonusList

**Files:**
- Create `components/webinar/blocks/SpeakerCard.tsx`
- Create `components/webinar/blocks/AudienceTarget.tsx`
- Create `components/webinar/blocks/BonusList.tsx`

```tsx
// SpeakerCard.tsx
import Image from 'next/image'
import { cn } from '@/lib/cn'

export type SpeakerCardData = {
  name: string
  role: string
  photo: string
  bio?: string
  credentials?: string[]
}

export default function SpeakerCard({
  speakers,
  title = 'Pembicara',
  className,
}: { speakers: SpeakerCardData[]; title?: string; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <div className={cn('mt-10 grid gap-8', speakers.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1')}>
        {speakers.map((s, i) => (
          <article key={i} className="flex items-start gap-5">
            <Image
              src={s.photo} alt={s.name} width={120} height={120}
              className="rounded-2xl object-cover w-28 h-28 shrink-0"
            />
            <div>
              <h3 className="text-xl font-medium">{s.name}</h3>
              <p className="text-neutral-600">{s.role}</p>
              {s.bio && <p className="mt-3 text-neutral-700 leading-relaxed">{s.bio}</p>}
              {s.credentials?.length ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.credentials.map((c) => (
                    <li key={c} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">{c}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
```

```tsx
// AudienceTarget.tsx
import { Target } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function AudienceTarget({
  title = 'Untuk kamu yang…',
  items,
  className,
}: { title?: string; items: string[]; className?: string }) {
  return (
    <section className={cn('max-w-4xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <ul className="mt-8 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-neutral-800">
            <Target className="size-5 shrink-0 mt-1 text-amber-500" />
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

```tsx
// BonusList.tsx
import * as Lucide from 'lucide-react'
import { cn } from '@/lib/cn'

export type BonusItem = { icon: keyof typeof Lucide; label: string; description?: string }

export default function BonusList({
  title = 'Fasilitas & Bonus',
  items,
  className,
}: { title?: string; items: BonusItem[]; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((b, i) => {
          const Icon = (Lucide[b.icon] as React.ComponentType<{ className?: string }>) ?? Lucide.Sparkles
          return (
            <div key={i} className="rounded-2xl border border-neutral-200 p-5 bg-white">
              <Icon className="size-6 text-amber-500" />
              <div className="mt-3 font-medium">{b.label}</div>
              {b.description && <p className="mt-1 text-sm text-neutral-600">{b.description}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

**Commit:**
```
git add components/webinar/blocks/SpeakerCard.tsx components/webinar/blocks/AudienceTarget.tsx components/webinar/blocks/BonusList.tsx
git commit -m "feat(webinar): SpeakerCard + AudienceTarget + BonusList blocks"
```

---

### Task 12: InvestmentBlock + TestimonialQuotes + WebinarFAQ

**Files:**
- Create `components/webinar/blocks/InvestmentBlock.tsx`
- Create `components/webinar/blocks/TestimonialQuotes.tsx`
- Create `components/webinar/blocks/WebinarFAQ.tsx`

```tsx
// InvestmentBlock.tsx
import MayarPayButton from './MayarPayButton'
import CountdownTimer from './CountdownTimer'
import { cn } from '@/lib/cn'

const idr = (n: number) =>
  n === 0 ? 'Gratis' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function InvestmentBlock({
  price, earlyBirdPrice, earlyBirdEndsAt, mayarUrl, className,
}: {
  price: number
  earlyBirdPrice?: number
  earlyBirdEndsAt?: string
  mayarUrl: string
  className?: string
}) {
  const earlyActive = !!(earlyBirdPrice && earlyBirdEndsAt && new Date(earlyBirdEndsAt).getTime() > Date.now())
  const display = earlyActive ? earlyBirdPrice! : price
  return (
    <section className={cn('max-w-2xl mx-auto px-6 py-20', className)}>
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 text-center shadow-sm">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Investasi</p>
        <div className="mt-3 flex items-baseline justify-center gap-3">
          {earlyActive && <span className="text-neutral-400 line-through text-2xl">{idr(price)}</span>}
          <span className="text-5xl font-medium">{idr(display)}</span>
        </div>
        {earlyActive && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-widest text-amber-600">Early bird berakhir dalam</p>
            <div className="mt-2 flex justify-center"><CountdownTimer endsAt={earlyBirdEndsAt!} /></div>
          </div>
        )}
        <div className="mt-8">
          <MayarPayButton href={mayarUrl} size="lg" variant="primary">Daftar Sekarang</MayarPayButton>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// TestimonialQuotes.tsx
import Image from 'next/image'
import { cn } from '@/lib/cn'

export type TestimonialItem = { quote: string; name: string; role: string; photo?: string }

export default function TestimonialQuotes({
  title = 'Apa kata peserta lampau',
  items, className,
}: { title?: string; items: TestimonialItem[]; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {items.map((t, i) => (
          <figure key={i} className="rounded-2xl border border-neutral-200 p-6 bg-white">
            <blockquote className="text-neutral-800 leading-relaxed">
              <span className="text-3xl text-neutral-300 leading-none">“</span>
              {t.quote}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              {t.photo && <Image src={t.photo} alt={t.name} width={40} height={40} className="rounded-full" />}
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-neutral-600">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
```

```tsx
// WebinarFAQ.tsx
'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'

export type FAQItem = { q: string; a: string }

export default function WebinarFAQ({
  title = 'Pertanyaan Umum',
  items, className,
}: { title?: string; items: FAQItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className={cn('max-w-3xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map((it, i) => {
          const isOpen = open === i
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium">{it.q}</span>
                <ChevronDown className={cn('size-5 transition', isOpen && 'rotate-180')} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-neutral-700 leading-relaxed">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

**Commit:**
```
git add components/webinar/blocks/InvestmentBlock.tsx components/webinar/blocks/TestimonialQuotes.tsx components/webinar/blocks/WebinarFAQ.tsx
git commit -m "feat(webinar): InvestmentBlock + TestimonialQuotes + WebinarFAQ blocks"
```

---

## Phase D — Index & Sample Webinars

### Task 13: WebinarCard component

**Files:** Create `components/webinar/WebinarCard.tsx`

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Video } from 'lucide-react'
import type { Webinar } from '@/lib/webinars'
import { getWebinarStatus } from '@/lib/webinars'
import { cn } from '@/lib/cn'

const dateFmt = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric', month: 'short', year: 'numeric',
})

const formatLabel = { zoom: 'Zoom', meet: 'Meet', 'youtube-live': 'YouTube Live', offline: 'Offline' } as const

export default function WebinarCard({ webinar, className }: { webinar: Webinar; className?: string }) {
  const status = getWebinarStatus(webinar)
  const isPast = status === 'past'
  return (
    <Link
      href={`/${webinar.slug}`}
      className={cn(
        'group rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:shadow-md hover:-translate-y-0.5 transition',
        className,
      )}
    >
      <div className="relative aspect-[16/9] bg-neutral-100">
        <Image src={webinar.thumbnail} alt={webinar.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {isPast && webinar.recordingUrl && (
          <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-neutral-800">
            Recording tersedia
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest">
          <Calendar className="size-3.5" />
          {dateFmt.format(new Date(webinar.startsAt))}
          <span>•</span>
          <Video className="size-3.5" />
          {formatLabel[webinar.format]}
        </div>
        <h3 className="mt-3 text-lg font-medium leading-snug">{webinar.title}</h3>
        {webinar.subtitle && <p className="mt-1 text-sm text-neutral-600">{webinar.subtitle}</p>}
      </div>
    </Link>
  )
}
```

**Commit:**
```
git add components/webinar/WebinarCard.tsx
git commit -m "feat(webinar): WebinarCard component for index page"
```

---

### Task 14: Index page real content

**Files:** Modify `app/webinar/page.tsx`

```tsx
import { getUpcomingWebinars, getPastWebinars } from '@/lib/webinars'
import WebinarCard from '@/components/webinar/WebinarCard'

export const metadata = {
  title: 'Webinar Polakerja',
  description: 'Webinar legalitas, sertifikasi, dan sistem manajemen dari Polakerja.',
}

export default function WebinarIndexPage() {
  const upcoming = getUpcomingWebinars()
  const past = getPastWebinars()

  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Webinar Polakerja</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-medium tracking-tight">
          Belajar legalitas & sertifikasi langsung dari ahlinya
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Webinar interaktif untuk pemilik UMKM dan tim perusahaan yang ingin naik kelas lewat sertifikasi internasional, izin usaha, dan sistem manajemen.
        </p>
      </section>

      {upcoming.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl md:text-3xl font-medium">Webinar Mendatang</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((w) => <WebinarCard key={w.slug} webinar={w} />)}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <h2 className="text-2xl md:text-3xl font-medium">Pernah Diadakan</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((w) => <WebinarCard key={w.slug} webinar={w} />)}
          </div>
        </section>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-neutral-600">Belum ada webinar terjadwal. Pantau terus halaman ini.</p>
        </section>
      )}
    </>
  )
}
```

**Manual verify:** visit `webinar.localhost:3000/` → tampil hero hub + section "Webinar Mendatang" dengan 1 card (sample dari Task 1).

**Commit:**
```
git add app/webinar/page.tsx
git commit -m "feat(webinar): index page with upcoming + past sections"
```

---

### Task 15: Sample webinar 1 — Iso9001Jan2026

**Files:** Create `components/webinar/pages/Iso9001Jan2026.tsx` + modify `components/webinar/pages/registry.ts`

**Step 1: Bikin page komponen** (compose semua block, demonstrate full layout)

```tsx
// components/webinar/pages/Iso9001Jan2026.tsx
import type { WebinarPageProps } from './registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import WebinarPitch from '@/components/webinar/blocks/WebinarPitch'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import AgendaTimeline from '@/components/webinar/blocks/AgendaTimeline'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import AudienceTarget from '@/components/webinar/blocks/AudienceTarget'
import BonusList from '@/components/webinar/blocks/BonusList'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import TestimonialQuotes from '@/components/webinar/blocks/TestimonialQuotes'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function Iso9001Jan2026({ webinar }: WebinarPageProps) {
  return (
    <>
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        durationMinutes={webinar.durationMinutes}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        bgImage="/webinar/iso-9001-bg.jpg"
        className="bg-neutral-900 text-white"
      />

      <WebinarPitch>
        <p>
          ISO 9001 sering kelihatan rumit dan mahal — padahal untuk UMKM, prosesnya bisa diselesaikan
          dalam 60 hari kalau tahu urutan langkahnya.
        </p>
        <p>
          Di webinar ini kita akan bahas roadmap praktis dari nol sampai siap audit, plus template dokumen
          yang bisa langsung dipakai.
        </p>
      </WebinarPitch>

      <LearningOutcomes
        items={[
          'Memahami struktur klausa ISO 9001:2015 dan fokus auditor',
          'Menyusun manual mutu, prosedur, dan formulir wajib dengan template siap pakai',
          'Menjalankan internal audit & management review dalam 1 hari',
          'Memilih badan sertifikasi yang sesuai budget',
          'Strategi 60-hari dari kick-off sampai sertifikat di tangan',
          'Bonus: tips memanfaatkan ISO untuk tender pemerintah',
        ]}
      />

      <AgendaTimeline
        items={[
          { time: '19:00 – 19:15 WIB', title: 'Pengantar & Studi Kasus UMKM' },
          { time: '19:15 – 19:45 WIB', title: 'Roadmap 60 Hari', description: 'Breakdown per minggu — apa yang harus selesai kapan' },
          { time: '19:45 – 20:15 WIB', title: 'Live Demo: Menyusun Manual Mutu' },
          { time: '20:15 – 20:30 WIB', title: 'Q&A + Bonus Template' },
        ]}
      />

      <SpeakerCard speakers={webinar.speakers.map((s) => ({ ...s, bio: 'Praktisi ISO dengan 10+ tahun pengalaman audit ke 200+ perusahaan UMKM dan korporasi.', credentials: ['IRCA Lead Auditor', 'CQI Member'] }))} />

      <AudienceTarget
        items={[
          'Pemilik UMKM yang ingin tender pemerintah atau ekspor',
          'Manager mutu/operasional yang baru ditugaskan implementasi ISO',
          'Konsultan independen yang ingin memperluas layanan',
          'Mahasiswa teknik industri / manajemen mutu',
        ]}
      />

      <BonusList
        items={[
          { icon: 'FileText', label: 'Template Manual Mutu', description: '50+ halaman, siap edit' },
          { icon: 'Award', label: 'E-sertifikat Kehadiran' },
          { icon: 'Video', label: 'Recording 1 tahun' },
          { icon: 'MessagesSquare', label: 'Grup WA peserta' },
          { icon: 'Headphones', label: 'Konsultasi 15 menit gratis' },
        ]}
      />

      <InvestmentBlock
        price={webinar.price}
        earlyBirdPrice={webinar.earlyBirdPrice}
        earlyBirdEndsAt={webinar.earlyBirdEndsAt}
        mayarUrl={webinar.mayarUrl}
      />

      <TestimonialQuotes
        items={[
          { quote: 'Materi sangat aplikatif. Setelah webinar saya langsung punya checklist yang jelas.', name: 'Rina S.', role: 'Owner UMKM Tekstil' },
          { quote: 'Templatenya yang paling juara — hemat berbulan-bulan kerja dokumentasi.', name: 'Budi P.', role: 'QA Manager' },
        ]}
      />

      <WebinarFAQ
        items={[
          { q: 'Apakah ada recording kalau saya tidak bisa hadir live?', a: 'Ya, recording dikirim H+1 dan bisa diakses 1 tahun.' },
          { q: 'Apakah saya dapat sertifikat?', a: 'Ya, e-sertifikat kehadiran dikirim H+2 setelah webinar.' },
          { q: 'Bagaimana kalau saya sudah bayar tapi tidak bisa hadir?', a: 'Refund full sampai 24 jam sebelum acara. Setelahnya tetap dapat akses recording.' },
          { q: 'Bisa minta invoice?', a: 'Bisa. Hubungi tim kami via WhatsApp setelah pembayaran.' },
        ]}
      />
    </>
  )
}
```

**Step 2: Daftarkan ke registry**

```ts
// components/webinar/pages/registry.ts
import type { ComponentType } from 'react'
import type { Webinar } from '@/lib/webinars'
import Iso9001Jan2026 from './Iso9001Jan2026'

export type WebinarPageProps = { webinar: Webinar }

export const webinarPages: Record<string, ComponentType<WebinarPageProps>> = {
  'iso-9001-jan2026': Iso9001Jan2026,
}
```

**Step 3: Manual verify**

Visit `webinar.localhost:3000/iso-9001-jan2026` → render full landing. Tombol Daftar harus buka tab baru ke `https://mayar.id/polakerja/iso-9001-jan2026`.

**Step 4: Commit**

```
git add components/webinar/pages/Iso9001Jan2026.tsx components/webinar/pages/registry.ts
git commit -m "feat(webinar): sample webinar Iso9001Jan2026 + register"
```

---

### Task 16: Sample webinar 2 — SbuKonstruksiFeb2026 (desain berbeda)

**Goal:** Tunjukkan bahwa tiap webinar bisa kompose blocks beda + Tailwind beda. Webinar 2 pakai layout lebih singkat, theme cerah (gak gelap), urutan section beda.

**Files:**
- Modify `lib/webinars.ts` (tambah entry kedua)
- Create `components/webinar/pages/SbuKonstruksiFeb2026.tsx`
- Modify `components/webinar/pages/registry.ts`

**Step 1: Tambah entry registry**

```ts
// lib/webinars.ts — append ke array `webinars`
{
  slug: 'sbu-konstruksi-feb2026',
  title: 'Cara Cepat Dapat SBU Konstruksi 2026',
  subtitle: 'Aturan baru, biaya, dan jalur tercepat',
  description: 'Update terkini regulasi SBU Konstruksi 2026 dan strategi praktis mendapatkannya tanpa calo.',
  thumbnail: '/webinar/thumbnails/sbu-konstruksi-feb2026.jpg',
  startsAt: '2026-02-12T20:00:00+07:00',
  durationMinutes: 75,
  format: 'meet',
  price: 75000,
  mayarUrl: 'https://mayar.id/polakerja/sbu-konstruksi-feb2026',
  speakers: [{ name: 'Damar Wisnu', role: 'Konsultan SBU/SKK', photo: '/webinar/speakers/damar.jpg' }],
  category: 'sbu',
}
```

**Step 2: Page component dengan komposisi beda**

```tsx
// components/webinar/pages/SbuKonstruksiFeb2026.tsx
import type { WebinarPageProps } from './registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function SbuKonstruksiFeb2026({ webinar }: WebinarPageProps) {
  return (
    <div className="bg-amber-50">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        durationMinutes={webinar.durationMinutes}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        className="bg-gradient-to-br from-amber-100 via-amber-50 to-white"
      />
      <LearningOutcomes
        variant="list"
        items={[
          'Aturan SBU Konstruksi 2026 yang berubah',
          'Persiapan dokumen tanpa calo',
          'Estimasi biaya & waktu realistis',
          'Strategi naik kualifikasi',
        ]}
      />
      <SpeakerCard speakers={webinar.speakers.map((s) => ({ ...s, bio: 'Konsultan SBU dengan portofolio 100+ perusahaan konstruksi.' }))} />
      <InvestmentBlock price={webinar.price} mayarUrl={webinar.mayarUrl} />
      <WebinarFAQ
        items={[
          { q: 'Saya pemula, apakah cocok?', a: 'Cocok. Materi disusun dari nol.' },
          { q: 'Recording?', a: 'Ya, dikirim H+1.' },
        ]}
      />
    </div>
  )
}
```

**Step 3: Daftarkan**

```ts
// components/webinar/pages/registry.ts — tambah import + entry
import SbuKonstruksiFeb2026 from './SbuKonstruksiFeb2026'

export const webinarPages: Record<string, ComponentType<WebinarPageProps>> = {
  'iso-9001-jan2026': Iso9001Jan2026,
  'sbu-konstruksi-feb2026': SbuKonstruksiFeb2026,
}
```

**Step 4: Manual verify** → 2 card di index, 2 detail page yang desainnya jelas beda.

**Step 5: Commit**

```
git add lib/webinars.ts components/webinar/pages/SbuKonstruksiFeb2026.tsx components/webinar/pages/registry.ts
git commit -m "feat(webinar): sample webinar SbuKonstruksiFeb2026 (alt composition)"
```

---

## Phase E — SEO, Sitemap, Workflow Doc

### Task 17: JSON-LD Event schema di detail page

**Files:** Modify `app/webinar/[slug]/page.tsx`

**Step 1:** Tambah komponen JSON-LD inline di output dispatcher:

```tsx
// di dalam WebinarDetailPage, return:
return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: webinar.title,
          description: webinar.description,
          startDate: webinar.startsAt,
          endDate: new Date(new Date(webinar.startsAt).getTime() + webinar.durationMinutes * 60_000).toISOString(),
          eventAttendanceMode: webinar.format === 'offline'
            ? 'https://schema.org/OfflineEventAttendanceMode'
            : 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: webinar.format === 'offline'
            ? { '@type': 'Place', name: 'Lokasi tertera di tiket' }
            : { '@type': 'VirtualLocation', url: webinar.mayarUrl },
          performer: webinar.speakers.map((s) => ({ '@type': 'Person', name: s.name })),
          offers: {
            '@type': 'Offer',
            url: webinar.mayarUrl,
            price: webinar.earlyBirdPrice ?? webinar.price,
            priceCurrency: 'IDR',
            availability: 'https://schema.org/InStock',
          },
          image: webinar.thumbnail,
        }),
      }}
    />
    <Page webinar={webinar} />
  </>
)
```

**Step 2: Manual verify** — view source, harus ada `<script type="application/ld+json">` dengan struktur Event.

**Step 3: Commit**

```
git add app/webinar/[slug]/page.tsx
git commit -m "feat(webinar): JSON-LD Event schema for SEO"
```

---

### Task 18: Sitemap

**Files:** Create `app/webinar/sitemap.ts` (atau `app/sitemap.ts` yang gabungan)

> **Catatan:** Karena subdomain di-rewrite via proxy, sitemap untuk subdomain harus generate URL absolut dengan host `webinar.polakerja.com`. Best practice: bikin `app/webinar/sitemap.ts` yang Next.js akan serve di `/webinar/sitemap.xml`, lalu konfigurasi proxy supaya request `webinar.polakerja.com/sitemap.xml` di-rewrite ke `/webinar/sitemap.xml`.

**Step 1:** Update `proxy.ts` untuk include sitemap.xml & robots.txt rewrite kalau di subdomain (tapi `matcher` punya exclude untuk file ini — perlu adjust). Solusi sederhana: rewrite explicit di proxy:

```ts
// di awal proxy(), setelah host check
if (isWebinar && (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt')) {
  url.pathname = `/webinar${url.pathname}`
  return NextResponse.rewrite(url)
}
```

(Adjust matcher kalau perlu.)

**Step 2:** Bikin sitemap

```ts
// app/webinar/sitemap.ts
import type { MetadataRoute } from 'next'
import { webinars } from '@/lib/webinars'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://webinar.polakerja.com'
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    ...webinars.map((w) => ({
      url: `${base}/${w.slug}`,
      lastModified: new Date(w.startsAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
```

**Step 3:** Bikin robots

```ts
// app/webinar/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://webinar.polakerja.com/sitemap.xml',
  }
}
```

**Step 4:** Manual verify di dev: `webinar.localhost:3000/sitemap.xml` returns XML; `webinar.localhost:3000/robots.txt` returns text.

**Step 5:** Commit

```
git add proxy.ts app/webinar/sitemap.ts app/webinar/robots.ts
git commit -m "feat(webinar): sitemap.xml + robots.txt for subdomain"
```

---

### Task 19: Workflow doc — adding new webinar

**Files:** Create `docs/webinar-add-new.md` (atau update README/AGENTS.md)

**Step 1:** Tulis langkah ringkas

```md
# Cara Menambah Webinar Baru

1. **Mayar.id**
   - Login ke dashboard mayar.id
   - Buat product type Event/Webinar
   - Set harga, kapasitas, deskripsi
   - Konfigurasi delivery: email link Zoom/Meet otomatis setelah bayar
   - Copy URL produk (misal `https://mayar.id/polakerja/[slug]`)

2. **Tambah entry di `lib/webinars.ts`**
   - Append ke array `webinars` dengan metadata lengkap
   - `slug` harus unik dan match nama file di step 3

3. **Bikin halaman komponen** — `components/webinar/pages/[NamaWebinar].tsx`
   - Compose blocks dari `components/webinar/blocks/`
   - Bebas pakai Tailwind sesuai desain

4. **Daftarkan ke registry** — `components/webinar/pages/registry.ts`
   - Import komponen, tambahkan entry `[slug]: Komponen`

5. **Tambah aset gambar** ke `public/webinar/` (thumbnail, speaker photo, bg, dll)

6. **Verify lokal:** `npm run dev` → buka `webinar.localhost:3000/[slug]`

7. **Push & deploy:** PR → merge → Vercel auto deploy → live di `webinar.polakerja.com/[slug]`

## Adding subdomain to Vercel (one-time setup)

1. DNS provider: tambah CNAME record `webinar` → `cname.vercel-dns.com`
2. Vercel project → Settings → Domains → Add `webinar.polakerja.com`
3. Vercel auto-issue SSL cert
```

**Step 2:** Commit

```
git add docs/webinar-add-new.md
git commit -m "docs(webinar): workflow guide for adding new webinars"
```

---

## Phase F — Final Verification

### Task 20: End-to-end smoke test

**Steps:**

1. `npm run dev`
2. Buka `http://localhost:3000/` → landing utama harus tetap normal
3. Buka `http://webinar.localhost:3000/` → lihat:
   - Header "Polakerja / Webinar"
   - Hero hub
   - Section "Webinar Mendatang" dengan 2 card
   - Footer
4. Klik card pertama → masuk detail Iso9001Jan2026
   - Hero gelap dengan bg image
   - Semua section terlihat
   - Klik tombol "Daftar Sekarang" → tab baru ke `mayar.id/polakerja/iso-9001-jan2026`
5. Back, klik card kedua → masuk SbuKonstruksiFeb2026 (theme amber, layout lebih ringkas)
6. Visit `webinar.localhost:3000/slug-yang-tidak-ada` → 404 page custom
7. Visit `localhost:3000/webinar/iso-9001-jan2026` → harus redirect 308 ke subdomain
8. View source detail page → `<script type="application/ld+json">` ada
9. `webinar.localhost:3000/sitemap.xml` → return valid XML
10. `npm run build` → tidak ada error TypeScript / Next.js error

**If any step fails:** debug, fix, commit fix, re-run smoke test.

---

## Files Summary

**Created:**
- `proxy.ts`
- `lib/webinars.ts`
- `lib/cn.ts`
- `app/webinar/layout.tsx`
- `app/webinar/page.tsx`
- `app/webinar/sitemap.ts`
- `app/webinar/robots.ts`
- `app/webinar/[slug]/page.tsx`
- `app/webinar/[slug]/not-found.tsx`
- `components/webinar/WebinarNavbar.tsx`
- `components/webinar/WebinarCard.tsx`
- `components/webinar/blocks/MayarPayButton.tsx`
- `components/webinar/blocks/CountdownTimer.tsx`
- `components/webinar/blocks/WebinarHero.tsx`
- `components/webinar/blocks/VideoHero.tsx`
- `components/webinar/blocks/WebinarPitch.tsx`
- `components/webinar/blocks/LearningOutcomes.tsx`
- `components/webinar/blocks/AgendaTimeline.tsx`
- `components/webinar/blocks/SpeakerCard.tsx`
- `components/webinar/blocks/AudienceTarget.tsx`
- `components/webinar/blocks/BonusList.tsx`
- `components/webinar/blocks/InvestmentBlock.tsx`
- `components/webinar/blocks/TestimonialQuotes.tsx`
- `components/webinar/blocks/WebinarFAQ.tsx`
- `components/webinar/pages/registry.ts`
- `components/webinar/pages/Iso9001Jan2026.tsx`
- `components/webinar/pages/SbuKonstruksiFeb2026.tsx`
- `docs/webinar-add-new.md`
- `public/webinar/...` (assets — thumbnail, speaker photos)

**Modified:** none (semua additive — tidak menyentuh landing utama)

## Out of Scope (Defer to Phase 2)

- Newsletter signup
- Recording archive berbayar
- Mayar webhook integration / attendee tracker
- Admin dashboard / CMS
- Vitest / unit test framework setup
- E2E Playwright tests

## Risks & Notes

- **Tailwind 4 + Next 16:** verify build di tiap fase — config Tailwind 4 berbeda dari v3, perhatikan kalau ada error PostCSS.
- **Proxy edge case:** `host` header kadang berisi port (`:3000`) di dev tapi tidak di prod. Pastikan `WEBINAR_HOSTS` set sudah cover keduanya.
- **Image domain:** kalau pakai gambar dari mayar.id atau external, tambah ke `next.config.ts > images.remotePatterns`.
- **AGENTS.md instruction:** baca `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` sebelum mulai Task 2 — Next.js 16 punya breaking changes.
