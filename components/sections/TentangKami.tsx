'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { UserCheck, ShieldCheck, Leaf, ArrowRight } from 'lucide-react'
import { tentangPoints, WA_LINK } from '@/lib/data'

const badges = [
  { icon: UserCheck, label: 'Profesional' },
  { icon: ShieldCheck, label: 'Terpercaya' },
  { icon: Leaf, label: 'Berkelanjutan' },
]

const GradientCheck = () => (
  <span
    className="flex items-center justify-center rounded-full shrink-0"
    style={{
      width: '22px',
      height: '22px',
      background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)',
      boxShadow: '0 3px 8px rgba(27,78,216,0.3)',
    }}
  >
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M2 5.5l2.8 2.8L9 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

export default function TentangKami() {
  return (
    <section id="tentang" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: '#EFF6FF', color: '#1B4ED8', border: '1px solid #BFDBFE' }}
            >
              Tentang Kami
            </span>

            <h2
              className="font-extrabold text-gray-900 mb-5 leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Mengapa Memilih<br />
              <span style={{ color: '#1B4ED8' }}>Polakerja Consulting?</span>
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed" style={{ fontSize: '0.95rem' }}>
              Kami bukan hanya konsultan, tapi partner strategis yang berkomitmen
              membantu bisnis Anda tumbuh secara terstruktur, patuh terhadap regulasi,
              dan siap bersaing di level yang lebih tinggi.
            </p>

            <ul className="flex flex-col gap-3.5 mb-10">
              {tentangPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-gray-700" style={{ fontSize: '0.9rem' }}>
                  <GradientCheck />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02] hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)',
                boxShadow: '0 8px 24px rgba(27,78,216,0.35)',
              }}
            >
              Hubungi Kami Sekarang
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative border offset */}
            <div
              className="absolute rounded-2xl"
              style={{
                top: '12px',
                left: '12px',
                right: '-12px',
                bottom: '-12px',
                background: 'linear-gradient(135deg, rgba(27,78,216,0.15) 0%, rgba(59,130,246,0.08) 100%)',
                zIndex: 0,
                borderRadius: '16px',
              }}
            />

            {/* Photo */}
            <div className="relative z-10 rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Tim Polakerja Consulting"
                fill
                className="object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(6,13,26,0.35) 100%)' }} />
            </div>

            {/* Experience badge — overlaps photo bottom-left */}
            <div
              className="absolute z-20 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                bottom: '56px',
                left: '-16px',
                background: 'rgba(6,13,26,0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #1B4ED8, #3B82F6)' }}
              >
                <ShieldCheck size={18} color="#fff" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-white font-bold" style={{ fontSize: '1.1rem', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>10+ Tahun</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Pengalaman Profesional</p>
              </div>
            </div>

            {/* Card overlapping photo bottom */}
            <div
              className="relative z-10 bg-white rounded-2xl mx-6 -mt-12"
              style={{
                boxShadow: '0 12px 48px rgba(27,78,216,0.12), 0 2px 16px rgba(0,0,0,0.06)',
                padding: '22px 24px 26px',
              }}
            >
              <h3
                className="font-bold text-gray-900 mb-5 leading-snug"
                style={{ fontSize: '0.95rem', fontFamily: 'Syne, sans-serif' }}
              >
                Partner Anda untuk Kepatuhan<br />dan Pertumbuhan Berkelanjutan.
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {badges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}
                    >
                      <Icon size={20} strokeWidth={1.5} style={{ color: '#1B4ED8' }} />
                    </div>
                    <span className="text-gray-600 text-xs font-semibold">{label}</span>
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
