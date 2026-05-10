# Webinar Dynamic Update — Design (Fase 2)

**Tanggal:** 2026-05-08
**Status:** Approved (brainstorming complete)
**Konteks:** Klien jualan webinar dengan **design custom per webinar** sebagai service premium. Klien suplai konten (gambar, video, copy, jadwal). Developer (vandewa) mau workflow yang nyaman, klien feel maksimal, dan **tidak nanggung biaya storage** karena klien tidak menyediakan dana untuk itu.

## Goals

- Bikin webinar baru jauh lebih cepat (target: setup 5 menit, vs 30 menit sekarang).
- Update kecil pasca-launch (tanggal, harga, sold-out) tetap mudah dan profesional, walaupun tetap lewat developer.
- **Zero storage cost** untuk developer — semua aset visual hosted di akun klien.
- Klien rasa premium: brief intake jelas, preview link sebelum live, design custom.
- Tidak menambah dependency / akun pihak-ketiga yang berbiaya untuk developer.

## Non-Goals (Fase 2)

- Bukan CMS / page builder. Design tiap webinar tetap file-based (kebebasan desain = USP klien).
- Bukan klien edit konten sendiri lewat dashboard. Update minor lewat developer (paid service / retainer).
- Tidak ada Sanity, Notion API, atau Sheets API integration di fase 2.
- Tidak ada upload aset ke server kita (Vercel Blob, Cloudinary akun developer, dll).
- Tidak ada admin UI custom dengan auth.

## Filosofi

> **"Klien feel premium karena service-nya, bukan karena tool-nya."**
>
> Design custom per webinar, brief profesional, preview link, response cepat untuk update — itu yang bikin worth it. Bukan "klien edit form sendiri di CMS".

> **"Aset besar selalu di akun klien."**
>
> Gambar di Cloudinary / Drive klien. Video di YouTube / Vimeo klien. URL eksternal di-paste ke `lib/webinars.ts`. Cost storage & bandwidth = 0 untuk developer, infinitely scalable.

## Architecture (Hybrid file-based + URL eksternal)

Tidak ada perubahan arsitektur fundamental dari fase 1. Yang berubah:

1. **Aset di-host di akun klien**, bukan `public/webinar/`.
2. **Tooling baru** untuk speed-up: CLI generator + starter template.
3. **Workflow intake** baru: Google Form + Drive folder per order.

```
[Klien]                          [Developer]                    [Vercel]
   │                                  │                              │
   │ isi Google Form                  │                              │
   │ upload aset ke Drive             │                              │
   │ (folder per webinar)             │                              │
   │ ────────────────────────────────►│                              │
   │                                  │                              │
   │                                  │ npm run webinar:new          │
   │                                  │ paste URL aset eksternal     │
   │                                  │ pilih starter template       │
   │                                  │ customize Tailwind           │
   │                                  │                              │
   │                                  │ git push branch ────────────►│
   │                                  │                              │ preview URL
   │ ◄──────── kirim preview ─────────│ ◄────────────────────────────│
   │                                  │                              │
   │ revisi (chat WA)                 │                              │
   │ ────────────────────────────────►│ push commit ────────────────►│
   │                                  │                              │
   │                                  │ merge ──────────────────────►│ live
```

## Komponen yang dibangun

### 1. CLI generator: `npm run webinar:new`

Script Node.js sederhana yang scaffold semua boilerplate untuk webinar baru.

**Input:** flag `--slug=xxx --title=yyy --template=dark` (atau interactive prompts).

**Output:**
- File komponen baru di `components/webinar/pages/[NamaWebinar].tsx` (copy dari template terpilih).
- Auto-register di `components/webinar/pages/registry.ts` (insert import + entry).
- Auto-insert entry kosong di `lib/webinars.ts` dengan placeholder yang harus diisi (tanggal, harga, mayarUrl, asset URLs).
- Print next steps ke console: "Edit lib/webinars.ts → isi metadata, lalu customize components/webinar/pages/[NamaWebinar].tsx untuk design final."

**Nilai:** dari 30 menit setup boilerplate → 5 menit. Multi itu untuk tiap webinar baru.

