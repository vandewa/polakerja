# Webinar Dynamic Update (Fase 2) — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Speed up developer workflow untuk bikin webinar baru (CLI generator + 3 starter template) dan eliminate storage cost (paksa URL eksternal untuk semua aset visual).

**Architecture:** File-based dipertahankan. Tambah `scripts/webinar-new.mjs` (Node.js plain, no new deps) yang scaffold file komponen + register di registry + insert entry di `lib/webinars.ts` pakai marker comments untuk idempotency. Tiga starter template di `components/webinar/pages/templates/` jadi sumber copy. `next.config.ts` di-extend `remotePatterns` untuk Cloudinary, Drive, placehold.co, picsum.photos. Sample webinar existing di-migrate aset path-nya ke URL placeholder eksternal.

**Tech Stack:** Next.js 16.2.4, React 19, TypeScript 5, Node.js (built-in `node:fs`, `node:readline`, `node:path`), Tailwind 4. **Tidak ada deps baru.**

**Reference design:** `docs/plans/2026-05-08-webinar-dynamic-update-design.md`

---

## Phase 0: Foundation (URL eksternal + remotePatterns)

### Task 1: Update `next.config.ts` dengan remotePatterns

**Files:**
- Modify: `next.config.ts`

**Step 1: Edit `next.config.ts`**

Tambah hostname untuk Cloudinary, Google Drive, placehold.co, picsum.photos. Pertahankan `images.unsplash.com` yang sudah ada.

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
}

export default nextConfig
```

**Step 2: Verify build still passes**

Run: `npm run build`
Expected: `✓ Compiled successfully` tanpa warning baru.

**Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat(webinar): allow external image hosts (Cloudinary, Drive, placehold, picsum)"
```

---

### Task 2: Migrate sample webinars ke URL placeholder eksternal

**Files:**
- Modify: `lib/webinars.ts`

**Step 1: Edit `lib/webinars.ts`**

Ganti path lokal dengan URL eksternal:
- `thumbnail` pakai `https://picsum.photos/seed/[slug]/1200/630` (deterministic per slug).
- `speakers[].photo` pakai `https://placehold.co/400x400/0F172A/FFFFFF?text=DW` (initial-based placeholder).

Find:
```ts
    thumbnail: '/webinar/thumbnails/iso-9001-jan2026.jpg',
```
Replace:
```ts
    thumbnail: 'https://picsum.photos/seed/iso-9001-jan2026/1200/630',
```

Find:
```ts
    thumbnail: '/webinar/thumbnails/sbu-konstruksi-feb2026.jpg',
```
Replace:
```ts
    thumbnail: 'https://picsum.photos/seed/sbu-konstruksi-feb2026/1200/630',
```

Find (occurs 2x — replace all):
```ts
        photo: '/webinar/speakers/damar.jpg',
```
Replace:
```ts
        photo: 'https://placehold.co/400x400/0F172A/FFFFFF?text=DW',
```

Find:
```ts
      { name: 'Damar Wisnu', role: 'Konsultan SBU/SKK', photo: '/webinar/speakers/damar.jpg' }
```
Replace:
```ts
      { name: 'Damar Wisnu', role: 'Konsultan SBU/SKK', photo: 'https://placehold.co/400x400/0F172A/FFFFFF?text=DW' }
```

**Step 2: Tambah komentar konvensi di tipe definition**

Find:
```ts
export type Speaker = {
  name: string
  role: string
  photo: string
}
```
Replace:
```ts
export type Speaker = {
  name: string
  role: string
  /** Absolute external URL only (Cloudinary/Drive/placehold.co). Avoid local /public/ paths to keep storage cost zero. */
  photo: string
}
```

Find:
```ts
export type Webinar = {
  slug: string
  title: string
  subtitle?: string
  description: string
  thumbnail: string
```
Replace:
```ts
export type Webinar = {
  slug: string
  title: string
  subtitle?: string
  description: string
  /** Absolute external URL only (Cloudinary/Drive/picsum/placehold). 1200x630 recommended. */
  thumbnail: string
```

**Step 3: Verify build + dev pass**

Run: `npm run build`
Expected: `✓ Compiled successfully`, no TypeScript errors.

**Step 4: Commit**

```bash
git add lib/webinars.ts
git commit -m "feat(webinar): migrate sample assets to external URL placeholders"
```

---

### Task 3: Tambah validasi runtime ringan untuk URL eksternal

**Files:**
- Modify: `lib/webinars.ts`

**Step 1: Tambah helper `assertExternalUrl` + validasi sekali saat module load**

Append di akhir file `lib/webinars.ts` (setelah `getWebinarBySlug`):

```ts
const isLocalAssetPath = (value: string): boolean =>
  value.startsWith('/') && !value.startsWith('//')

const warnIfLocalAsset = (slug: string, field: string, value: string): void => {
  if (process.env.NODE_ENV !== 'production' && isLocalAssetPath(value)) {
    console.warn(
      `[webinars] ${slug}: ${field} uses local path "${value}". Prefer external URL (Cloudinary/Drive/placehold) — keeps storage cost zero.`,
    )
  }
}

for (const w of webinars) {
  warnIfLocalAsset(w.slug, 'thumbnail', w.thumbnail)
  for (const [i, s] of w.speakers.entries()) {
    warnIfLocalAsset(w.slug, `speakers[${i}].photo`, s.photo)
  }
}
```

