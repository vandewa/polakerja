# Webinar Subdomain — Design

**Tanggal:** 2026-05-07
**Status:** Approved (brainstorming complete)
**Target:** `webinar.polakerja.com` — subdomain untuk landing pages webinar Polakerja, dengan tombol Daftar yang redirect ke pembayaran mayar.id.

## Goals

- Tiap webinar punya landing page custom (desain bebas per webinar) di `webinar.polakerja.com/[slug]`.
- Halaman index `webinar.polakerja.com/` list semua webinar (mendatang + lampau).
- Tombol "Daftar" redirect ke URL produk mayar.id. Mayar handle pembayaran + delivery (email link Zoom/Meet).
- Tidak ada database, auth, atau webhook di fase 1.
- Reuse branding & design tokens dari landing utama (Tailwind theme, font, Logo).

## Non-Goals (Fase 1)

- Tidak ada hosting webinar in-app (streaming via Daily/100ms/Mux).
- Tidak ada multi-host marketplace.
- Tidak ada CMS/dashboard admin (semua webinar di-author oleh developer via file).
- Tidak ada mayar.id API/webhook integration.
- Tidak ada newsletter signup, attendee tracker live, atau recording berbayar.

## Architecture

Single Next.js project (codebase ini), subdomain di-route via proxy Next.js.

- **Stack:** Next.js 16 App Router, Tailwind 4, Framer Motion (sudah ada di repo).
- **Subdomain serving:** `proxy.ts` (Next.js 16 — rename dari `proxy.ts`) deteksi `host` header → rewrite ke prefix `/webinar/*`.
- **Konten per webinar:** 1 file komponen di `components/webinar/pages/`, didaftarkan di registry yang di-dispatch oleh `app/webinar/[slug]/page.tsx`.
- **Metadata terpusat:** `lib/webinars.ts` (judul, tanggal, harga, mayarUrl, dst).
- **Subdomain config:** DNS CNAME `webinar` → Vercel; tambah domain di project Vercel.

## File Tree

```
proxy.ts                              # rewrite subdomain → /webinar/*
app/
  webinar/
    layout.tsx                             # Navbar webinar + Footer
    page.tsx                               # INDEX (list webinar)
    [slug]/
      page.tsx                             # dispatcher: lookup registry → render Page
      not-found.tsx                        # custom 404
components/
  webinar/
    blocks/
      WebinarHero.tsx
      VideoHero.tsx
      WebinarPitch.tsx
      LearningOutcomes.tsx
      AgendaTimeline.tsx
      SpeakerCard.tsx
      AudienceTarget.tsx
      BonusList.tsx
      InvestmentBlock.tsx
      CountdownTimer.tsx
      TestimonialQuotes.tsx
      WebinarFAQ.tsx
      MayarPayButton.tsx
    pages/
      registry.ts                          # slug → komponen page mapping
      Iso9001Jan2026.tsx                   # contoh webinar 1
      SbuKonstruksiFeb2026.tsx             # contoh webinar 2
    WebinarCard.tsx                        # card di index page
    WebinarNavbar.tsx                      # navbar khusus subdomain
lib/
  webinars.ts                              # registry metadata + helpers
```

## Data Model

```ts
// lib/webinars.ts
export type WebinarStatus = 'upcoming' | 'live' | 'past'

export type Webinar = {
  slug: string
  title: string
  subtitle?: string
  description: string           // 1-2 kalimat untuk OG/SEO
  thumbnail: string             // /webinar/thumbnails/...
  startsAt: string              // ISO 8601 dengan timezone (+07:00)
  durationMinutes: number
  format: 'zoom' | 'meet' | 'youtube-live' | 'offline'
  price: number                 // 0 = gratis
  earlyBirdPrice?: number
  earlyBirdEndsAt?: string
  mayarUrl: string
  speakers: { name: string; role: string; photo: string }[]
  category: 'iso' | 'legalitas' | 'sbu' | 'sistem' | 'umum'
  recordingUrl?: string
}

export const webinars: Webinar[] = [ /* ... */ ]
export const getWebinarStatus = (w: Webinar): WebinarStatus => { /* hitung dari startsAt + durationMinutes */ }
export const getUpcomingWebinars = () => /* filter upcoming/live, sort by startsAt asc */
export const getPastWebinars = () => /* filter past, sort by startsAt desc */
export const getWebinarBySlug = (slug: string) => webinars.find(w => w.slug === slug)
```

## Data Flow

1. User akses `webinar.polakerja.com/iso-9001-jan2026`.
2. Vercel rute ke Next.js function.
3. `proxy.ts` baca `host` header → rewrite path ke `/webinar/iso-9001-jan2026`.
4. `app/webinar/[slug]/page.tsx` (dispatcher) baca `lib/webinars.ts` untuk metadata + lookup `webinarPages[slug]` untuk komponen.
5. Komponen page (misal `Iso9001Jan2026.tsx`) compose blocks + custom Tailwind, render full landing.
6. User klik `<MayarPayButton href={webinar.mayarUrl}>` → redirect ke mayar.id.
7. Mayar handle bayar + email link Zoom otomatis.

## Reusable Blocks

Semua block punya prop `className?` untuk override styling per webinar (preserve "bebas desain").

