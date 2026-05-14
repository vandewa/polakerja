# Webinar Intake Workflow

> Untuk klien Polakerja yang mau jadwalin webinar baru di webinar.polakerja.id.

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