**Step 2: Verify dev start tidak ada warning**

Run: `npm run dev` (background OK)
Expected: server start tanpa warning `[webinars]` di console (semua aset sudah eksternal setelah Task 2).

**Step 3: Verify warning muncul kalau ada local path**

Sementara revert satu thumbnail ke local path untuk test:
- Edit `lib/webinars.ts`: ubah `thumbnail` `iso-9001-jan2026` ke `/webinar/test.jpg`
- Run: `npm run dev` (atau restart kalau sudah jalan)
- Expected: console muncul warning `[webinars] iso-9001-jan2026: thumbnail uses local path "/webinar/test.jpg"...`
- Revert kembali ke URL `https://picsum.photos/seed/iso-9001-jan2026/1200/630`

**Step 4: Build pass**

Run: `npm run build`
Expected: pass clean.

**Step 5: Commit**

```bash
git add lib/webinars.ts
git commit -m "feat(webinar): warn on local asset paths in dev"
```

---

## Phase 1: Starter Templates (3 design siap pakai)

### Task 4: Buat `DarkPremium.tsx` template

**Files:**
- Create: `components/webinar/pages/templates/DarkPremium.tsx`

**Step 1: Buat file template**

Komponen ini mirip `Iso9001Jan2026.tsx` tapi dengan placeholder `__TEMPLATE_NAME__` yang akan di-replace oleh CLI generator. Compose semua block utama untuk feel "premium gelap".

```tsx
import type { WebinarPageProps } from '../registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import WebinarPitch from '@/components/webinar/blocks/WebinarPitch'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import AgendaTimeline from '@/components/webinar/blocks/AgendaTimeline'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function __TEMPLATE_NAME__({ webinar }: WebinarPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        bgImage={webinar.thumbnail}
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <WebinarPitch>
          <p className="text-xl leading-relaxed text-slate-300">
            {webinar.description}
          </p>
        </WebinarPitch>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Yang Akan Kamu Pelajari</h2>
        <LearningOutcomes
          variant="grid"
          items={[
            'Pelajari konsep inti webinar ini step-by-step',
            'Praktikkan langsung lewat studi kasus nyata',
            'Dapatkan template + checklist siap pakai',
            'Tanya-jawab langsung dengan pembicara',
          ]}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Agenda</h2>
        <AgendaTimeline
          items={[
            { time: '00:00', title: 'Pembukaan & perkenalan' },
            { time: '00:10', title: 'Konsep dasar' },
            { time: '00:30', title: 'Studi kasus' },
            { time: '01:00', title: 'Q&A interaktif' },
          ]}
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Pembicara</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {webinar.speakers.map((s) => (
            <SpeakerCard key={s.name} name={s.name} role={s.role} photo={s.photo} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20">
        <InvestmentBlock
          price={webinar.price}
          earlyBirdPrice={webinar.earlyBirdPrice}
          earlyBirdEndsAt={webinar.earlyBirdEndsAt}
          mayarUrl={webinar.mayarUrl}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">FAQ</h2>
        <WebinarFAQ
          items={[
            { q: 'Akan ada rekaman?', a: 'Ya, peserta dapat akses rekaman setelah event.' },
            { q: 'Bagaimana cara dapat link Zoom?', a: 'Setelah pembayaran, link otomatis dikirim ke email.' },
            { q: 'Bisa bayar pakai apa saja?', a: 'Bank transfer, e-wallet, kartu kredit lewat Mayar.' },
          ]}
        />
      </section>
    </div>
  )
}
```

**Step 2: Verify TypeScript clean**

Run: `npm run build`
Expected: pass clean (template tidak masuk registry, tapi harus type-check).

Note: file ini importable secara independen dan harus type-check valid karena akan di-copy oleh CLI generator. `__TEMPLATE_NAME__` adalah identifier valid di TypeScript (underscores allowed), jadi tidak akan menyebabkan parse error.

**Step 3: Commit**

```bash
git add components/webinar/pages/templates/DarkPremium.tsx
git commit -m "feat(webinar): add DarkPremium starter template"
```

---

### Task 5: Buat `LightProfessional.tsx` template

**Files:**
- Create: `components/webinar/pages/templates/LightProfessional.tsx`

**Step 1: Buat file template**

Mood: cerah, korporat, bersih. Pakai `bg-white` / `bg-slate-50`, accent `bg-blue-600`. Block: WebinarHero (no bgImage), Pitch, AudienceTarget, AgendaTimeline, SpeakerCard, BonusList, InvestmentBlock.

