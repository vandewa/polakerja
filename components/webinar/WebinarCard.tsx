import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Video } from 'lucide-react'
import type { Webinar } from '@/lib/webinars'
import { getWebinarStatus } from '@/lib/webinars'
import { cn } from '@/lib/cn'

const dateFmt = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric', month: 'short', year: 'numeric',
})

const formatLabel = { zoom: 'Zoom', meet: 'Meet', 'youtube-live': 'YouTube Live', offline: 'Offline' } as const

export default function WebinarCard({ webinar, className }: { webinar: Webinar; className?: string }) {
  const status = getWebinarStatus(webinar)
  const isPast = status === 'past'
  return (
    <Link
      href={`/${webinar.slug}`}
      className={cn(
        'group rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:shadow-md hover:-translate-y-0.5 transition',
        className,
      )}
    >
      <div className="relative aspect-[16/9] bg-neutral-100">
        <Image src={webinar.thumbnail} alt={webinar.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {isPast && webinar.recordingUrl && (
          <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-neutral-800">
            Recording tersedia
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest">
          <Calendar className="size-3.5" />
          {dateFmt.format(new Date(webinar.startsAt))}
          <span>•</span>
          <Video className="size-3.5" />
          {formatLabel[webinar.format]}
        </div>
        <h3 className="mt-3 text-lg font-medium leading-snug">{webinar.title}</h3>
        {webinar.subtitle && <p className="mt-1 text-sm text-neutral-600">{webinar.subtitle}</p>}
      </div>
    </Link>
  )
}
