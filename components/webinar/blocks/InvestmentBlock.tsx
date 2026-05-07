import MayarPayButton from './MayarPayButton'
import CountdownTimer from './CountdownTimer'
import { cn } from '@/lib/cn'

const idr = (n: number) =>
  n === 0 ? 'Gratis' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function InvestmentBlock({
  price, earlyBirdPrice, earlyBirdEndsAt, mayarUrl, className,
}: {
  price: number
  earlyBirdPrice?: number
  earlyBirdEndsAt?: string
  mayarUrl: string
  className?: string
}) {
  const earlyActive = !!(earlyBirdPrice && earlyBirdEndsAt && new Date(earlyBirdEndsAt).getTime() > Date.now())
  const display = earlyActive ? earlyBirdPrice! : price
  return (
    <section className={cn('max-w-2xl mx-auto px-6 py-20', className)}>
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 text-center shadow-sm">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Investasi</p>
        <div className="mt-3 flex items-baseline justify-center gap-3">
          {earlyActive && <span className="text-neutral-400 line-through text-2xl">{idr(price)}</span>}
          <span className="text-5xl font-medium">{idr(display)}</span>
        </div>
        {earlyActive && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-widest text-amber-600">Early bird berakhir dalam</p>
            <div className="mt-2 flex justify-center"><CountdownTimer endsAt={earlyBirdEndsAt!} /></div>
          </div>
        )}
        <div className="mt-8">
          <MayarPayButton href={mayarUrl} size="lg" variant="primary">Daftar Sekarang</MayarPayButton>
        </div>
      </div>
    </section>
  )
}