```tsx
import type { WebinarPageProps } from '../registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import WebinarPitch from '@/components/webinar/blocks/WebinarPitch'
import AudienceTarget from '@/components/webinar/blocks/AudienceTarget'
import AgendaTimeline from '@/components/webinar/blocks/AgendaTimeline'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import BonusList from '@/components/webinar/blocks/BonusList'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'

export default function __TEMPLATE_NAME__({ webinar }: WebinarPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <WebinarPitch>
          <p className="text-xl leading-relaxed text-slate-600">
            {webinar.description}
          </p>
        </WebinarPitch>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Cocok Untuk</h2>
        <AudienceTarget
          items={[
            'Profesional yang sedang memulai perjalanan ini',
            'Tim/manager yang ingin meningkatkan skill',
            'Pemilik bisnis yang ingin scaling',
            'Konsultan yang butuh referensi terkini',
          ]}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Agenda</h2>
        <AgendaTimeline
          items={[
            { time: '00:00', title: 'Pembukaan' },
            { time: '00:10', title: 'Materi inti bagian 1' },
            { time: '00:40', title: 'Materi inti bagian 2' },
            { time: '01:10', title: 'Q&A interaktif' },
          ]}
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Pembicara</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {webinar.speakers.map((s) => (
            <SpeakerCard key={s.name} name={s.name} role={s.role} photo={s.photo} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Bonus untuk Peserta</h2>
        <BonusList
          items={[
            { icon: 'FileText', label: 'E-book ringkasan materi' },
            { icon: 'CheckSquare', label: 'Checklist actionable siap pakai' },
            { icon: 'Video', label: 'Akses rekaman 1 tahun' },
          ]}
        />
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20">
        <InvestmentBlock
          price={webinar.price}
          earlyBirdPrice={webinar.earlyBirdPrice}
          earlyBirdEndsAt={webinar.earlyBirdEndsAt}
          mayarUrl={webinar.mayarUrl}
        />
      </section>
    </div>
  )
}
```

**Step 2: Verify TypeScript clean**

Run: `npm run build`
Expected: pass clean.

**Step 3: Commit**

```bash
git add components/webinar/pages/templates/LightProfessional.tsx
git commit -m "feat(webinar): add LightProfessional starter template"
```

---

### Task 6: Buat `BoldGradient.tsx` template

**Files:**
- Create: `components/webinar/pages/templates/BoldGradient.tsx`

**Step 1: Buat file template**

Mood: berani, gradient bg-rose-500/violet-600, modern. Block: WebinarHero (gradient bg via className), LearningOutcomes (variant list), SpeakerCard, TestimonialQuotes, InvestmentBlock, FAQ.

```tsx
import type { WebinarPageProps } from '../registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import TestimonialQuotes from '@/components/webinar/blocks/TestimonialQuotes'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function __TEMPLATE_NAME__({ webinar }: WebinarPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-fuchsia-600 to-violet-700 text-white">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        className="bg-transparent"
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-5xl font-black">Apa yang Kamu Dapat</h2>
        <LearningOutcomes
          variant="list"
          items={[
            'Insight terbaru dari praktisi langsung',
            'Framework yang langsung bisa diterapkan',
            'Network dengan peserta sefrekuensi',
            'Bonus material eksklusif',
          ]}
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-5xl font-black">Pembicara</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {webinar.speakers.map((s) => (
            <SpeakerCard key={s.name} name={s.name} role={s.role} photo={s.photo} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-5xl font-black">Apa Kata Mereka</h2>
        <TestimonialQuotes
          items={[
            { quote: 'Webinar yang sangat aplikatif, langsung bisa dipraktikkan.', name: 'Sari', role: 'Founder UMKM' },
            { quote: 'Materi padat, pembicaranya berpengalaman.', name: 'Rizki', role: 'Manager' },
            { quote: 'Worth banget, harganya tidak sebanding ilmunya.', name: 'Dian', role: 'Konsultan' },
          ]}
        />
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20">
        <InvestmentBlock
          price={webinar.price}
          earlyBirdPrice={webinar.earlyBirdPrice}
          earlyBirdEndsAt={webinar.earlyBirdEndsAt}
          mayarUrl={webinar.mayarUrl}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-5xl font-black">FAQ</h2>
        <WebinarFAQ
          items={[
            { q: 'Akan ada rekaman?', a: 'Ya, peserta dapat akses rekaman setelah event.' },
            { q: 'Bagaimana cara dapat link Zoom/Meet?', a: 'Setelah pembayaran, link otomatis dikirim ke email.' },
            { q: 'Refund?', a: 'Refund sebelum H-3, bisa diganti voucher webinar lain.' },
          ]}
        />
      </section>
    </div>
  )
}
```

**Step 2: Verify TypeScript clean**

Run: `npm run build`
Expected: pass clean.

**Step 3: Verify ada 3 file template**

Run: `ls components/webinar/pages/templates/` (atau pakai tool Glob `components/webinar/pages/templates/*.tsx`)
Expected: 3 file — `DarkPremium.tsx`, `LightProfessional.tsx`, `BoldGradient.tsx`.

**Step 4: Commit**

```bash
git add components/webinar/pages/templates/BoldGradient.tsx
git commit -m "feat(webinar): add BoldGradient starter template"
```

---

## Phase 2: CLI Generator

### Task 7: Tambah marker comments di registry + lib/webinars.ts

**Files:**
- Modify: `components/webinar/pages/registry.ts`
- Modify: `lib/webinars.ts`

**Why:** CLI generator pakai marker comments sebagai anchor untuk insert idempotent. Pasang dulu sebelum nulis CLI.

**Step 1: Edit `components/webinar/pages/registry.ts`**

Find:
```ts
import type { ComponentType } from 'react'
import type { Webinar } from '@/lib/webinars'
import Iso9001Jan2026 from './Iso9001Jan2026'
import SbuKonstruksiFeb2026 from './SbuKonstruksiFeb2026'

export type WebinarPageProps = { webinar: Webinar }

export const webinarPages: Record<string, ComponentType<WebinarPageProps>> = {
  'iso-9001-jan2026': Iso9001Jan2026,
  'sbu-konstruksi-feb2026': SbuKonstruksiFeb2026,
}
```

