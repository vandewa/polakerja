'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type Diff = { d: number; h: number; m: number; s: number; expired: boolean }

function diff(target: number): Diff {
  const ms = target - Date.now()
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true }
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return { d, h, m, s, expired: false }
}

export default function CountdownTimer({
  endsAt,
  className,
  hideWhenExpired = true,
}: {
  endsAt: string
  className?: string
  hideWhenExpired?: boolean
}) {
  const target = new Date(endsAt).getTime()
  const [t, setT] = useState<Diff>(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (t.expired && hideWhenExpired) return null

  return (
    <div className={cn('inline-flex items-center gap-3 font-mono tabular-nums', className)}>
      <Cell value={t.d} label="hari" />
      <span className="text-neutral-400">:</span>
      <Cell value={t.h} label="jam" />
      <span className="text-neutral-400">:</span>
      <Cell value={t.m} label="menit" />
      <span className="text-neutral-400">:</span>
      <Cell value={t.s} label="detik" />
    </div>
  )
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-medium">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</span>
    </div>
  )
}
