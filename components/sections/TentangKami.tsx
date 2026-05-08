'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { UserCheck, ShieldCheck, Leaf } from 'lucide-react'
import { tentangPoints, tentangPillars, whatsappConsultUrl } from '@/lib/data'

const pillarIconMap: Record<string, React.ElementType> = {
  UserCheck,
  ShieldCheck,
  Leaf,
}

const GradientCheck = () => (
  <span
    className="flex items-center justify-center rounded-full shrink-0"
    style={{
      width: '20px',
      height: '20px',
      background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)',
    }}
  >
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M2 5.5l2.8 2.8L9 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

export default function TentangKami() {
  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5 items-center">

          {/* ── Left column — text & CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <p className="text-[#1B4ED8] font-semibold text-xs uppercase tracking-[0.25em]">
              Tentang Kami
            </p>

            <h2
              className="mt-3 font-extrabold text-gray-900 leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.2rem)' }}
            >
              Mengapa Memilih<br />Polakerja Consulting?
            </h2>

            <p
              className="mt-4 text-gray-500 leading-relaxed"
              style={{ fontSize: 14.5, maxWidth: 460 }}
            >
              Kami bukan hanya konsultan, tapi partner strategis yang berkomitmen
              membantu bisnis Anda tumbuh secara terstruktur, patuh terhadap regulasi,
              dan siap bersaing di level yang lebih tinggi.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {tentangPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-gray-800"
                  style={{ fontSize: 14 }}
                >
                  <GradientCheck />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm mt-7 transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)' }}
            >
              Selengkapnya Tentang Kami →
            </a>
          </motion.div>

          {/* ── Center column — photo card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden"
            style={{
              minHeight: 380,
              boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
              border: '1px solid #E2E8F0',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85&auto=format&fit=crop"
              alt="Tim Polakerja Consulting"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              unoptimized
            />
          </motion.div>

          {/* ── Right column — blue feature panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 relative rounded-2xl text-white overflow-hidden"
            style={{
              minHeight: 380,
              padding: '1.75rem 1.5rem',
              background: 'linear-gradient(135deg, #1B4ED8 0%, #1E40AF 100%)',
              boxShadow: '0 18px 40px rgba(27,78,216,0.25)',
            }}
          >
            <h3
              className="font-extrabold leading-snug mb-6"
              style={{ fontSize: 17, letterSpacing: '-0.01em' }}
            >
              Partner Anda untuk Kepatuhan dan Pertumbuhan Berkelanjutan.
            </h3>

            <ul className="flex flex-col gap-5">
              {tentangPillars.map((p) => {
                const Icon = pillarIconMap[p.icon] ?? ShieldCheck
                return (
                  <li key={p.title} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(255,255,255,0.14)',
                        border: '1px solid rgba(255,255,255,0.22)',
                      }}
                    >
                      <Icon size={18} color="#fff" />
                    </span>
                    <div>
                      <p className="font-bold leading-tight" style={{ fontSize: 14.5 }}>
                        {p.title}
                      </p>
                      <p
                        className="mt-1 leading-relaxed"
                        style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.78)' }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
