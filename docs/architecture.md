# Polakerja — Architecture Guide

> **Untuk siapa:** developer (manusia) dan AI CLI assistants (Claude Code, dll) yang baru masuk ke project ini.
>
> **Tujuan dokumen:** kasih mental model yang benar tentang gimana aplikasi ini bekerja sebelum nyentuh kode. Hemat waktu eksplorasi, hindari salah asumsi.
>
> **Last updated:** 2026-05-08 (akhir Fase 2 webinar dynamic update)

---

## 1. Big Picture: Satu Next.js, dua "website"

Project ini melayani **2 domain** dari **1 codebase Next.js** yang sama:

```
polakerja.com               webinar.polakerja.com
       │                            │
       └────────────┬───────────────┘
                    ▼
          Same Next.js project
          (shared branding, components, deploy)
```

**Cara kerja:**
- DNS arahkan keduanya ke server Vercel yang sama.
- Next.js baca header `Host` saat request masuk.
- File `proxy.ts` di root project deteksi host → rewrite path internal.
- Kalau host `webinar.polakerja.com`, semua URL di-rewrite ke folder `/app/webinar/*`.

**Why begini:** reuse Logo, Footer, Tailwind theme, font, deploy pipeline. Daripada bikin 2 Next.js project terpisah.

```
URL user lihat                    Internal Next.js routing
─────────────────                 ──────────────────────────
polakerja.com/             ─────► app/page.tsx
polakerja.com/about        ─────► app/about/page.tsx

webinar.polakerja.com/             ┐
                                    ├ proxy.ts rewrite:
                                    ▼
                          ─────►   app/webinar/page.tsx

webinar.polakerja.com/iso-9001     ┐
                                    ├ proxy.ts rewrite:
                                    ▼
                          ─────►   app/webinar/[slug]/page.tsx
```

**Catatan Next.js 16 breaking change:** `middleware.ts` → `proxy.ts`, fungsi `middleware()` → `proxy()`. Default runtime Node.js. Kalau lihat tutorial pakai `middleware.ts`, itu Next.js ≤15.

---

## 2. Folder Structure (yang penting)

```
polakerja/
├── proxy.ts                          ← Subdomain router (deteksi host header)
├── next.config.ts                    ← remotePatterns untuk gambar eksternal
│
├── app/
│   ├── page.tsx                      ← Landing utama polakerja.com
│   ├── layout.tsx                    ← Root layout
│   │
│   └── webinar/                      ← Semua route subdomain webinar
│       ├── layout.tsx                ← Navbar webinar + Footer (metadataBase)
│       ├── page.tsx                  ← Index list semua webinar
│       ├── [slug]/
│       │   ├── page.tsx              ← Dispatcher: lookup + render page komponen + JSON-LD
│       │   └── not-found.tsx
│       ├── sitemap.ts
│       └── robots.ts
│
├── components/
│   ├── layout/Footer.tsx             ← Shared antara 2 domain
│   └── webinar/
│       ├── WebinarNavbar.tsx
│       ├── WebinarCard.tsx           ← Card di index page
│       │
│       ├── blocks/                   ← Lego pieces yang bisa dicompose
│       │   ├── WebinarHero.tsx
│       │   ├── CountdownTimer.tsx
│       │   ├── LearningOutcomes.tsx
│       │   ├── AgendaTimeline.tsx
│       │   ├── SpeakerCard.tsx
│       │   ├── InvestmentBlock.tsx
│       │   ├── MayarPayButton.tsx
│       │   ├── WebinarFAQ.tsx
│       │   └── ... 12+ blocks total
│       │
│       └── pages/
│           ├── registry.ts           ← Mapping slug → komponen (CLI markers)
│           ├── Iso9001Jan2026.tsx    ← 1 file = 1 webinar
│           ├── SbuKonstruksiFeb2026.tsx
│           └── templates/            ← 3 starter template (untuk CLI generator)
│               ├── DarkPremium.tsx
│               ├── LightProfessional.tsx
│               └── BoldGradient.tsx
│
├── lib/
│   └── webinars.ts                   ← Database manual (array TypeScript) + helpers
│
├── scripts/
│   └── webinar-new.mjs               ← CLI generator: npm run webinar:new
│
└── docs/
    ├── architecture.md               ← (file ini)
    ├── webinar-add-new.md            ← How-to bikin webinar baru
    ├── webinar-intake.md             ← Form intake klien
    ├── webinar-pricing-template.md   ← Saran pricing model
    └── plans/                        ← Design + implementation plan history
        ├── 2026-05-07-webinar-subdomain-design.md
        ├── 2026-05-07-webinar-subdomain-implementation.md
        ├── 2026-05-08-webinar-dynamic-update-design.md
        └── 2026-05-08-webinar-dynamic-update.md
```