**Constraint:** harus **idempotent** dan **safe** — tidak crash kalau slug sudah ada (suggest rename atau skip), tidak overwrite file existing tanpa konfirmasi, tidak corrupt file lain saat insert.

### 2. Starter templates (3 design siap pakai)

Bukan "template engine". Hanya 3 file `.tsx` di `components/webinar/pages/templates/` yang siap di-copy oleh CLI generator.

| Template | Mood | Komponen utama |
|---|---|---|
| `DarkPremium.tsx` | Gelap, premium, gradient amber/violet | Hero gambar full bleed + countdown, Pitch, LearningOutcomes grid, AgendaTimeline, SpeakerCard, InvestmentBlock dengan early bird, FAQ |
| `LightProfessional.tsx` | Cerah, korporat, bersih | Hero teks dominan dengan 1 foto, Pitch, AudienceTarget, AgendaTimeline, SpeakerCard, BonusList, InvestmentBlock |
| `BoldGradient.tsx` | Berani, warna-warni, modern | VideoHero, LearningOutcomes list variant, SpeakerCard horizontal, TestimonialQuotes, FAQ |

Tiap template **wajib** pakai cuma block dari `components/webinar/blocks/` — biar konsisten dan reusable. Customization detail terjadi setelah copy.

**Nilai:** klien yang budget terbatas → pilih template, customize minor. Klien premium → mulai dari template terdekat, custom 70%+. Tidak ada lagi "blank page paralysis" saat mulai webinar baru.

### 3. URL eksternal-only untuk asset

