'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { WA_LINK } from '@/lib/data'

const heroStats = [
  { value: '150+', label: 'Proyek Selesai' },
  { value: '100+', label: 'Klien Puas' },
  { value: '98%',  label: 'Tingkat Keberhasilan' },
  { value: '10+',  label: 'Tahun Pengalaman' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: '#060D1A' }}
    >
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80"
          alt="Gedung perkantoran modern"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.93) 35%, rgba(6,13,26,0.78) 58%, rgba(6,13,26,0.45) 80%, rgba(6,13,26,0.25) 100%)',
          }}
        />
      </div>

      {/* Ambient glow blobs */}
      <div
        className="absolute z-0 rounded-full blur-[120px] opacity-20"
        style={{ width: '500px', height: '500px', background: '#1B4ED8', top: '10%', left: '-5%' }}
      />
      <div
        className="absolute z-0 rounded-full blur-[80px] opacity-10"
        style={{ width: '300px', height: '300px', background: '#3B82F6', bottom: '20%', right: '35%' }}
      />

      {/* Grid dot pattern overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full"
        style={{ paddingTop: 'calc(64px + 8vh)', paddingBottom: '5vh' }}
      >
        <div className="lg:max-w-[56%]">

          {/* Trust badge */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-[0.14em]"
            style={{
              borderColor: 'rgba(59,130,246,0.35)',
              color: '#93C5FD',
              background: 'rgba(27,78,216,0.12)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            Konsultan ISO & Legalitas · Est. 2014
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.08)}
            className="font-extrabold text-white mb-5"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.07,
              fontFamily: 'Syne, var(--font-display), sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Bangun Sistem.<br />
            Pastikan Kepatuhan.<br />
            <span
              style={{
                background: 'linear-gradient(125deg, #60A5FA 0%, #3B82F6 40%, #1D4ED8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dorong Pertumbuhan.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.16)}
            className="leading-relaxed mb-8"
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '460px',
            }}
          >
            Kami membantu perusahaan membangun sistem manajemen yang efektif,
            memenuhi standar internasional, dan siap bersaing di level global.
          </motion.p>

          {/* Key points */}
          <motion.div {...fadeUp(0.22)} className="flex flex-col gap-2 mb-8">
            {['Konsultasi GRATIS, tanpa komitmen', 'Respons cepat via WhatsApp', 'Didampingi hingga sertifikat terbit'].map((pt) => (
              <div key={pt} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <CheckCircle2 size={15} style={{ color: '#60A5FA', flexShrink: 0 }} />
                {pt}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3 mb-14">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.03] hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                color: '#fff',
                fontSize: '0.9rem',
                boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
              }}
            >
              <MessageCircle size={18} strokeWidth={2} />
              Konsultasi via WhatsApp
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border transition-all hover:bg-white/5"
              style={{
                borderColor: 'rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '0.9rem',
              }}
            >
              Lihat Layanan
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.07)', maxWidth: '480px' }}
          >
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="pt-5 pr-4"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  paddingLeft: i > 0 ? '16px' : '0',
                }}
              >
                <p
                  className="font-extrabold text-white mb-0.5"
                  style={{ fontSize: '1.65rem', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}
                >
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.4 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating glass card — desktop only */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="animate-float hidden lg:block absolute z-20"
        style={{ top: '50%', transform: 'translateY(-50%)', right: '4%' }}
      >
        <div
          className="rounded-2xl"
          style={{
            width: '284px',
            padding: '28px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="flex items-center justify-center rounded-xl mb-5 shrink-0"
            style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #1B4ED8, #3B82F6)',
              boxShadow: '0 8px 24px rgba(27,78,216,0.5)',
            }}
          >
            <ShieldCheck size={22} color="#fff" strokeWidth={1.8} />
          </div>
          <h3
            className="font-bold text-white leading-snug mb-4"
            style={{ fontSize: '1rem', fontFamily: 'Syne, sans-serif' }}
          >
            Solusi Tepat untuk Bisnis yang Ingin Tumbuh & Berkelanjutan
          </h3>
          <div className="flex flex-wrap gap-2">
            {['ISO', 'Legalitas', 'SBU', 'SKK', 'COS'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
