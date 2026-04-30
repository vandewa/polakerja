'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { UserCheck, ShieldCheck, Leaf } from 'lucide-react'
import { tentangPoints } from '@/lib/data'

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

const badges = [
  { icon: UserCheck, label: 'Profesional' },
  { icon: ShieldCheck, label: 'Terpercaya' },
  { icon: Leaf, label: 'Berkelanjutan' },
]

export default function TentangKami() {
  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Blue pill badge */}
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
              style={{ background: '#EFF6FF', color: '#1B4ED8' }}
            >
              Tentang Kami
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Mengapa Memilih<br />Polakerja Consulting?
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed text-sm lg:text-base">
              Kami bukan hanya konsultan, tapi partner strategis yang berkomitmen
              membantu bisnis Anda tumbuh secara terstruktur, patuh terhadap regulasi,
              dan siap bersaing di level yang lebih tinggi.
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {tentangPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-gray-700 text-sm">
                  <GradientCheck />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="#kontak"
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3 rounded-md text-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)' }}
            >
              Selengkapnya Tentang Kami →
            </a>
          </motion.div>

          {/* ── Right column — photo + card below ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Photo — clean, no dark overlay */}
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', position: 'relative' }}>
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Tim Polakerja Consulting"
                fill
                className="object-cover"
              />
            </div>

            {/* Card — overlaps bottom of photo with negative margin */}
            <div
              className="relative z-10 bg-white rounded-2xl mx-6 -mt-14"
              style={{
                boxShadow: '0 8px 40px rgba(27,78,216,0.10), 0 2px 12px rgba(0,0,0,0.06)',
                padding: '24px 28px 28px',
              }}
            >
              <h3 className="font-bold text-gray-900 text-base leading-snug mb-6">
                Partner Anda untuk Kepatuhan<br />dan Pertumbuhan Berkelanjutan.
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {badges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: '#EFF6FF' }}
                    >
                      <Icon size={22} strokeWidth={1.5} style={{ color: '#1B4ED8' }} />
                    </div>
                    <span className="text-gray-700 text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
