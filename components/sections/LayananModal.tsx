'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ArrowRight, Sparkles, ShieldCheck, ListChecks } from 'lucide-react'
import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'
import { whatsappConsultUrl, type Layanan } from '@/lib/data'

type IconComp = LucideIcon | ComponentType<{ size?: number; color?: string; strokeWidth?: number }>

type Props = {
  service: Layanan | null
  Icon: IconComp | null
  onClose: () => void
}

export default function LayananModal({ service, Icon, onClose }: Props) {
  useEffect(() => {
    if (!service) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [service, onClose])

  return (
    <AnimatePresence>
      {service && Icon && (
        <motion.div
          key="layanan-modal"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="absolute inset-0"
            style={{
              background: 'rgba(15,23,42,0.55)',
              backdropFilter: 'blur(8px) saturate(140%)',
              WebkitBackdropFilter: 'blur(8px) saturate(140%)',
            }}
          />

          {/* Card */}
          <motion.div
            key={service.id}
            className="relative w-full sm:max-w-2xl lg:max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl"
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              boxShadow:
                '0 30px 80px rgba(15,23,42,0.30), 0 12px 32px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(15,23,42,0.06)',
            }}
          >
            {/* Header banner */}
            <div
              className="relative px-6 sm:px-8 pt-7 pb-6 overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #0B1B4E 0%, #1E3A8A 28%, #1E40AF 58%, #1B4ED8 100%)',
              }}
            >
              {/* decorative orbs */}
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 220,
                  height: 220,
                  right: -40,
                  top: -60,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(closest-side, rgba(147,197,253,0.45), rgba(147,197,253,0))',
                }}
              />
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 160,
                  height: 160,
                  left: -30,
                  bottom: -50,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(closest-side, rgba(59,130,246,0.30), rgba(59,130,246,0))',
                }}
              />

              <div className="relative flex items-start gap-4">
                <div
                  className="rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    width: 60,
                    height: 60,
                    background: 'rgba(255,255,255,0.16)',
                    border: '1px solid rgba(255,255,255,0.30)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.30)',
                  }}
                >
                  <Icon size={28} color="#fff" strokeWidth={2.2} />
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-2 px-2.5 py-1 rounded-full"
                    style={{
                      color: '#EFF6FF',
                      background: 'rgba(255,255,255,0.14)',
                      border: '1px solid rgba(255,255,255,0.22)',
                    }}
                  >
                    <Sparkles size={11} />
                    Layanan Polakerja
                  </span>
                  <h2
                    className="font-extrabold leading-tight"
                    style={{
                      color: '#fff',
                      fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {service.title}
                  </h2>
                  <p
                    className="mt-1.5 leading-relaxed"
                    style={{ color: 'rgba(239,246,255,0.92)', fontSize: 14 }}
                  >
                    {service.detail.tagline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup modal"
                  className="shrink-0 rounded-full flex items-center justify-center transition-all"
                  style={{
                    width: 38,
                    height: 38,
                    background: 'rgba(255,255,255,0.16)',
                    border: '1px solid rgba(255,255,255,0.28)',
                    color: '#fff',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.28)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.16)'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 py-7">
              <p
                className="leading-relaxed"
                style={{ color: '#475569', fontSize: 14.5 }}
              >
                {service.detail.description}
              </p>

              {/* Mengapa memilih kami */}
              <div className="mt-7">
                <SectionLabel icon={<ShieldCheck size={14} />} text="Mengapa Memilih Kami" />
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.detail.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5"
                      style={{ color: '#334155', fontSize: 13.5, lineHeight: 1.5 }}
                    >
                      <span
                        className="mt-0.5 shrink-0 rounded-full flex items-center justify-center"
                        style={{
                          width: 20,
                          height: 20,
                          background: '#EFF6FF',
                          color: '#1E40AF',
                          border: '1px solid rgba(30,64,175,0.18)',
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Yang kami tangani */}
              <div className="mt-7">
                <SectionLabel icon={<ListChecks size={14} />} text="Yang Kami Tangani" />
                <div className="mt-3 flex flex-col gap-2.5">
                  {service.detail.itemDetails.map((d) => (
                    <div
                      key={d.name}
                      className="rounded-xl px-4 py-3.5 transition-colors"
                      style={{
                        background: '#F8FAFC',
                        border: '1px solid #EFF2F5',
                      }}
                    >
                      <div
                        className="font-bold mb-0.5"
                        style={{ color: '#0F172A', fontSize: 13.5 }}
                      >
                        {d.name}
                      </div>
                      <div
                        style={{ color: '#64748B', fontSize: 12.5, lineHeight: 1.55 }}
                      >
                        {d.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cocok Untuk */}
              <div className="mt-7">
                <SectionLabel icon={<Sparkles size={14} />} text="Cocok Untuk" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.detail.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-[12.5px] font-semibold"
                      style={{
                        background: '#EFF6FF',
                        color: '#1E40AF',
                        border: '1px solid rgba(30,64,175,0.18)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div
              className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
              style={{
                borderTop: '1px solid #EFF2F5',
                background:
                  'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
              }}
            >
              <div className="text-[13px]" style={{ color: '#64748B' }}>
                Diskusi singkat 15 menit untuk memetakan kebutuhan Anda.
              </div>
              <a
                href={whatsappConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold rounded-xl whitespace-nowrap transition-transform hover:scale-[1.02]"
                style={{
                  padding: '0.7rem 1.1rem',
                  fontSize: 13.5,
                  background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)',
                  boxShadow: '0 10px 24px rgba(27,78,216,0.30)',
                }}
              >
                Konsultasi Gratis Sekarang <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
      style={{ color: '#1E40AF' }}
    >
      <span
        aria-hidden
        className="inline-flex items-center justify-center rounded-md"
        style={{
          width: 22,
          height: 22,
          background: '#EFF6FF',
          color: '#1E40AF',
          border: '1px solid rgba(30,64,175,0.18)',
        }}
      >
        {icon}
      </span>
      {text}
    </div>
  )
}
