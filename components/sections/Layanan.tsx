'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Building2, BarChart2, Monitor, Target } from 'lucide-react'
import { layananData, WA_LINK } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  Shield: ShieldCheck,
  FileText: Building2,
  Briefcase: BarChart2,
  Settings: Monitor,
  Users: Target,
}

const accentColors = [
  { bg: 'rgba(27,78,216,0.08)', icon: '#1B4ED8', border: 'rgba(27,78,216,0.15)' },
  { bg: 'rgba(16,185,129,0.08)', icon: '#059669', border: 'rgba(16,185,129,0.15)' },
  { bg: 'rgba(139,92,246,0.08)', icon: '#7C3AED', border: 'rgba(139,92,246,0.15)' },
  { bg: 'rgba(245,158,11,0.08)', icon: '#D97706', border: 'rgba(245,158,11,0.15)' },
  { bg: 'rgba(239,68,68,0.08)', icon: '#DC2626', border: 'rgba(239,68,68,0.15)' },
]

export default function Layanan() {
  return (
    <section id="layanan" className="py-28" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p
              className="font-bold text-sm uppercase tracking-[0.18em] mb-4"
              style={{ color: '#1B4ED8' }}
            >
              Layanan Kami
            </p>
            <h2
              className="font-extrabold text-gray-900 leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Solusi Lengkap untuk<br />
              Kebutuhan Bisnis Anda
            </h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed lg:max-w-xs lg:text-right">
            Dari sertifikasi internasional hingga legalitas perizinan — kami tangani semuanya untuk Anda.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {layananData.map((item, i) => {
            const Icon = iconMap[item.icon]
            const accent = accentColors[i % accentColors.length]
            const num = String(i + 1).padStart(2, '0')

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-7 flex flex-col gap-5 cursor-pointer overflow-hidden"
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 16px 48px rgba(27,78,216,0.12)'
                  el.style.borderColor = accent.border
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  el.style.borderColor = '#E5E7EB'
                }}
              >
                {/* Faded number background */}
                <span
                  className="absolute top-4 right-5 font-extrabold select-none pointer-events-none"
                  style={{
                    fontSize: '4.5rem',
                    color: 'rgba(0,0,0,0.04)',
                    fontFamily: 'Syne, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>

                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{ width: '52px', height: '52px', background: accent.bg, border: `1px solid ${accent.border}` }}
                >
                  <Icon size={22} style={{ color: accent.icon }} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-gray-900"
                  style={{ fontSize: '1.05rem', fontFamily: 'Syne, sans-serif' }}
                >
                  {item.title}
                </h3>

                {/* Service tags */}
                <div className="flex flex-wrap gap-2 flex-grow">
                  {item.items.map((sub) => (
                    <span
                      key={sub}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: '#F3F4F6', color: '#6B7280' }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
                  style={{ color: accent.icon }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Konsultasi Sekarang
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
