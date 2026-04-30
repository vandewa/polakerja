'use client'
import { motion } from 'framer-motion'
import { prosesData } from '@/lib/data'

export default function Proses() {
  return (
    <section id="proses" className="py-28 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 pb-12 border-b border-gray-100 mb-0"
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] shrink-0"
            style={{ color: '#1B4ED8' }}
          >
            Proses Kami
          </span>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
          >
            Pendekatan Sistematis,<br />Hasil Optimal
          </h2>
        </motion.div>

        {/* Steps — editorial list rows */}
        <div className="divide-y divide-gray-100">
          {prosesData.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-[68px_1fr] lg:grid-cols-[68px_220px_1fr] items-start gap-6 lg:gap-10 py-10"
            >
              {/* Step number */}
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300,
                  fontSize: '3rem',
                  lineHeight: 1,
                  color: '#1B4ED8',
                  opacity: 0.35,
                }}
              >
                {String(item.step).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 600,
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  lineHeight: 1.25,
                  color: '#111827',
                  paddingTop: '4px',
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed col-span-2 lg:col-span-1 lg:pt-1 pl-[76px] lg:pl-0"
                style={{ color: '#6B7280' }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