| Block | Props utama |
|---|---|
| `WebinarHero` | `title`, `startsAt`, `format`, `mayarUrl`, optional `bgImage`/`bgVideo` |
| `VideoHero` | `src`, `poster` |
| `WebinarPitch` | `children` |
| `LearningOutcomes` | `items: string[]`, optional `variant` |
| `AgendaTimeline` | `items: { time, title, description? }[]` |
| `SpeakerCard` | `name`, `role`, `photo`, `bio?`, `credentials?` |
| `AudienceTarget` | `items: string[]` |
| `BonusList` | `items: { icon, label, description? }[]` |
| `InvestmentBlock` | `price`, `earlyBirdPrice?`, `earlyBirdEndsAt?`, `mayarUrl` |
| `CountdownTimer` | `endsAt: string` (auto-hide saat lewat) |
| `TestimonialQuotes` | `items: { quote, name, role, photo? }[]` |
| `WebinarFAQ` | `items: { q, a }[]` (Framer Motion accordion) |
| `MayarPayButton` | `href`, `children`, `variant`, `size` (renders `<a target="_blank" rel="noopener">`) |

## Index Page

- Hero hub kecil ("Webinar Polakerja").
- Section "Webinar Mendatang" — `getUpcomingWebinars()` → `WebinarCard` grid responsif.
- Section "Pernah Diadakan" — `getPastWebinars()`, badge "Recording tersedia" jika `recordingUrl`.
- Status (`upcoming`/`past`) dihitung client-side biar page tetap fully static tanpa rebuild saat tanggal lewat.

## Detail Page Pattern

`app/webinar/[slug]/page.tsx` adalah dispatcher. Detail design tiap webinar = file komponen sendiri di `components/webinar/pages/`, didaftarkan di `pages/registry.ts`.

```tsx
// app/webinar/[slug]/page.tsx (sketsa)
export const generateStaticParams = () => webinars.map(w => ({ slug: w.slug }))
export const generateMetadata = async ({ params }) => { /* OG dari registry */ }
export default async function WebinarPage({ params }) {
  const slug = (await params).slug
  const webinar = getWebinarBySlug(slug)
  const Page = webinarPages[slug]
  if (!webinar || !Page) notFound()
  return <Page webinar={webinar} />
}
```

## Proxy (Subdomain Routing)

> **Next.js 16 rename:** `middleware.ts` → `proxy.ts`, `middleware()` → `proxy()`. Default runtime adalah Node.js. Codemod tersedia: `npx @next/codemod@canary middleware-to-proxy .`.

```ts
// proxy.ts (root)
const WEBINAR_HOST = 'webinar.polakerja.com'
const WEBINAR_HOST_DEV = 'webinar.localhost:3000'

export function proxy(req) {
  const host = req.headers.get('host') ?? ''
  const isWebinarHost = host === WEBINAR_HOST || host === WEBINAR_HOST_DEV
  const url = req.nextUrl.clone()

  if (isWebinarHost && !url.pathname.startsWith('/webinar')) {
    url.pathname = `/webinar${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }
  if (!isWebinarHost && url.pathname.startsWith('/webinar')) {
    // redirect ke subdomain biar URL canonical
  }
  return NextResponse.next()
}
export const config = { matcher: ['/((?!_next/|api/|favicon.ico|.*\\..*).*)'] }
```

Dev lokal: gunakan `http://webinar.localhost:3000` (atau edit hosts file).

## Mayar.id Integration

**Per webinar (manual oleh owner di mayar.id dashboard):**
1. Bikin product type "Event/Webinar".
2. Set harga, kapasitas, deskripsi.
3. Konfigurasi delivery email berisi link Zoom/Meet.
4. Copy URL produk → paste ke `mayarUrl` di `lib/webinars.ts`.

**Di kode:** `<MayarPayButton href={webinar.mayarUrl}>` — redirect biasa, tidak ada API/webhook/server-side.

## Error Handling

- Slug tidak ada → `notFound()` → custom 404 dengan tombol "Lihat semua webinar".
- `mayarUrl` kosong → tombol disable + warning console (validate di build-time via runtime check di registry).
- Mayar down → di luar kontrol; user lihat error mayar.

## SEO & Performance

- `generateMetadata` per webinar (title, description, OG image).
- JSON-LD Event schema di tiap detail page (struktur Schema.org `Event`).
- `sitemap.ts` include semua slug + index page.
- Static generation via `generateStaticParams`.
- `next/image` untuk thumbnail & speaker photo.
- Font reuse dari layout utama.

## Testing

- **Unit:** helper `lib/webinars.ts` (`getWebinarStatus`, sort, filter).
- **Manual smoke:** tiap webinar baru, cek di dev `webinar.localhost:3000/[slug]`, klik tombol Daftar pastikan redirect ke mayar URL benar, cek metadata OG.
- **E2E (opsional):** Playwright untuk proxy rewrite + 404 path.

## Subdomain Setup (Ops)

1. DNS provider domain `polakerja.com` → tambah CNAME `webinar` → `cname.vercel-dns.com`.
2. Vercel project → Settings → Domains → tambah `webinar.polakerja.com`.
3. Vercel auto-issue SSL.

## Roadmap

**Fase 1 (current):** semua di atas.

**Fase 2 (jika dibutuhkan):**
- Newsletter signup (Mailchimp/Resend).
- Recording archive berbayar (product mayar baru).
- Mayar webhook untuk attendee count live.
- Dashboard admin sederhana jika frekuensi webinar naik signifikan.

## Adding a New Webinar (Workflow Akhir)

1. Bikin produk webinar di mayar.id, copy URL.
2. Tambah entry di `lib/webinars.ts` dengan slug + metadata + mayarUrl.
3. Bikin `components/webinar/pages/[NamaWebinar].tsx` — compose blocks + Tailwind sesuai desain.
4. Daftarkan di `components/webinar/pages/registry.ts`.
5. Push branch → PR → merge → auto deploy via Vercel.
6. Webinar otomatis muncul di index page.
