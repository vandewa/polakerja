import { cn } from '@/lib/cn'

export type AgendaItem = { time: string; title: string; description?: string }

export default function AgendaTimeline({
  title = 'Agenda Sesi',
  items,
  className,
}: { title?: string; items: AgendaItem[]; className?: string }) {
  return (
    <section className={cn('max-w-3xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <ol className="mt-10 relative border-l border-neutral-200 ml-4 space-y-8">
        {items.map((it, i) => (
          <li key={i} className="pl-8 relative">
            <span className="absolute -left-2.5 top-1 size-5 rounded-full bg-neutral-900 text-white text-[10px] grid place-items-center">
              {i + 1}
            </span>
            <div className="text-xs uppercase tracking-widest text-neutral-500">{it.time}</div>
            <div className="mt-1 text-lg font-medium">{it.title}</div>
            {it.description && <p className="mt-1 text-neutral-600">{it.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}
