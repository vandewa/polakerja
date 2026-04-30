'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData } from '@/lib/data'
import { FolderCheck, Users, TrendingUp, Clock } from 'lucide-react'

const statIcons = [FolderCheck, Users, TrendingUp, Clock]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start = Math.min(start + step, value)
      setCount(start)
      if (start >= value) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="font-extrabold text-white" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', lineHeight: 1 }}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2040 0%, #1E3A5F 50%, #162D4A 100%)' }}
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#93C5FD' }}>
            Pencapaian Kami
          </p>
          <h2
            className="font-extrabold text-white"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Kepercayaan Klien adalah Bukti Nyata
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {statsData.map((item, i) => {
            const Icon = statIcons[i]
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative flex flex-col gap-3 px-8 py-8"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-1"
                  style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.15)' }}
                >
                  <Icon size={18} style={{ color: '#60A5FA' }} strokeWidth={1.8} />
                </div>

                <Counter value={item.value} suffix={item.suffix} />

                <div>
                  <p className="font-bold text-white mb-1" style={{ fontSize: '0.95rem' }}>{item.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(147,197,253,0.55)' }}>{item.description}</p>
                </div>

                {/* Hover accent line (left) */}
                <div
                  className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full opacity-0 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(180deg, transparent, #3B82F6, transparent)' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
