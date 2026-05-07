import { cn } from '@/lib/cn'
export default function WebinarPitch({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('max-w-3xl mx-auto px-6 py-20', className)}>
      <div className="prose prose-neutral max-w-none text-lg leading-relaxed">{children}</div>
    </section>
  )
}