---

## 3. Pattern Inti: Registry + Dispatcher

Pattern paling penting di project ini. Mirip plugin system. Pahami ini, paham 70% codebase.

### a. `lib/webinars.ts` — array data semua webinar

"Database manual" — setiap webinar = 1 entry di array TypeScript. Bukan database betulan.

```ts
export const webinars: Webinar[] = [
  {
    slug: 'iso-9001-jan2026',
    title: '...',
    startsAt: '2026-01-15T19:00:00+07:00',
    price: 99000,
    mayarUrl: 'https://mayar.id/polakerja/iso-9001-jan2026',
    speakers: [...],
    // ...
  },
  // CLI:entries-end   ← marker untuk CLI generator insert entry baru
]
```

Plus helpers: `getWebinarStatus`, `getUpcomingWebinars`, `getPastWebinars`, `getWebinarBySlug`.

### b. `components/webinar/pages/registry.ts` — mapping slug ke komponen React

```ts
export const webinarPages: Record<string, ComponentType<...>> = {
  'iso-9001-jan2026': Iso9001Jan2026,
  'sbu-konstruksi-feb2026': SbuKonstruksiFeb2026,
  // CLI:entries-end
}
```

### c. `app/webinar/[slug]/page.tsx` — dispatcher generic

```tsx
export default async function WebinarDetailPage({ params }) {
  const { slug } = await params
  const webinar = getWebinarBySlug(slug)
  const Page = webinarPages[slug]
  if (!webinar || !Page) notFound()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Page webinar={webinar} />
    </>
  )
}
```

**Why pattern ini bagus:**
- Tiap webinar = komponen React unik = **desain bebas** per webinar.
- Metadata tetap **type-safe + terstruktur**.
- Dispatcher generic = JSON-LD SEO + 404 + metadata di-handle sekali untuk semua webinar.
- Static generation via `generateStaticParams` → tiap webinar prerender ke HTML.

---

## 4. Reusable Blocks — Lego Pieces

12+ block di `components/webinar/blocks/` yang bisa dicompose. Tiap block sudah handle behavior-nya sendiri:

| Block | Function |
|---|---|
| `WebinarHero` | Hero section + countdown + tombol Daftar |
| `MayarPayButton` | Tombol "Daftar Sekarang" → redirect ke mayar.id (target=\_blank) |
| `CountdownTimer` | Live countdown, auto-hide setelah lewat |
| `LearningOutcomes` | Grid/list outcomes dengan checkmark |
| `AgendaTimeline` | Timeline vertikal dengan numbered markers |
| `SpeakerCard` | Foto + bio + credentials chips (single call dengan array `speakers`) |
| `InvestmentBlock` | Pricing card dengan early-bird strikethrough + countdown |
| `WebinarFAQ` | Accordion (Framer Motion, `'use client'`) |
| `WebinarPitch` | Typography wrapper |
| `VideoHero` | Video embed dengan controls |
| `AudienceTarget` | Bulleted list dengan Target icons |
| `BonusList` | Dynamic Lucide icon lookup |
| `TestimonialQuotes` | Quote grid |

**Aturan compose:** komponen page tinggal compose block-block ini + Tailwind custom. Gak reinvent block per webinar.

---

## 5. Mayar.id Integration — Sederhana Banget

```
User klik "Daftar Sekarang"
        ↓
target=_blank ke webinar.mayarUrl
        ↓
mayar.id form pembayaran (di-handle Mayar)
        ↓
User bayar
        ↓
Mayar kirim email berisi link Zoom/Meet
        ↓
DONE
```

