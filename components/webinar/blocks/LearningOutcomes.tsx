import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function LearningOutcomes({
  title = 'Yang akan kamu pelajari',
  items,
  variant = 'grid',
  className,
}: { title?: string; items: string[]; variant?: 'grid' | 'list'; className?: string }) {
  return (
    <section className={cn('max-w-5xl mx-auto px-6 py-20', className)}>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
      <ul className={cn('mt-10', variant === 'grid' ? 'grid sm:grid-cols-2 gap-6' : 'space-y-4')}>
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 grid place-items-center size-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shrink-0">
              <Check className="size-3.5" />
            </span>
            <span className="text-neutral-800 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
