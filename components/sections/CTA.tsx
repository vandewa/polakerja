'use client'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, CheckCircle2 } from 'lucide-react'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const trustItems = [
  'Konsultasi GRATIS',
  'Respons < 1 Jam',
  'Tanpa Komitmen',
  'Berpengalaman 10+ Tahun',
]

export default function CTA() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060D1A 0%, #0F2040 40%, #1B4ED8 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-40"
        style={{ background: 'linear-gradient(90deg, transparent, #60A5FA, transparent)' }}
      />

      {/* Blue orb */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle at 80% 50%, #3B82F6, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.18em] mb-5"
            style={{ color: '#93C5FD' }}
          >
            Mulai Sekarang
          </p>

          <h2
            className="font-extrabold text-white mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontFamily: 'Syne, sans-serif',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            Siap Meningkatkan Sistem<br />
            dan Kepatuhan Bisnis Anda?
          </h2>

          <p
            className="mb-10 leading-relaxed"
            style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', margin: '0 auto 40px' }}
          >
            Konsultasikan kebutuhan Anda dengan tim ahli kami. Gratis, cepat, dan tanpa komitmen.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.03] hover:brightness-110 w-full sm:w-auto justify-center"
              style={{
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                color: '#fff',
                fontSize: '0.95rem',
                boxShadow: '0 10px 40px rgba(34,197,94,0.4)',
              }}
            >
              <MessageCircle size={20} strokeWidth={2} />
              Konsultasi via WhatsApp
            </a>

            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
              className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl border transition-all hover:bg-white/10 w-full sm:w-auto justify-center"
              style={{
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.95rem',
              }}
            >
              <Phone size={18} />
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <CheckCircle2 size={13} style={{ color: '#60A5FA' }} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