Replace:
```ts
import type { ComponentType } from 'react'
import type { Webinar } from '@/lib/webinars'
import Iso9001Jan2026 from './Iso9001Jan2026'
import SbuKonstruksiFeb2026 from './SbuKonstruksiFeb2026'
// CLI:imports-end

export type WebinarPageProps = { webinar: Webinar }

export const webinarPages: Record<string, ComponentType<WebinarPageProps>> = {
  'iso-9001-jan2026': Iso9001Jan2026,
  'sbu-konstruksi-feb2026': SbuKonstruksiFeb2026,
  // CLI:entries-end
}
```

**Step 2: Edit `lib/webinars.ts`**

Find:
```ts
  {
    slug: 'sbu-konstruksi-feb2026',
    title: 'Cara Cepat Dapat SBU Konstruksi 2026',
    subtitle: 'Aturan baru, biaya, dan jalur tercepat',
    description: 'Update terkini regulasi SBU Konstruksi 2026 dan strategi praktis mendapatkannya tanpa calo.',
    thumbnail: 'https://picsum.photos/seed/sbu-konstruksi-feb2026/1200/630',
    startsAt: '2026-02-12T20:00:00+07:00',
    durationMinutes: 75,
    format: 'meet',
    price: 75000,
    mayarUrl: 'https://mayar.id/polakerja/sbu-konstruksi-feb2026',
    speakers: [{ name: 'Damar Wisnu', role: 'Konsultan SBU/SKK', photo: 'https://placehold.co/400x400/0F172A/FFFFFF?text=DW' }],
    category: 'sbu',
  },
]
```

Replace:
```ts
  {
    slug: 'sbu-konstruksi-feb2026',
    title: 'Cara Cepat Dapat SBU Konstruksi 2026',
    subtitle: 'Aturan baru, biaya, dan jalur tercepat',
    description: 'Update terkini regulasi SBU Konstruksi 2026 dan strategi praktis mendapatkannya tanpa calo.',
    thumbnail: 'https://picsum.photos/seed/sbu-konstruksi-feb2026/1200/630',
    startsAt: '2026-02-12T20:00:00+07:00',
    durationMinutes: 75,
    format: 'meet',
    price: 75000,
    mayarUrl: 'https://mayar.id/polakerja/sbu-konstruksi-feb2026',
    speakers: [{ name: 'Damar Wisnu', role: 'Konsultan SBU/SKK', photo: 'https://placehold.co/400x400/0F172A/FFFFFF?text=DW' }],
    category: 'sbu',
  },
  // CLI:entries-end
]
```

**Step 3: Verify build pass**

Run: `npm run build`
Expected: pass clean.

**Step 4: Commit**

```bash
git add components/webinar/pages/registry.ts lib/webinars.ts
git commit -m "chore(webinar): add CLI marker comments for generator anchors"
```

---

### Task 8: Tulis CLI generator `scripts/webinar-new.mjs` — bagian helpers

**Files:**
- Create: `scripts/webinar-new.mjs`

**Why:** Helpers (slug validate, name conversion, file existence checks) ditulis duluan supaya bisa unit-thinking sebelum integrasi.

**Step 1: Buat `scripts/webinar-new.mjs` dengan helpers + skeleton**

```js
#!/usr/bin/env node
// CLI generator untuk scaffold webinar baru.
// Usage: npm run webinar:new -- --slug=xxx --title="yyy" --template=dark-premium --format=zoom
// Atau interaktif: npm run webinar:new

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const TEMPLATES = {
  'dark-premium': 'DarkPremium.tsx',
  'light-professional': 'LightProfessional.tsx',
  'bold-gradient': 'BoldGradient.tsx',
}

const FORMATS = ['zoom', 'meet', 'youtube-live', 'offline']

function parseArgs(argv) {
  const args = {}
  for (const arg of argv.slice(2)) {
    const m = arg.match(/^--([a-z-]+)=(.*)$/)
    if (m) args[m[1]] = m[2]
  }
  return args
}

function validateSlug(slug) {
  if (!slug) return 'slug wajib diisi'
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return 'slug harus kebab-case (huruf-kecil + angka, dipisah strip), contoh: leadership-mar2026'
  }
  return null
}

function slugToComponentName(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function fileExists(path) {
  return existsSync(path)
}

async function prompt(rl, question, defaultValue) {
  const suffix = defaultValue ? ` (${defaultValue})` : ''
  const answer = (await rl.question(`${question}${suffix}: `)).trim()
  return answer || defaultValue || ''
}

async function main() {
  const args = parseArgs(process.argv)
  const rl = readline.createInterface({ input, output })

  try {
    // Step 1: Collect inputs (interactive fallback)
    let slug = args.slug
    let title = args.title
    let template = args.template
    let format = args.format

    if (!slug) slug = await prompt(rl, 'Slug (kebab-case)')
    const slugErr = validateSlug(slug)
    if (slugErr) {
      console.error(`✗ ${slugErr}`)
      process.exit(1)
    }

    if (!title) title = await prompt(rl, 'Title')
    if (!title) {
      console.error('✗ title wajib diisi')
      process.exit(1)
    }

    if (!template) {
      console.log(`Available templates: ${Object.keys(TEMPLATES).join(', ')}`)
      template = await prompt(rl, 'Template', 'dark-premium')
    }
    if (!TEMPLATES[template]) {
      console.error(`✗ template harus salah satu: ${Object.keys(TEMPLATES).join(', ')}`)
      process.exit(1)
    }

    if (!format) {
      console.log(`Available formats: ${FORMATS.join(', ')}`)
      format = await prompt(rl, 'Format', 'zoom')
    }
    if (!FORMATS.includes(format)) {
      console.error(`✗ format harus salah satu: ${FORMATS.join(', ')}`)
      process.exit(1)
    }

    const componentName = slugToComponentName(slug)
    const componentPath = join(ROOT, 'components/webinar/pages', `${componentName}.tsx`)
    const templatePath = join(ROOT, 'components/webinar/pages/templates', TEMPLATES[template])
    const registryPath = join(ROOT, 'components/webinar/pages/registry.ts')
    const webinarsPath = join(ROOT, 'lib/webinars.ts')

    // Step 2: Pre-flight checks
    if (fileExists(componentPath)) {
      console.error(`✗ ${componentPath} sudah ada — slug "${slug}" mungkin duplikat`)
      process.exit(1)
    }
    if (!fileExists(templatePath)) {
      console.error(`✗ template ${templatePath} tidak ditemukan`)
      process.exit(1)
    }

    const registrySource = readFileSync(registryPath, 'utf8')
    if (registrySource.includes(`from './${componentName}'`)) {
      console.error(`✗ component "${componentName}" sudah terdaftar di registry`)
      process.exit(1)
    }
    if (!registrySource.includes('// CLI:imports-end') || !registrySource.includes('// CLI:entries-end')) {
      console.error('✗ marker comments di registry.ts hilang. Reset file ini dulu.')
      process.exit(1)
    }

    const webinarsSource = readFileSync(webinarsPath, 'utf8')
    if (webinarsSource.includes(`slug: '${slug}'`)) {
      console.error(`✗ slug "${slug}" sudah ada di lib/webinars.ts`)
      process.exit(1)
    }
    if (!webinarsSource.includes('// CLI:entries-end')) {
      console.error('✗ marker comment di lib/webinars.ts hilang. Reset file ini dulu.')
      process.exit(1)
    }

    // Step 3: Apply changes (delegated to next task — Task 9)
    // ...

    console.log('TODO Task 9: implement file mutations')
  } finally {
    rl.close()
  }
}

main().catch((err) => {
  console.error('✗ unexpected error:', err)
  process.exit(1)
})
```

