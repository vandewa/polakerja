import type { MetadataRoute } from 'next'
import { webinars } from '@/lib/webinars'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://webinar.polakerja.com'
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    ...webinars.map((w) => ({
      url: `${base}/${w.slug}`,
      lastModified: new Date(w.startsAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
