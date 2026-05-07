import Image from 'next/image'
import { Calendar, Clock, Video } from 'lucide-react'
import MayarPayButton from './MayarPayButton'
import CountdownTimer from './CountdownTimer'
import { cn } from '@/lib/cn'

const formatLabels = { zoom: 'Zoom', meet: 'Google Meet', 'youtube-live': 'YouTube Live', offline: 'Offline' } as const

const dateFmt = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta',
})

export default function WebinarHero({
  title,
  subtitle,
  startsAt,
  durationMinutes,
  format,
  mayarUrl,
  bgImage,
  bgVideo,
  showCountdown = true,
  className,
}: {
  title: string
  subtitle?: string
  startsAt: string
  durationMinutes: number
  format: keyof typeof formatLabels
  mayarUrl: string
  bgImage?: string
  bgVideo?: string
  showCountdown?: boolean
  className?: string
}) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {bgVideo && (
        <video src={bgVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      )}
      {bgImage && !bgVideo && (
        <Image src={bgImage} alt="" fill priority className="object-cover" />
      )}
      {(bgImage || bgVideo) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      )}

      <div className={cn(
        'relative max-w-5xl mx-auto px-6 py-24 md:py-32',
        bgImage || bgVideo ? 'text-white' : 'text-neutral-900',
      )}>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest opacity-80">
          <span className="inline-flex items-center gap-1.5"><Video className="size-3.5" /> {formatLabels[format]}</span>
          <span className="opacity-50">•</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {durationMinutes} menit</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl opacity-80 max-w-2xl">{subtitle}</p>}

        <div className="mt-8 flex items-center gap-2 text-sm opacity-90">
          <Calendar className="size-4" />
          {dateFmt.format(new Date(startsAt))} WIB
        </div>

        {showCountdown && (
          <div className="mt-6">
            <CountdownTimer endsAt={startsAt} />
          </div>
        )}

        <div className="mt-10">
          <MayarPayButton href={mayarUrl} size="lg" variant="secondary">
            Daftar Sekarang
          </MayarPayButton>
        </div>
      </div>
    </section>
  )
}