**Step 2: Tambah `webinar:new` script ke `package.json`**

Find:
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
```

Replace:
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "webinar:new": "node scripts/webinar-new.mjs"
  },
```

**Step 3: Smoke test — input validation**

Run: `npm run webinar:new -- --slug=invalid_slug --title=Test --template=dark-premium --format=zoom`
Expected: error `✗ slug harus kebab-case...`, exit code 1.

Run: `npm run webinar:new -- --slug=iso-9001-jan2026 --title=Test --template=dark-premium --format=zoom`
Expected: error `✗ ...sudah ada...` atau `✗ slug "iso-9001-jan2026" sudah ada...`, exit code 1.

Run: `npm run webinar:new -- --slug=test-x --title=Test --template=invalid --format=zoom`
Expected: error `✗ template harus salah satu...`, exit code 1.

Run: `npm run webinar:new -- --slug=test-x --title=Test --template=dark-premium --format=invalid`
Expected: error `✗ format harus salah satu...`, exit code 1.

Run: `npm run webinar:new -- --slug=valid-test-feb2027 --title="Valid Test" --template=dark-premium --format=zoom`
Expected: print "TODO Task 9: implement file mutations" (belum ada mutasi file karena belum implement).

**Step 4: Commit**

```bash
git add scripts/webinar-new.mjs package.json
git commit -m "feat(webinar): add CLI generator skeleton with input validation"
```

---

### Task 9: Implement file mutations di CLI generator

**Files:**
- Modify: `scripts/webinar-new.mjs`

**Step 1: Replace placeholder TODO dengan logic mutasi file**

Find:
```js
    // Step 3: Apply changes (delegated to next task — Task 9)
    // ...

    console.log('TODO Task 9: implement file mutations')
```

