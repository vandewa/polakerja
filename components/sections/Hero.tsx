'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2, ShieldCheck } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80"
          alt="Gedung perkantoran"
          fill
          className="object-cover object-right-top"
          priority
        />
        {/* White fade — strong on left, fades out at ~60% */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #ffffff 0%, #ffffffee 38%, #ffffffaa 55%, #ffffff44 70%, transparent 100%)',
          }}
        />
        {/* Bottom fade so section boundary is clean */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }}
        />
      </div>

      {/* ── Left text content ── */}
      {/*
        Using padding-top = navbar(64px) + breathing room(7vh).
        No flex-center so content can never overflow upward past the navbar.
      */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full"
        style={{
          paddingTop: 'calc(64px + 7vh)',
          paddingBottom: '6vh',
        }}
      >
        <div className="lg:max-w-[52%]">
          <motion.p
            {...fadeUp(0)}
            className="font-semibold text-sm uppercase tracking-widest mb-5"
            style={{ color: '#1B4ED8' }}
          >
            Konsultan ISO &amp; Legalitas Terpercaya
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-extrabold text-gray-900 leading-[1.12] mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Bangun Sistem.<br />
            Pastikan Kepatuhan.<br />
            <span style={{ color: '#1B4ED8' }}>Dorong Pertumbuhan.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.18)}
            className="text-gray-600 mb-7 leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', maxWidth: '440px' }}
          >
            Kami membantu perusahaan membangun sistem manajemen yang efektif,
            memenuhi standar, dan siap bersaing di tingkat global.
          </motion.p>

          <motion.div
            {...fadeUp(0.26)}
            className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
          >
            {['Berpengalaman & Professional', 'Pendekatan Praktis & Efisien', '100% Komitmen Klien'].map(
              (item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={15} strokeWidth={2.5} style={{ color: '#1B4ED8', flexShrink: 0 }} />
                  {item}
                </div>
              )
            )}
          </motion.div>

          <motion.div {...fadeUp(0.34)} className="flex flex-wrap gap-4">
            <a
              href="#kontak"
              className="font-semibold px-7 py-3 rounded-md transition-all"
              style={{
                background: '#1B4ED8',
                color: '#fff',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#1d44c0')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#1B4ED8')}
            >
              Konsultasi Gratis
            </a>
            <a
              href="#layanan"
              className="font-semibold px-7 py-3 rounded-md border transition-all"
              style={{ borderColor: '#1B4ED8', color: '#1B4ED8' }}
            >
              Lihat Layanan →
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Floating card ── absolutely positioned in the right half ──
          top-[42%] places the card top at 42% of the section height,
          which visually lands at the paragraph/badge area on the left.
          right-[6%] keeps it away from the edge.
      */}
      <motion.div
        initial={{ opacity: 0, y: 24, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, delay: 0.42, ease: 'easeOut' }}
        className="hidden lg:block absolute z-20"
        style={{ bottom: '4%', right: '18%' }}
      >
        <div
          className="bg-white rounded-2xl border border-gray-100"
          style={{
            width: '272px',
            padding: '28px 28px 28px 28px',
            boxShadow: '0 20px 60px rgba(27,78,216,0.13), 0 4px 16px rgba(0,0,0,0.07)',
          }}
        >
          {/* Shield icon */}
          <div
            className="flex items-center justify-center rounded-full mb-5"
            style={{
              width: '52px',
              height: '52px',
              background: '#1B4ED8',
              boxShadow: '0 6px 20px rgba(27,78,216,0.35)',
            }}
          >
            <ShieldCheck size={24} color="#fff" strokeWidth={1.8} />
          </div>

          <h3
            className="font-bold text-gray-900 leading-snug mb-4"
            style={{ fontSize: '1.05rem' }}
          >
            Solusi Tepat untuk Bisnis yang Ingin Tumbuh &amp; Berkelanjutan
          </h3>

          <div className="flex flex-col gap-1">
            <p className="text-sm" style={{ color: '#9CA3AF' }}>ISO · Legalitas · Perizinan</p>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>SBU · SKK · COS</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
