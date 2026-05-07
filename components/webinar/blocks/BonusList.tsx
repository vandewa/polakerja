import * as Lucide from 'lucide-react'
import { cn } from '@/lib/cn'

export type BonusItem = { icon: keyof typeof Lucide; label: string; description?: string }

export default function BonusList({
  title = 'Fasilitas & Bonus',
  items,
  className,
}: { title?: string; items: BonusItem[]; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((b, i) => {
          const Icon = (Lucide[b.icon] as React.ComponentType<{ className?: string }>) ?? Lucide.Sparkles
          return (
            <div key={i} className="rounded-2xl border border-neutral-200 p-5 bg-white">
              <Icon className="size-6 text-amber-500" />
              <div className="mt-3 font-medium">{b.label}</div>
              {b.description && <p className="mt-1 text-sm text-neutral-600">{b.description}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
