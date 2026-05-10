import { Target } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function AudienceTarget({
  title = 'Untuk kamu yang…',
  items,
  className,
}: { title?: string; items: string[]; className?: string }) {
  return (
    <section className={cn('max-w-4xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <ul className="mt-8 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-neutral-800">
            <Target className="size-5 shrink-0 mt-1 text-amber-500" />
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
