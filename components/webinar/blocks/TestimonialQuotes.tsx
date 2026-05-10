import Image from 'next/image'
import { cn } from '@/lib/cn'

export type TestimonialItem = { quote: string; name: string; role: string; photo?: string }

export default function TestimonialQuotes({
  title = 'Apa kata peserta lampau',
  items, className,
}: { title?: string; items: TestimonialItem[]; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {items.map((t, i) => (
          <figure key={i} className="rounded-2xl border border-neutral-200 p-6 bg-white">
            <blockquote className="text-neutral-800 leading-relaxed">
              <span className="text-3xl text-neutral-300 leading-none">“</span>
              {t.quote}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              {t.photo && <Image src={t.photo} alt={t.name} width={40} height={40} className="rounded-full" />}
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-neutral-600">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