Replace:
```js
    // Step 3: Apply changes
    const mutations = []

    try {
      // 3a. Copy template → components/webinar/pages/[ComponentName].tsx
      const templateSource = readFileSync(templatePath, 'utf8')
      const componentSource = templateSource.replaceAll('__TEMPLATE_NAME__', componentName)
      writeFileSync(componentPath, componentSource, 'utf8')
      mutations.push({ type: 'create', path: componentPath })

      // 3b. Insert into registry.ts
      const importLine = `import ${componentName} from './${componentName}'\n`
      const entryLine = `  '${slug}': ${componentName},\n`
      const newRegistry = registrySource
        .replace('// CLI:imports-end', `${importLine}// CLI:imports-end`)
        .replace('// CLI:entries-end', `${entryLine}  // CLI:entries-end`)
      writeFileSync(registryPath, newRegistry, 'utf8')
      mutations.push({ type: 'modify', path: registryPath, before: registrySource })

      // 3c. Insert into lib/webinars.ts
      const newEntry = `  {
    slug: '${slug}',
    title: '${title.replaceAll("'", "\\'")}',
    description: 'TODO: tulis deskripsi 1-2 kalimat untuk OG/SEO.',
    thumbnail: 'https://picsum.photos/seed/${slug}/1200/630',
    startsAt: 'TODO-ISO-DATE+07:00',
    durationMinutes: 90,
    format: '${format}',
    price: 0,
    mayarUrl: 'https://mayar.id/polakerja/${slug}',
    speakers: [
      { name: 'TODO Nama', role: 'TODO Role', photo: 'https://placehold.co/400x400/0F172A/FFFFFF?text=??' },
    ],
    category: 'umum',
  },
`
      const newWebinars = webinarsSource.replace('// CLI:entries-end', `${newEntry}  // CLI:entries-end`)
      writeFileSync(webinarsPath, newWebinars, 'utf8')
      mutations.push({ type: 'modify', path: webinarsPath, before: webinarsSource })

      // Step 4: Success message
      console.log(`✓ Created ${componentPath}`)
      console.log(`✓ Registered ${componentName} in registry.ts`)
      console.log(`✓ Added entry "${slug}" to lib/webinars.ts`)
      console.log('')
      console.log('Next steps:')
      console.log(`  1. Edit lib/webinars.ts → ganti TODO dengan data asli (tanggal, harga, mayarUrl, speaker, dll)`)
      console.log(`  2. Customize components/webinar/pages/${componentName}.tsx sesuai desain klien`)
      console.log(`  3. Pastikan semua URL aset eksternal (Cloudinary/Drive klien)`)
      console.log(`  4. Run: npm run dev → preview di webinar.localhost:3000/${slug}`)
    } catch (err) {
      // Rollback on failure
      console.error('✗ Mutation failed:', err.message)
      console.error('Rolling back...')
      for (const m of mutations.reverse()) {
        try {
          if (m.type === 'create' && existsSync(m.path)) {
            const { unlinkSync } = await import('node:fs')
            unlinkSync(m.path)
            console.error(`  ↺ deleted ${m.path}`)
          } else if (m.type === 'modify' && m.before !== undefined) {
            writeFileSync(m.path, m.before, 'utf8')
            console.error(`  ↺ reverted ${m.path}`)
          }
        } catch (rollbackErr) {
          console.error(`  ✗ rollback failed for ${m.path}:`, rollbackErr.message)
        }
      }
      process.exit(1)
    }
```

**Step 2: End-to-end test dengan slug baru**

Run: `npm run webinar:new -- --slug=test-cli-may2026 --title="Test CLI Generator" --template=dark-premium --format=zoom`
Expected:
- Print 3 baris `✓ Created/Registered/Added`.
- Print "Next steps:" instructions.

**Step 3: Verify file changes**

Check via Read tool:
- `components/webinar/pages/TestCliMay2026.tsx` exists, dengan isi DarkPremium template + nama function `TestCliMay2026`.
- `components/webinar/pages/registry.ts` punya line `import TestCliMay2026 from './TestCliMay2026'` dan entry `'test-cli-may2026': TestCliMay2026,`.
- `lib/webinars.ts` punya entry baru dengan `slug: 'test-cli-may2026'` dan TODO placeholders.

**Step 4: Verify build passes dengan webinar test baru**

Run: `npm run build`
Expected: 6 prerendered routes (4 webinar slug sekarang termasuk yang `test-cli-may2026`), pass clean.

**Step 5: Verify idempotency — coba run lagi dengan slug yang sama**

Run: `npm run webinar:new -- --slug=test-cli-may2026 --title="Test 2" --template=dark-premium --format=zoom`
Expected: error `✗ ...sudah ada...`, exit code 1, **tidak ada perubahan file**.

**Step 6: Cleanup test webinar**

Hapus webinar test agar repo bersih:
- Delete file `components/webinar/pages/TestCliMay2026.tsx`
- Edit `components/webinar/pages/registry.ts`: hapus baris import dan entry untuk `test-cli-may2026`.
- Edit `lib/webinars.ts`: hapus entry untuk `test-cli-may2026`.

Run: `npm run build` → pass clean (kembali ke 5 routes).

**Step 7: Commit (CLI generator + cleanup)**

```bash
git add scripts/webinar-new.mjs
git commit -m "feat(webinar): implement CLI generator file mutations with rollback"
```

Note: cleanup tidak perlu di-commit karena tidak pernah di-stage.

---

## Phase 3: Documentation

### Task 10: Tulis `docs/webinar-intake.md`

**Files:**
- Create: `docs/webinar-intake.md`

**Step 1: Buat doc workflow intake klien**

```markdown
# Webinar Intake Workflow

> Untuk klien Polakerja yang mau jadwalin webinar baru di webinar.polakerja.com.

## Alur

1. **Klien isi Google Form** (link: TODO — buat Form sesuai field di bawah, paste link-nya di sini).
2. **Klien upload aset ke Google Drive** mereka. 1 folder per webinar, set folder public.
3. **Klien WA developer**: kirim link Form result + link Drive folder.
4. **Developer kerjain**: setup webinar di repo, kirim preview link Vercel.
5. **Klien review** preview link → revisi via WA → developer push commit.
6. **Live**: setelah approve, deploy ke production.

## Field Google Form (template)

Bikin Form dengan field berikut:

### Section 1: Identitas Webinar
- **Slug** (text, kebab-case, contoh: `iso-9001-jan2026`) — unique identifier
- **Judul** (text, max 80 karakter)
- **Subtitle/tagline** (text, optional)
- **Deskripsi singkat** (textarea, 1-2 kalimat untuk OG/SEO)
- **Kategori** (dropdown: ISO, Legalitas, SBU, Sistem, Umum)

