# Cara Menambah Webinar Baru

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

7. **Push & deploy:** PR → merge → Vercel auto deploy → live di `webinar.polakerja.com/[slug]`

## Setup subdomain di Vercel (one-time)

1. DNS provider: tambah CNAME record `webinar` → `cname.vercel-dns.com`
2. Vercel project → Settings → Domains → Add `webinar.polakerja.com`
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