`lib/webinars.ts` field `thumbnail`, `speakers[].photo`, dan field aset lain di komponen page **wajib** isi URL eksternal absolut (https://...).

**Pattern yang didukung:**
- Cloudinary akun klien: `https://res.cloudinary.com/[client]/image/upload/...`
- Google Drive direct link: `https://drive.google.com/uc?id=...&export=view`
- YouTube embed: `https://www.youtube.com/embed/[videoId]`
- Vimeo: `https://player.vimeo.com/video/[videoId]`

**Pattern yang dihindari:**
- `public/webinar/...` (lokal di repo) — kecuali untuk placeholder sangat kecil yang tidak akan diganti.

**Validasi:** tambah runtime check ringan di `lib/webinars.ts` untuk warn console jika field aset isi path lokal (`/webinar/`). Gak block, cuma reminder.

**`next/image` config:** tambah `remotePatterns` di `next.config.ts` untuk Cloudinary, Drive, dan domain klien yang diharapkan.

### 4. Intake form: Google Form + Drive folder

**Setup sekali (oleh developer):**
- Bikin Google Form berisi semua field yang dibutuhkan untuk satu webinar (judul, subtitle, jadwal+timezone, format Zoom/Meet/Offline, list speaker, harga, early bird tanggal akhir, learning outcomes, agenda, mood/tema design, URL Mayar produk, link Drive folder klien berisi aset).
- Form mengisi otomatis Google Sheet hasil submission.
- Template Drive folder klien: `/Webinar Polakerja/[slug]/` berisi `hero.jpg`, `speaker-[nama].jpg`, `video-promo.mp4` (kalau ada).

**Per order webinar (oleh klien):**
- Klien isi Form, upload aset ke Drive mereka, set folder public.
- Submission → Sheet → notif WA ke developer.

**Aset di akun siapa?**
- Default: Drive klien (gratis 15GB, mereka punya akun Google).
- Premium: arahkan klien register **Cloudinary free tier** (25GB + transformasi otomatis), kasih credentials/upload preset ke developer. Performa lebih baik untuk gambar (auto-WebP, auto-resize).

**Yang DIDOKUMENTASIKAN, bukan dikoding:** Form + Sheet template di luar repo. Cukup tulis link form + screenshot di `docs/webinar-intake.md`.

### 5. Update workflow setelah live

Klien chat WA / WhatsApp Business: "tanggal mundur ke 15 Feb", "harga jadi 750k", "sold out tutup pendaftaran".

Developer:
1. Edit `lib/webinars.ts` field yang dimaksud.
2. `git commit -m "update(webinar): xxx"` → push.
3. Vercel auto-deploy <2 menit.
4. Reply ke klien: "live, cek di webinar.polakerja.com/[slug]".

**Pricing model (saran, di-template di docs):**
- Per-webinar fee: harga setup (3-5jt include 3 update minor).
- Atau retainer bulanan (Rp X / bulan, Y update / unlimited update).

**Yang TIDAK dikoding:** pricing model. Cuma template yang developer adopt sendiri.

## Data Model — Perubahan kecil di `lib/webinars.ts`

```ts
// SEBELUM (fase 1):
export type Webinar = {
  // ...
  thumbnail: string             // /webinar/thumbnails/iso-9001.jpg
  speakers: { name: string; role: string; photo: string }[]  // /webinar/speakers/budi.jpg
  // ...
}

// SESUDAH (fase 2):
export type Webinar = {
  // ...
  thumbnail: string             // https://res.cloudinary.com/.../iso-9001.jpg
  speakers: { name: string; role: string; photo: string }[]  // https://drive.google.com/uc?id=...
  // ...
}
```

Tipe-nya sama. Yang berubah:
- Konvensi nilai (URL eksternal).
- Validasi runtime ringan (`assertExternalUrl(value, fieldName)` yang console.warn).
- Komentar di tipe definition: "Use absolute external URL (Cloudinary/Drive/etc). Avoid local /public/ paths."
- Sample webinar existing (`iso-9001-jan2026`, `sbu-konstruksi-feb2026`) di-update aset path-nya ke URL eksternal placeholder (atau dummy CDN — pilih satu) untuk konsistensi.

## File Tree (yang baru)

```
scripts/
  webinar-new.mjs                                # CLI generator
components/
  webinar/
    pages/
      templates/                                 # NEW
        DarkPremium.tsx
        LightProfessional.tsx
        BoldGradient.tsx
docs/
  webinar-intake.md                              # NEW — link Google Form + workflow
  webinar-pricing-template.md                    # NEW — saran pricing model
package.json                                     # NEW script: "webinar:new": "node scripts/webinar-new.mjs"
next.config.ts                                   # update — tambah remotePatterns untuk URL eksternal
lib/
  webinars.ts                                    # update — komentar tipe + validasi opsional
```

## CLI Generator — Detail

**Spec:**
```bash
npm run webinar:new
# Interactive prompts:
# ? Slug (kebab-case): leadership-mar2026
# ? Title: Leadership untuk Manager Baru
# ? Template: (dark-premium / light-professional / bold-gradient)
# ? Format: (zoom / meet / youtube-live / offline)
# ✓ Created components/webinar/pages/LeadershipMar2026.tsx
# ✓ Registered in components/webinar/pages/registry.ts
# ✓ Added entry to lib/webinars.ts (with placeholder values)
# 
# Next steps:
#   1. Edit lib/webinars.ts → fill real data + Mayar URL + asset URLs
#   2. Customize components/webinar/pages/LeadershipMar2026.tsx
#   3. Run npm run dev → preview at webinar.localhost:3000/leadership-mar2026
```

Atau non-interactive untuk skrip:
```bash
npm run webinar:new -- --slug=leadership-mar2026 --title="Leadership untuk Manager Baru" --template=dark-premium --format=zoom
```

**Implementation guide:**
- Plain Node.js + readline + fs (tidak butuh deps baru).
- Validasi slug: kebab-case, tidak duplicate dengan registry.
- Generate nama komponen dari slug (PascalCase): `leadership-mar2026` → `LeadershipMar2026`.
- Copy template file → rename, ganti placeholder nama komponen.
- Insert ke registry: parse file, append import + entry. Pakai marker comment biar idempotent (`// CLI:imports-end`, `// CLI:entries-end`).
- Insert ke `lib/webinars.ts`: append entry baru ke array `webinars`. Pakai marker comment juga.
- Jika slug sudah ada → error message yang jelas, tidak destruktif.

## Error Handling

- CLI generator: validasi semua input sebelum touch file. Kalau ada step yang gagal, rollback step sebelumnya (delete file yang baru dibuat) supaya state konsisten.
- URL eksternal yang invalid (404 saat runtime): `next/image` akan error, tapi gak crash page — error boundary di image component cukup. Optional: tambah `unoptimized={true}` fallback.
- Drive link yang gak public: gambar gak muncul. Solusi: dokumentasikan di intake form "pastikan folder Drive set public link".

## Testing

- **CLI generator**: unit test sederhana (tidak butuh, manual smoke cukup):
  - Run dengan slug baru → file ter-generate, registry + lib/webinars.ts ter-update.
  - Run dengan slug existing → error message muncul, no file changed.
  - Run dengan template yang gak ada → error message.
- **Template starter**: build production harus pass dengan ketiga template, masing-masing render tanpa error.
- **URL eksternal**: smoke test dengan URL Drive/Cloudinary asli — pastikan `next/image` render, gak ada CORS error.

## Migration Path (Webinar Existing)

Dua sample webinar yang sudah ada (`iso-9001-jan2026`, `sbu-konstruksi-feb2026`) saat ini reference path lokal `/webinar/thumbnails/...` dan `/webinar/speakers/...` yang **belum ada file aset-nya** (akan 404 di runtime).

**Pilihan:**
1. **Ganti dengan URL placeholder publik** (contoh: `https://placehold.co/800x600/...`) — paling cepat, untuk demo aja.
2. **Ganti dengan URL eksternal asli** (Cloudinary / Drive klien) — kalau klien sudah suplai.
3. **Biarkan path lokal + tambah file dummy** di `public/webinar/` — kontradiksi dengan filosofi "zero storage", tapi acceptable untuk 1-2 sample demo.

**Rekomendasi**: pakai **placehold.co** atau **picsum.photos** untuk sample webinar (URL eksternal public CDN, gratis, gak ada vendor lock-in). Dokumentasikan di sample "ini placeholder demo, ganti dengan URL aset asli".

## Roadmap (Apa yang Diskip Fase Ini)

**Fase 3 (jika dibutuhkan, jangan dikerjakan sekarang):**
- Klien edit metadata sendiri (Sanity / Sheets API live fetch / admin UI custom).
- Newsletter signup, mayar webhook, attendee tracker.
- Recording archive berbayar.
- Multi-tenant (klien lain, bukan Polakerja).

**Yang sengaja TIDAK dilakukan di fase 2:**
- Bikin admin UI dengan auth — kompleks, overkill, tambah serangan permukaan.
- Integrasi CMS apapun — tambah dependency, vendor lock-in, klien register tool baru.
- Page builder visual — hilangin USP design custom.

## Adding a New Webinar (Workflow Akhir Fase 2)

1. **Klien**: isi Google Form, upload aset ke Drive folder mereka, kirim link ke developer.
2. **Developer**:
   - `npm run webinar:new` → ikuti prompts.
   - Edit `lib/webinars.ts`: isi data dari Form result, paste URL aset Drive/Cloudinary klien.
   - Customize file komponen page sesuai mood/brief klien (atau tetap pakai template kalau cocok).
   - `npm run dev` → smoke test di `webinar.localhost:3000/[slug]`.
   - `git push` → kirim preview URL Vercel ke klien.
   - Revisi → push commit lagi.
   - Merge ke master → live.
3. **Klien**: webinar live di `webinar.polakerja.com/[slug]`, otomatis muncul di index page.

**Update minor pasca-launch**: chat → developer push commit (5 menit). Charge sesuai paket/retainer.

## Definition of Done

- [ ] `scripts/webinar-new.mjs` ada, idempotent, valid input, smoke test pass.
- [ ] Tiga starter template di `components/webinar/pages/templates/` ada, build pass dengan masing-masing.
- [ ] `package.json` punya script `"webinar:new"`.
- [ ] `lib/webinars.ts` di-update: tipe komentar URL eksternal, validasi runtime opsional, sample webinar pakai URL placeholder eksternal (placehold.co / picsum.photos).
- [ ] `next.config.ts` tambah `remotePatterns` untuk Cloudinary, Drive, placehold.co, picsum.photos.
- [ ] `docs/webinar-intake.md` ada — workflow klien intake + link Form.
- [ ] `docs/webinar-pricing-template.md` ada — saran pricing model.
- [ ] `docs/webinar-add-new.md` di-update dengan workflow fase 2 (CLI generator).
- [ ] `npm run build` pass clean.
- [ ] Smoke test manual: bikin satu webinar dummy via CLI generator, verifikasi register + render.