### Section 2: Jadwal & Format
- **Tanggal & jam mulai** (datetime, timezone WIB)
- **Durasi (menit)** (number, contoh: 90)
- **Format** (dropdown: Zoom, Meet, YouTube Live, Offline)

### Section 3: Harga & Pembayaran
- **Harga normal (Rp)** (number)
- **Early bird price (Rp)** (number, optional)
- **Early bird sampai tanggal** (date, optional)
- **URL produk Mayar.id** (text — bikin dulu produknya di mayar.id dashboard)

### Section 4: Pembicara
- **Nama pembicara 1** (text)
- **Role/jabatan 1** (text)
- **Foto pembicara 1** (file upload ke Drive folder, atau URL Cloudinary)
- (ulangi 2-3 kalau lebih dari 1 speaker)

### Section 5: Konten
- **3-5 Learning outcomes** (textarea, satu per baris)
- **Agenda** (textarea, format `MM:SS - judul sesi`)
- **Mood/tema design** (dropdown: Dark Premium, Light Professional, Bold Gradient, Custom 100%)
- **Asset catatan tambahan** (textarea, optional — sebut warna brand klien, font preference, dll)

### Section 6: Aset Drive
- **Link Google Drive folder berisi aset** (text URL, set folder public)
  - Hero image (1200x630, JPG/PNG)
  - Foto speaker (400x400, JPG/PNG)
  - Logo klien (PNG transparent, optional)
  - Video promo (MP4, optional)

## Konvensi Aset

**Wajib URL eksternal**, jangan kirim attachment WA. Pilihan:

1. **Google Drive klien** (paling mudah): upload ke folder, set public link, kirim URL.
2. **Cloudinary free tier** (premium, untuk performa): klien register di cloudinary.com, dapat 25GB free, URL CDN langsung kasih ke developer.
3. **YouTube unlisted** (untuk video promo): upload, set unlisted, kirim embed URL.

Aset **TIDAK** disimpan di server developer.

## Setelah Form Submit

1. Form auto-fill ke Google Sheet (developer punya akses).
2. Notifikasi WA otomatis ke developer (setup pakai Zapier/Make atau manual).
3. Developer mulai kerjain dalam 24 jam (atau sesuai SLA paket).

## Pricing & Retainer (Lihat docs/webinar-pricing-template.md)
```

**Step 2: Commit**

```bash
git add docs/webinar-intake.md
git commit -m "docs(webinar): client intake workflow + Google Form field template"
```

---

### Task 11: Tulis `docs/webinar-pricing-template.md`

**Files:**
- Create: `docs/webinar-pricing-template.md`

**Step 1: Buat saran pricing model**

```markdown
# Webinar Service — Pricing Template

> Template internal untuk paket service webinar Polakerja. Adjust angka & detail sesuai keputusan klien.

## Filosofi

- **Design custom per webinar = USP**, bukan template generic.
- **Update minor (tanggal/harga/sold-out) = paid service**, bukan free labor.
- **Aset di akun klien**, developer zero storage cost.

## Paket Saran

### 🎯 Standard (Rp X juta / webinar)

- Setup webinar baru pakai 1 dari 3 starter template (Dark Premium / Light Professional / Bold Gradient).
- Customize warna, font ringan, copy text, asset URL.
- 1 revisi major + 3 revisi minor (sebelum live).
- 3 update minor pasca-launch (tanggal, harga, sold-out, dll) — di luar itu kena fee per change.
- Preview link Vercel sebelum live.
- SLA setup: 3 hari kerja.

### 💎 Custom (Rp Y juta / webinar)

- Design 100% custom (bukan template). Klien kirim brief mood + referensi → developer interpretasi ke design.
- Unlimited revisi minor sampai launch.
- 5 update minor pasca-launch.
- Optional: Figma mockup dulu sebelum code.
- SLA setup: 5-7 hari kerja.

### 🔁 Retainer Bulanan (Rp Z juta / bulan)

- Untuk klien yang publish webinar tiap bulan (3-5x).
- Include: setup [N] webinar Standard + unlimited update minor di webinar yang sudah live.
- Custom webinar fee tetap diluar paket.

## Per-Item Fee (di luar paket)

| Item | Estimasi |
|---|---|
| Update tanggal/harga/sold-out (>3 di paket Standard) | Rp 100k / change |
| Tambah block / ganti layout pasca-launch | Rp 500k - 1jt |
| Migrasi aset dari Drive ke Cloudinary | Rp 200k |
| Re-design ulang webinar yang sudah live | dihitung sebagai project baru |

## Yang DILUAR Service

Yang tidak ditangani developer (klien handle sendiri):

- ❌ Bayar mayar.id (klien punya akun sendiri).
- ❌ Bayar storage Cloudinary/Drive.
- ❌ Hosting Zoom/Meet license.
- ❌ Marketing & promosi webinar.
- ❌ Customer service ke peserta.
- ❌ Refund / dispute pembayaran (handled by mayar).

## Catatan Eksekusi

- Bikin invoice + kontrak per project (gunakan template Mekari/Excel/Notion).
- Bayar 50% upfront sebelum kerja, 50% sebelum live.
- Retainer: invoice di awal bulan.
```

**Step 2: Commit**

```bash
git add docs/webinar-pricing-template.md
git commit -m "docs(webinar): pricing & retainer template for client service"
```

---

### Task 12: Update `docs/webinar-add-new.md` dengan workflow CLI generator

**Files:**
- Modify: `docs/webinar-add-new.md`

**Step 1: Read current `docs/webinar-add-new.md` untuk konteks**

Pakai Read tool untuk lihat isi current file.

**Step 2: Tambah section CLI generator di awal**

Insert section baru di setelah heading utama (sebelum step manual yang ada):

```markdown
## Quick Start (CLI Generator)

