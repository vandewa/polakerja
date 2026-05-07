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
  return <Page webinar={webinar} />
}
