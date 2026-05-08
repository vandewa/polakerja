'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Building2, BarChart2, Monitor, Target, X, Check, ArrowRight } from 'lucide-react'
import { layananData, whatsappConsultUrl } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  Shield: ShieldCheck,
  FileText: Building2,
  Briefcase: BarChart2,
  Settings: Monitor,
  Users: Target,
}

export default function Layanan() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = layananData.find((l) => l.id === openId) ?? null

  // Lock body scroll & close on Esc
  useEffect(() => {
    if (!openId) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [openId])

  return (
    <section id="layanan" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#1B4ED8] font-semibold text-sm uppercase tracking-widest mb-3">Layanan Kami</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Solusi Lengkap untuk Kebutuhan Bisnis Anda</h2>
          <div className="w-12 h-1 bg-[#1B4ED8] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {layananData.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 transition-shadow"
              >
                <div className="w-16 h-16 bg-[#1B4ED8] rounded-full flex items-center justify-center shadow-md shadow-blue-200">
                  <Icon size={26} className="text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {item.items.map((sub) => (
                    <li key={sub} className="text-gray-500 text-sm">{sub}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className="text-[#1B4ED8] text-sm font-semibold mt-auto text-left hover:underline"
                >
                  Selengkapnya →
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="layanan-modal-title"
          >
            <button
              type="button"
              aria-label="Tutup detail layanan"
              onClick={() => setOpenId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header band */}
              <div
                className="relative px-6 sm:px-8 py-7 text-white"
                style={{ background: 'linear-gradient(135deg, #1B4ED8 0%, #1E40AF 100%)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  aria-label="Tutup"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.28)' }}
                  >
                    {(() => {
                      const Icon = iconMap[open.icon]
                      return <Icon size={26} className="text-white" strokeWidth={1.6} />
                    })()}
                  </div>
                  <div>
                    <p className="text-blue-100 text-xs uppercase tracking-widest font-semibold mb-1">Layanan</p>
                    <h3 id="layanan-modal-title" className="text-xl sm:text-2xl font-extrabold leading-tight">
                      {open.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 sm:px-8 py-6 sm:py-7">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px] mb-6">{open.description}</p>

                {/* Benefits */}
                <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-3">Mengapa memilih kami</h4>
                <ul className="grid sm:grid-cols-2 gap-2.5 mb-7">
                  {open.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span
                        className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: '#EFF6FF', color: '#1B4ED8' }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Item details */}
                <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-3">Yang kami tangani</h4>
                <div className="flex flex-col gap-3">
                  {open.itemDetails.map((d) => (
                    <div
                      key={d.name}
                      className="rounded-xl border border-gray-100 px-4 py-3.5 hover:border-blue-200 transition-colors"
                      style={{ background: '#F8FAFC' }}
                    >
                      <p className="font-bold text-gray-900 text-sm mb-1">{d.name}</p>
                      <p className="text-gray-500 text-[13px] leading-relaxed">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                <p className="text-xs text-gray-500">Butuh konsultasi langsung? Tim kami siap membantu.</p>
                <a
                  href={whatsappConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-xl text-sm whitespace-nowrap transition-transform hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)',
                    boxShadow: '0 10px 24px rgba(27,78,216,0.30)',
                  }}
                >
                  Konsultasi Gratis Sekarang <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