**Aplikasi BUKAN payment processor.** Cuma URL redirect.

**Tidak ada di project:**
- API call ke Mayar
- Webhook
- Database attendee
- Auth user
- Server-side payment logic

Semua ditangani Mayar. Aplikasi cuma "etalase" — desain bagus + tombol redirect.

---

## 6. Filosofi Storage: Zero Cost untuk Developer

**Aturan emas:** aset visual (gambar, video) **TIDAK PERNAH** disimpan di server kita.

```
Sumber aset (akun klien)         URL eksternal di lib/webinars.ts
─────────────────────────        ────────────────────────────────────
Cloudinary klien            ───► https://res.cloudinary.com/[client]/...
Google Drive klien (public) ───► https://drive.google.com/uc?id=...
YouTube klien               ───► https://youtube.com/embed/...
Demo placeholder            ───► https://picsum.photos/seed/[slug]/1200/630
                                 https://placehold.co/400x400/...
```

`next.config.ts` whitelist domain di atas via `remotePatterns`, supaya `next/image` bisa optimize-nya.

**`lib/webinars.ts` ada runtime warning** yang console.warn kalau ada path lokal (`/webinar/...`) di field aset — biar gak tergoda balik ke pattern lokal.

**Why:** klien tidak menyediakan dana untuk storage developer. Kalau aset viral / banyak traffic, bandwidth/storage = klien yang tanggung di akun CDN-nya. Vercel cuma serve HTML kecil. Cost developer ≈ 0.

---

## 7. Workflow: Tambah Webinar Baru

```
1. Klien isi Google Form        ← brief lengkap
   + upload aset ke Drive klien
            ↓
2. Developer terminal:
   npm run webinar:new
            ↓
   CLI generator otomatis:
   • Copy starter template (dark-premium / light-professional / bold-gradient)
   • Register di registry.ts (insert sebelum // CLI:imports-end + // CLI:entries-end)
   • Insert entry di lib/webinars.ts (insert sebelum // CLI:entries-end)
            ↓
3. Edit 2 file:
   • lib/webinars.ts → ganti TODO dengan data dari Form
   • components/webinar/pages/[Name].tsx → customize design sesuai brief
            ↓
4. git push branch
            ↓
   Vercel auto-bikin preview URL
            ↓
5. Kirim preview ke klien
            ↓
6. Revisi → push commit lagi
            ↓
7. Merge ke master → live
```

**Total waktu:** 1-3 jam tergantung tingkat customize design.

### CLI generator commands

```bash
# Interactive:
npm run webinar:new

# One-liner:
npm run webinar:new -- --slug=leadership-mar2026 --title="Leadership untuk Manager" --template=dark-premium --format=zoom
```

**CLI generator features:**
- Validasi slug (kebab-case, tidak duplikat)
- 3 template choices: `dark-premium`, `light-professional`, `bold-gradient`
- 4 format choices: `zoom`, `meet`, `youtube-live`, `offline`
- **Idempotent**: re-run dengan slug sama → error graceful, no file changes
- **Rollback**: jika mutasi gagal di tengah jalan, file yang sudah dibuat dihapus + file modified direvert

---

## 8. Workflow: Update Minor Pasca-Launch

Klien chat WA: "tanggal mundur ke 15 Feb"

Developer:
1. Edit `lib/webinars.ts` → ubah `startsAt`
2. `git commit -m "update: tanggal iso-9001"` + push
3. Vercel auto-deploy < 2 menit
4. Reply: "live"

**5 menit kerja per update.** Charge sesuai paket retainer atau per-change fee. Lihat `docs/webinar-pricing-template.md`.

---

## 9. Test Lokal

**Modern browser (Chrome/Firefox/Edge) auto-resolve `*.localhost` ke 127.0.0.1**, jadi tidak perlu edit hosts file.

```bash
npm run dev
```

Buka di browser:

| URL | Yang dirender |
|---|---|
| http://localhost:3000/ | Landing utama Polakerja |
| http://webinar.localhost:3000/ | Index webinar |
| http://webinar.localhost:3000/iso-9001-jan2026 | Detail webinar |
| http://webinar.localhost:3000/sitemap.xml | Sitemap subdomain |

