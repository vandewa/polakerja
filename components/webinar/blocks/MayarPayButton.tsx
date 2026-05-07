import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
  secondary: 'bg-amber-500 text-white hover:bg-amber-600',
  ghost: 'border border-neutral-300 text-neutral-900 hover:bg-neutral-50',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function MayarPayButton({
  href,
  children = 'Daftar Sekarang',
  variant = 'primary',
  size = 'md',
  className,
}: {
  href: string
  children?: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
}) {
  if (!href) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MayarPayButton] href is empty — tombol disable.')
    }
    return (
      <span className={cn('inline-flex items-center gap-2 rounded-full opacity-50 cursor-not-allowed', variants[variant], sizes[size], className)}>
        {children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-medium transition shadow-sm hover:shadow-md',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4" />
    </a>
  )
}
