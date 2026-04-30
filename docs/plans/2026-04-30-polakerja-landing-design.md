# Polakerja Landing Page — Design Document
Date: 2026-04-30

## Overview

Single-page landing page for **Polakerja Consulting** — perusahaan konsultan ISO & Legalitas Indonesia. Dibangun dengan Next.js 16 App Router, Tailwind CSS v4, dan Framer Motion. Deploy ke Vercel.

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Images | next/image + Unsplash (placeholder) |
| Deployment | Vercel |

## Color System

| Token | Hex |
|---|---|
| Primary Blue | `#1B4ED8` |
| Dark Navy | `#1E3A5F` |
| White | `#FFFFFF` |
| Text Gray | `#4B5563` |
| Light Blue (accent) | `#EFF6FF` |

Font: **Inter** via Google Fonts

## Project Structure

```
polakerja/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Layanan.tsx
│       ├── Stats.tsx
│       ├── Proses.tsx
│       ├── TentangKami.tsx
│       ├── Testimoni.tsx
│       └── CTA.tsx
├── lib/
│   └── data.ts
└── public/
    └── logo.svg
```

## Sections

### 1. Navbar
- Logo kiri, menu tengah (Beranda, Layanan, Tentang Kami, Blog, Kontak), CTA button kanan
- Sticky dengan shadow muncul saat scroll
- Mobile: hamburger menu

### 2. Hero
- Background: foto gedung pencakar langit (Unsplash)
- Headline: "Bangun Sistem. Pastikan Kepatuhan. **Dorong Pertumbuhan.**" (kata terakhir biru)
- Subtext & 3 trust badge
- 2 CTA: "Konsultasi Gratis" (solid) & "Lihat Layanan →" (outline)
- Floating card kanan: "Solusi Tepat untuk Bisnis yang Ingin Tumbuh & Berkelanjutan"
- Animasi: fade-in + slide-up on load

### 3. Layanan Kami
- Title: "Solusi Lengkap untuk Kebutuhan Bisnis Anda"
- 5 card dengan icon, judul, list item, link "Selengkapnya →"
  1. Sertifikasi ISO (ISO 9001, 14001, 45001, 37001)
  2. Legalitas & Perizinan (Pendirian Perusahaan, Perizinan Akta, NIB & OSS, NIV Online)
  3. SBU & SKK (Konsultansi, Non Konsultansi, SKK Konstruksi)
  4. Sistem Manajemen (Penyusunan Dokumen, Implementasi, Internal Audit, Management Review)
  5. Pendampingan (Audit Sertifikasi, Audit Eksternal, Perbaikan CAPA, Training & Workshop)
- Animasi: staggered fade-up per card

### 4. Stats (Navy Background)
- 4 kolom: 150+ Proyek Selesai | 100+ Klien Puas | 98% Tingkat Keberhasilan | 10+ Tahun Pengalaman
- Animasi: counter increment on scroll entry

### 5. Proses Kami
- Title: "Pendekatan Sistematis, Hasil Optimal"
- 5 langkah horizontal dengan icon dan connector line:
  1. Konsultasi Awal
  2. Analisis & Perencanaan
  3. Implementasi
  4. Audit & Evaluasi
  5. Sertifikasi & Perizinan
- Animasi: fade-in kiri ke kanan (staggered)

### 6. Tentang Kami
- Title: "Mengapa Memilih Polakerja Consulting?"
- Kiri: teks + 5 bullet point + CTA button "Selengkapnya Tentang Kami →"
- Kanan: foto meeting tim (Unsplash) + overlay badge + tagline
- Badge bawah: Profesional | Terpercaya | Berkelanjutan
- Animasi: slide-in dari kiri & kanan

### 7. Testimoni
- Title: "Kepercayaan Mereka, Prioritas Kami" + garis biru dekorasi
- 3 card quote dengan icon " biru
  1. Andi Pratama — Direktur Operasional, PT. Maju Bersama
  2. Risa Kumiwati — Project Manager, PT. Cipta Karya
  3. Budi Santoso — Direktur Utama, PT. Solusi Prima
- Dot navigation di bawah
- Animasi: fade-in

### 8. CTA Section
- Background biru solid
- "Siap Meningkatkan Sistem dan Kepatuhan Bisnis Anda?"
- Subtext + tombol putih "Konsultasi Gratis Sekarang →"
- Animasi: fade-in

### 9. Footer
- Logo + tagline kiri
- 3 kolom link: Layanan, Perusahaan, Kontak Kami
- Sosial media icons
- Copyright + Privacy Policy + "Part of Pola Group"

## Animations Strategy

- **Scroll-triggered**: semua section menggunakan `whileInView` Framer Motion dengan `once: true`
- **Stagger**: card dan list item muncul berurutan dengan delay 0.1s per item
- **Counter**: stats angka increment dari 0 menggunakan `useMotionValue` + `useTransform`
- **Hover**: card layanan naik sedikit (`y: -4`) dengan shadow lebih dalam
- **Navbar**: `useScroll` untuk deteksi scroll, tambah shadow dan bg-white/95 backdrop

## Images

- Hero background: Unsplash foto gedung/skyline (keyword: "skyscraper blue glass building")
- Tentang Kami: Unsplash foto business meeting (keyword: "business meeting professional")
- Logo: dari client (`/public/logo.svg`)
- Icon services: Lucide React icons
