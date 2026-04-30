'use client'
import { motion } from 'framer-motion'
import { MessageCircle, ClipboardList, Zap, Search, Award } from 'lucide-react'
import { prosesData } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  MessageCircle, ClipboardList, Zap, Search, Award,
}

const stepColors = ['#1B4ED8', '#7C3AED', '#059669', '#D97706', '#DC2626']

export default function Proses() {
  return (
    <section id="proses" className="py-28" style={{ background: '#F8FAFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-18">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-bold text-sm uppercase tracking-[0.18em] mb-4"
            style={{ color: '#1B4ED8' }}
          >
            Proses Kami
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="font-extrabold text-gray-900"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontFamily: 'Syne, sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Pendekatan Sistematis,<br />Hasil Optimal
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute z-0"
            style={{
              top: '40px',
              left: 'calc(10% + 40px)',
              right: 'calc(10% + 40px)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #DBEAFE 10%, #BFDBFE 50%, #DBEAFE 90%, transparent)',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {prosesData.map((item, i) => {
              const Icon = iconMap[item.icon]
              const color = stepColors[i]

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  {/* Circle icon */}
                  <div
                    className="relative flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#fff',
                      border: `2px solid ${color}22`,
                      boxShadow: `0 4px 20px ${color}18`,
                    }}
                  >
                    {/* Step number badge */}
                    <span
                      className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white font-bold text-xs"
                      style={{ width: '22px', height: '22px', background: color, fontSize: '0.65rem' }}
                    >
                      {item.step}
                    </span>
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{ width: '52px', height: '52px', background: `${color}12` }}
                    >
                      <Icon size={22} style={{ color }} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color }}
                    >
                      Langkah {item.step}
                    </p>
                    <h3
                      className="font-bold text-gray-900 mb-2"
                      style={{ fontSize: '0.95rem', fontFamily: 'Syne, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
