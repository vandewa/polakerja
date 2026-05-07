import Image from 'next/image'
import { cn } from '@/lib/cn'

export type SpeakerCardData = {
  name: string
  role: string
  photo: string
  bio?: string
  credentials?: string[]
}

export default function SpeakerCard({
  speakers,
  title = 'Pembicara',
  className,
}: { speakers: SpeakerCardData[]; title?: string; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <div className={cn('mt-10 grid gap-8', speakers.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1')}>
        {speakers.map((s, i) => (
          <article key={i} className="flex items-start gap-5">
            <Image src={s.photo} alt={s.name} width={120} height={120} className="rounded-2xl object-cover w-28 h-28 shrink-0" />
            <div>
              <h3 className="text-xl font-medium">{s.name}</h3>
              <p className="text-neutral-600">{s.role}</p>
              {s.bio && <p className="mt-3 text-neutral-700 leading-relaxed">{s.bio}</p>}
              {s.credentials?.length ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.credentials.map((c) => (
                    <li key={c} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">{c}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