**Verifikasi proxy via curl:**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/ -H "Host: webinar.localhost:3000"
# Expected: 200
```

---

## 10. Mental Model Penting (rangkuman)

3 hal yang harus dipahami konseptual:

1. **"1 Next.js, 2 domain"**
   `proxy.ts` deteksi host header → rewrite path. Shared code (Footer, theme) reusable.

2. **"Registry + Dispatcher"**
   Array data (`lib/webinars.ts`) + map slug→komponen (`registry.ts`) + dispatcher generic (`app/webinar/[slug]/page.tsx`). Pattern ini scale untuk N webinar tanpa N route file.

3. **"Storage = klien"**
   Semua aset visual via URL eksternal. Aplikasi cuma serve HTML. Cost developer ≈ 0.

**Yang BUKAN bagian dari aplikasi (jangan coba bangun):**
- Payment processing (Mayar handle)
- User auth (gak ada, gak butuh)
- Database (gak ada — array TypeScript cukup untuk volume webinar low-medium)
- CMS / page builder (sengaja tidak dipakai — file-based + custom design = USP klien)

---

## 11. Quick Reference

| Mau apa? | Buka file mana? |
|---|---|
| Tambah webinar baru | `npm run webinar:new` lalu edit `lib/webinars.ts` + `components/webinar/pages/[Name].tsx` |
| Update tanggal/harga | `lib/webinars.ts` |
| Ubah design block global (misal warna button) | `components/webinar/blocks/[Block].tsx` |
| Ubah index page webinar | `app/webinar/page.tsx` |
| Ubah subdomain routing logic | `proxy.ts` |
| Tambah block baru reusable | bikin di `components/webinar/blocks/` |
| Tambah starter template baru | bikin di `components/webinar/pages/templates/` (jangan lupa update `TEMPLATES` map di `scripts/webinar-new.mjs`) |
| Update SEO metadata default subdomain | `app/webinar/layout.tsx` |
| Whitelist domain CDN baru untuk gambar | `next.config.ts` → `remotePatterns` |
| Update workflow doc | `docs/webinar-*.md` |
| Lihat history design decision | `docs/plans/` |

---

## 12. Tech Stack Reference

- **Next.js**: 16.2.4 (App Router, breaking changes vs ≤15 — `proxy.ts`, async `params`)
- **React**: 19
- **TypeScript**: 5
- **Tailwind CSS**: 4
- **Framer Motion**: 12 (untuk WebinarFAQ accordion)
- **Lucide React**: ikon
- **Node.js**: 24 LTS (Vercel default)
- **Deploy**: Vercel
- **Storage**: tidak ada (file-based + URL eksternal)
- **Database**: tidak ada
- **Auth**: tidak ada

---

## 13. Important File Markers

CLI generator pakai marker comments sebagai anchor untuk insert idempotent. **JANGAN HAPUS markers ini** kalau gak tahu konsekuensinya:

**`components/webinar/pages/registry.ts`:**
- `// CLI:imports-end` — anchor insert import baru
- `// CLI:entries-end` — anchor insert entry mapping baru

**`lib/webinars.ts`:**
- `// CLI:entries-end` — anchor insert webinar entry baru

Jika marker terhapus, CLI generator akan error dengan pesan jelas. Tinggal kembalikan markernya manual.

---

## 14. Untuk AI Assistant (Claude Code, dll)

Sebelum nyentuh kode di project ini:

1. Baca dokumen ini sampai habis (sekitar 5 menit).
2. Untuk perubahan signifikan, baca juga `docs/plans/` yang relevan untuk paham keputusan design sebelumnya.
3. Untuk Next.js 16 specifics, baca `node_modules/next/dist/docs/` (per `AGENTS.md`).
4. Jangan asumsikan ada CMS/database — file-based by design.
5. Jangan tambah feature di luar scope (auth, payment, page builder) tanpa konfirmasi user.
6. Jaga prinsip "zero storage cost" — aset selalu URL eksternal.
7. Jaga pattern Registry + Dispatcher konsisten.
8. Per feedback memory user: saat eksekusi multi-task plan, batch per fase ke 1 implementer subagent, skip per-task review subagents (hemat token).
