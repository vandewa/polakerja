'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { WA_LINK } from '@/lib/data'

const stats = [
  { value: '150+', label: 'Proyek' },
  { value: '100+', label: 'Klien' },
  { value: '98%',  label: 'Sukses' },
  { value: '10+',  label: 'Tahun' },
]

const ease = [0.22, 1, 0.36, 1] as [number,number,number,number]

export default function Hero() {
  return (
    <section id="beranda" className="relative" style={{ minHeight: '100svh', backgroundColor: '#080E18' }}>
      {/* Photo — deep dark overlay, almost texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(8,14,24,0.92)' }} />
      </div>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Full-height flex layout */}
      <div
        className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col"
        style={{ minHeight: '100svh', paddingTop: 'calc(64px + 4vh)', paddingBottom: '5vh' }}
      >
        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-6 mb-auto"
        >
          <span
            className="text-xs font-medium uppercase tracking-[0.25em] shrink-0"
            style={{ color: '#60A5FA' }}
          >
            Konsultan ISO &amp; Legalitas
          </span>
          <motion.div
            className="flex-1 h-px"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <span
            className="text-xs uppercase tracking-[0.2em] shrink-0"
            style={{ color: 'rgba(255,255,255,0.22)' }}
          >
            Est. 2014
          </span>
        </motion.div>

        {/* Headline — center of the page, massive */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="py-12 lg:py-16"
        >
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              lineHeight: 0.91,
              letterSpacing: '-0.025em',
              color: '#fff',
            }}
          >
            Bangun Sistem.<br />
            Pastikan<br />
            Kepatuhan.<br />
            <span
              style={{
                background: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dorong Pertumbuhan.
            </span>
          </h1>
        </motion.div>

        {/* Bottom editorial bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="border-t pt-8"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-[2fr_repeat(4,auto)_auto] gap-x-10 gap-y-6 items-end">
            {/* Subtext */}
            <p
              className="col-span-2 lg:col-span-1 text-sm leading-loose"
              style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '300px' }}
            >
              Kami membantu perusahaan membangun sistem manajemen yang efektif dan memenuhi standar internasional.
            </p>

            {/* Stats */}
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600,
                    fontSize: '2.2rem',
                    lineHeight: 1,
                    color: '#fff',
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}

            {/* WA CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 lg:col-span-1 inline-flex items-center gap-2.5 font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.03] justify-center lg:justify-start whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                color: '#fff',
                fontSize: '0.85rem',
                boxShadow: '0 6px 28px rgba(34,197,94,0.35)',
              }}
            >
              <MessageCircle size={16} strokeWidth={2} />
              Konsultasi via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
