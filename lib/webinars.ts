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
