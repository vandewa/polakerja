'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData } from '@/lib/data'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(value / (1600 / 16))
    const timer = setInterval(() => {
      start = Math.min(start + step, value)
      setCount(start)
      if (start >= value) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#080E18' }}>
      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statsData.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="px-8 lg:px-12 py-20 flex flex-col"
              style={{
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              {/* Giant number — thin weight, Cormorant */}
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(4rem, 7vw, 6.5rem)',
                  lineHeight: 1,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                }}
              >
                <Counter value={item.value} suffix={item.suffix} />
              </div>

              {/* Thin blue rule */}
              <div
                className="my-5 w-8 h-px"
                style={{ background: 'linear-gradient(90deg, #3B82F6, transparent)' }}
              />

              {/* Label */}
              <p className="font-semibold text-white mb-2" style={{ fontSize: '0.9rem' }}>
                {item.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
