'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Building2, BarChart2, Monitor, Target, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ComponentType } from 'react'
import { layananData, type Layanan as LayananType } from '@/lib/data'
import LayananModal from './LayananModal'

type IconComp = LucideIcon | ComponentType<{ size?: number; color?: string; strokeWidth?: number }>

const iconMap: Record<string, IconComp> = {
  Shield: ShieldCheck,
  FileText: Building2,
  Briefcase: BarChart2,
  Settings: Monitor,
  Users: Target,
}

export default function Layanan() {
  const [active, setActive] = useState<LayananType | null>(null)
  const ActiveIcon = active ? (iconMap[active.icon] ?? ShieldCheck) : null

  return (
    <section id="layanan" className="py-16 sm:py-24 bg-white scroll-mt-20">
      <LayananModal service={active} Icon={ActiveIcon} onClose={() => setActive(null)} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span
            className="block font-semibold uppercase"
            style={{
              color: '#1B4ED8',
              fontSize: '0.78rem',
              letterSpacing: '0.18em',
            }}
          >
            Layanan Kami
          </span>
          <h2
            className="mt-3 font-extrabold tracking-tight inline-block relative"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: '#0F172A' }}
          >
            Solusi Lengkap untuk Kebutuhan Bisnis Anda
            <span
              className="absolute left-1/2 -bottom-2 h-[3px] rounded-full"
              style={{
                width: 56,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg,#1B4ED8,#3B82F6)',
              }}
            />
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {layananData.map((s, i) => {
            const Icon = iconMap[s.icon] ?? ShieldCheck
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white flex flex-col items-center text-center"
                style={{
                  border: '1px solid #EFF2F5',
                  boxShadow:
                    '0 1px 2px rgba(15,23,42,0.03), 0 6px 16px rgba(15,23,42,0.04)',
                  padding: '1.75rem 1.25rem 1.25rem',
                }}
              >
                {/* Solid blue icon circle */}
                <div
                  className="rounded-full flex items-center justify-center mb-5"
                  style={{
                    width: 66,
                    height: 66,
                    background: '#1B4ED8',
                    boxShadow:
                      '0 6px 14px rgba(27,78,216,0.20), inset 0 1px 0 rgba(255,255,255,0.14)',
                  }}
                >
                  <Icon size={26} color="#fff" strokeWidth={2.2} />
                </div>

                <h3
                  className="font-bold mb-3"
                  style={{ color: '#0F172A', fontSize: 15.5, lineHeight: 1.25 }}
                >
                  {s.title}
                </h3>

                <ul className="flex flex-col gap-1.5 mb-5 w-full">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      style={{ color: '#64748B', fontSize: 13, lineHeight: 1.4 }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>

                <div
                  className="w-full pt-3 mt-auto"
                  style={{ borderTop: '1px solid #F1F5F9' }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(s)}
                    className="inline-flex items-center gap-1.5 font-semibold transition-colors"
                    style={{ color: '#1B4ED8', fontSize: 13 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1E40AF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#1B4ED8')}
                  >
                    Selengkapnya <ArrowRight size={14} />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
