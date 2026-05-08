'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Users, ShieldCheck, Clock } from 'lucide-react'
import { statsData } from '@/lib/data'

const statIcons = [Trophy, Users, ShieldCheck, Clock]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(value / (1500 / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl sm:rounded-3xl relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #1B4ED8 0%, #1E40AF 50%, #1B4ED8 100%)',
            boxShadow:
              '0 30px 80px -20px rgba(27,78,216,0.45), 0 10px 40px rgba(27,78,216,0.22)',
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 gap-y-8 sm:gap-y-10">
            {statsData.map((item, i) => {
              const Icon = statIcons[i]
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex flex-col items-center text-center px-2 sm:px-4 lg:px-6 ${
                    i > 0 ? 'lg:border-l-2 lg:border-white/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon size={22} className="text-white/85 sm:hidden" strokeWidth={1.8} />
                    <Icon size={30} className="text-white/85 hidden sm:block" strokeWidth={1.8} />
                    <Counter value={item.value} suffix={item.suffix} />
                  </div>
                  <p className="text-white font-semibold text-sm sm:text-base mt-2 mb-1 sm:mb-2">{item.label}</p>
                  <p className="text-blue-100/80 text-xs sm:text-sm leading-relaxed max-w-[240px]">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
