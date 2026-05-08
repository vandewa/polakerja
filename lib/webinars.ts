export type WebinarStatus = 'upcoming' | 'live' | 'past'

export type Speaker = {
  name: string
  role: string
  /** Absolute external URL only (Cloudinary/Drive/placehold.co). Avoid local /public/ paths to keep storage cost zero. */
  photo: string
}

export type Webinar = {
  slug: string
  title: string
  subtitle?: string
  description: string
  /** Absolute external URL only (Cloudinary/Drive/picsum/placehold). 1200x630 recommended. */
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
    thumbnail: 'https://picsum.photos/seed/iso-9001-jan2026/1200/630',
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
        photo: 'https://placehold.co/400x400/0F172A/FFFFFF?text=DW',
      },
    ],
    category: 'iso',
  },
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

export const getWebinarStatus = (w: Webinar, now: Date = new Date()): WebinarStatus => {
  const start = new Date(w.startsAt).getTime()
  const end = start + w.durationMinutes * 60_000
  const t = now.getTime()
  if (t < start) return 'upcoming'
  if (t <= end) return 'live'
  return 'past'
}

export const getUpcomingWebinars = (now: Date = new Date()): Webinar[] =>
  webinars
    .filter((w) => {
      const status = getWebinarStatus(w, now)
      return status === 'upcoming' || status === 'live'
    })
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())

export const getPastWebinars = (now: Date = new Date()): Webinar[] =>
  webinars
    .filter((w) => getWebinarStatus(w, now) === 'past')
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime())

export const getWebinarBySlug = (slug: string): Webinar | undefined =>
  webinars.find((w) => w.slug === slug)

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