```bash
npm run webinar:new -- --slug=leadership-mar2026 --title="Leadership untuk Manager Baru" --template=dark-premium --format=zoom
```

Atau interactive:

```bash
npm run webinar:new
```

CLI akan:
1. Validasi slug (kebab-case, tidak duplikat).
2. Copy starter template ke `components/webinar/pages/[ComponentName].tsx`.
3. Auto-register di `components/webinar/pages/registry.ts`.
4. Insert entry placeholder di `lib/webinars.ts`.

Setelah CLI selesai, edit:
- `lib/webinars.ts` → ganti TODO placeholders dengan data asli.
- `components/webinar/pages/[ComponentName].tsx` → customize sesuai brief klien.

## Starter Templates

3 starter template ready-to-customize di `components/webinar/pages/templates/`:

| Template | Mood | Block utama |
|---|---|---|
| `dark-premium` | Gelap, elegan, premium | Hero image full bleed, Pitch, LearningOutcomes grid, AgendaTimeline, SpeakerCard, InvestmentBlock, FAQ |
| `light-professional` | Cerah, korporat, bersih | Hero teks, AudienceTarget, AgendaTimeline, SpeakerCard, BonusList, InvestmentBlock |
| `bold-gradient` | Berani, gradient, modern | Hero gradient, LearningOutcomes list, SpeakerCard, TestimonialQuotes, InvestmentBlock, FAQ |

## Aset (URL Eksternal Wajib)

**JANGAN simpan aset di `public/webinar/`**. Semua field aset (`thumbnail`, `speakers[].photo`, dll) wajib URL eksternal:

- Cloudinary akun klien: `https://res.cloudinary.com/[client]/...`
- Google Drive public link: `https://drive.google.com/uc?id=...`
- YouTube/Vimeo embed (untuk video)
- Placeholder demo: `https://picsum.photos/seed/[slug]/1200/630`

`next.config.ts` sudah whitelist domain di atas via `remotePatterns`.

Lihat `docs/webinar-intake.md` untuk workflow intake klien lengkap.
```

**Step 3: Commit**

```bash
git add docs/webinar-add-new.md
git commit -m "docs(webinar): document CLI generator + starter templates + asset convention"
```

---

## Phase 4: Verification

### Task 13: Final smoke test end-to-end

**Files:** (verifikasi only, no edit)

**Step 1: Build pass clean**

Run: `npm run build`
Expected:
- `✓ Compiled successfully`
- 5 routes prerendered (`/`, `/webinar`, `/webinar/iso-9001-jan2026`, `/webinar/sbu-konstruksi-feb2026`, `/webinar/sitemap.xml`)
- Proxy aktif
- Zero TypeScript errors
- Zero `metadataBase` warning (sudah di-fix di sesi sebelumnya)

**Step 2: CLI generator end-to-end**

Run: `npm run webinar:new -- --slug=smoke-test-may2026 --title="Smoke Test" --template=light-professional --format=zoom`
Expected: 3 file mutations success, "Next steps" muncul.

Run: `npm run build`
Expected: 6 routes prerendered (termasuk `/webinar/smoke-test-may2026`), pass clean.

**Step 3: Cleanup smoke test webinar**

- Delete `components/webinar/pages/SmokeTestMay2026.tsx`
- Edit `components/webinar/pages/registry.ts`: hapus baris import dan entry `smoke-test-may2026`.
- Edit `lib/webinars.ts`: hapus entry `smoke-test-may2026`.

Run: `npm run build` → pass clean, kembali ke 5 routes.

**Step 4: Verify dev server smoke (manual)**

Restart dev server kalau perlu. Buka browser:
- `http://localhost:3000/` → landing utama, tidak terganggu.
- `http://webinar.localhost:3000/` → index webinar dengan 2 card thumbnail picsum.photos.
- `http://webinar.localhost:3000/iso-9001-jan2026` → detail webinar, hero pakai picsum, speaker pakai placehold.

Konfirmasi: gambar muncul dari URL eksternal, tidak ada 404 di console network.

**Step 5: Verify git state clean**

Run: `git status`
Expected: `nothing to commit, working tree clean`.

Run: `git log --oneline master..HEAD | head -20`
Expected: rangkaian commit dari Task 1-12.

---

## Definition of Done — Checklist

Reference: `docs/plans/2026-05-08-webinar-dynamic-update-design.md` § Definition of Done.

- [ ] Task 1-3: Foundation — `next.config.ts`, sample webinars migrated, runtime warning.
- [ ] Task 4-6: Tiga starter template (`DarkPremium`, `LightProfessional`, `BoldGradient`).
- [ ] Task 7-9: CLI generator + marker comments + file mutations + rollback.
- [ ] Task 10-12: Documentation (intake, pricing, add-new update).
- [ ] Task 13: Final smoke test pass.
- [ ] Build production pass clean (5 routes prerendered, no warnings, no TypeScript errors).
- [ ] CLI smoke test pass: bikin slug baru → 6 routes, idempotent (slug duplicate gagal graceful).
- [ ] Working tree clean, semua commit per task.
