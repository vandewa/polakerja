# Cara Menambah Webinar Baru

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

## Langkah ringkas

1. **Mayar.id**
   - Login ke dashboard mayar.id
   - Buat product type Event/Webinar
   - Set harga, kapasitas, deskripsi
   - Konfigurasi delivery: email link Zoom/Meet otomatis setelah bayar
   - Copy URL produk (misal `https://mayar.id/polakerja/[slug]`)

2. **Tambah entry di `lib/webinars.ts`**
   - Append ke array `webinars` dengan metadata lengkap
   - `slug` harus unik dan match nama file di langkah 3

3. **Bikin halaman komponen** — `components/webinar/pages/[NamaWebinar].tsx`
   - Compose blocks dari `components/webinar/blocks/`
   - Bebas pakai Tailwind sesuai desain

4. **Daftarkan ke registry** — `components/webinar/pages/registry.ts`
   - Import komponen, tambahkan entry `[slug]: Komponen`

5. **Tambah aset gambar** ke `public/webinar/` (thumbnail, speaker photo, bg, dll)

6. **Verify lokal:** `npm run dev` → buka `webinar.localhost:3000/[slug]`

7. **Push & deploy:** PR → merge → Vercel auto deploy → live di `webinar.polakerja.id/[slug]`

## Setup subdomain di Vercel (one-time)

1. DNS provider: tambah CNAME record `webinar` → `cname.vercel-dns.com`
2. Vercel project → Settings → Domains → Add `webinar.polakerja.id`
3. Vercel auto-issue SSL cert

## Block components yang tersedia

Lihat `components/webinar/blocks/`:

- `WebinarHero` — hero dengan tanggal/format/CTA, optional bgImage/bgVideo
- `VideoHero` — embed video (controls)
- `WebinarPitch` — wrapper teks dengan typography preset
- `LearningOutcomes` — grid/list bullet outcome
- `AgendaTimeline` — timeline vertikal sesi
- `SpeakerCard` — kartu pembicara dengan foto + bio + credentials
- `AudienceTarget` — target audience bulleted
- `BonusList` — fasilitas/bonus dengan icon Lucide
- `InvestmentBlock` — pricing card dengan early-bird countdown
- `CountdownTimer` — countdown live (digunakan internal Hero/Investment)
- `TestimonialQuotes` — quote grid
- `WebinarFAQ` — accordion FAQ (Framer Motion)
- `MayarPayButton` — tombol redirect universal ke mayar.id
