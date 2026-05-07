import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWebinarBySlug, webinars } from '@/lib/webinars'
import { webinarPages } from '@/components/webinar/pages/registry'

type Params = Promise<{ slug: string }>

export const generateStaticParams = () => webinars.map((w) => ({ slug: w.slug }))

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const w = getWebinarBySlug(slug)
  if (!w) return {}
  return {
    title: w.title,
    description: w.description,
    openGraph: {
      title: w.title,
      description: w.description,
      images: [w.thumbnail],
      type: 'website',
    },
  }
}

export default async function WebinarDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const webinar = getWebinarBySlug(slug)
  const Page = webinarPages[slug]
  if (!webinar || !Page) notFound()

  const eventEnd = new Date(
    new Date(webinar.startsAt).getTime() + webinar.durationMinutes * 60_000,
  ).toISOString()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: webinar.title,
    description: webinar.description,
    startDate: webinar.startsAt,
    endDate: eventEnd,
    eventAttendanceMode:
      webinar.format === 'offline'
        ? 'https://schema.org/OfflineEventAttendanceMode'
        : 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location:
      webinar.format === 'offline'
        ? { '@type': 'Place', name: 'Lokasi tertera di tiket' }
        : { '@type': 'VirtualLocation', url: webinar.mayarUrl },
    performer: webinar.speakers.map((s) => ({ '@type': 'Person', name: s.name })),
    offers: {
      '@type': 'Offer',
      url: webinar.mayarUrl,
      price: webinar.earlyBirdPrice ?? webinar.price,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
    },
    image: webinar.thumbnail,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Page webinar={webinar} />
    </>
  )
}
