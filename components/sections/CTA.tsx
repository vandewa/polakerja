'use client'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, CheckCircle2 } from 'lucide-react'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const trust = ['Konsultasi GRATIS', 'Respons < 1 Jam', 'Tanpa Komitmen', '10+ Tahun Pengalaman']

export default function CTA() {
  return (
    <section className="grid lg:grid-cols-2 overflow-hidden">

      {/* Left — dark, headline */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-24"
        style={{ background: '#080E18' }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 block"
          style={{ color: '#60A5FA' }}
        >
          Mulai Sekarang
        </span>

        <h2
          className="mb-6"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: '#fff',
          }}
        >
          Siap Meningkatkan<br />
          Sistem dan Kepatuhan<br />
          Bisnis Anda?
        </h2>

        <p className="text-sm leading-loose mb-8" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '340px' }}>
          Konsultasikan kebutuhan Anda dengan tim ahli kami. Gratis, cepat, dan tanpa komitmen apapun.
        </p>

        {/* Trust points */}
        <div className="flex flex-col gap-2.5">
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <CheckCircle2 size={13} style={{ color: '#60A5FA', flexShrink: 0 }} />
              {t}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right — blue, CTAs */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1B4ED8 0%, #0F2040 100%)' }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: '#60A5FA', transform: 'translate(30%, -30%)' }}
        />

        <div className="relative z-10">
          <p className="text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Tim kami siap membantu Anda
          </p>
          <p
            className="mb-10"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.15rem',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
            }}
          >
            &ldquo;Konsultasi pertama selalu gratis — kami bantu analisis kebutuhan Anda tanpa biaya apapun.&rdquo;
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                color: '#fff',
                fontSize: '0.9rem',
                boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
              }}
            >
              <MessageCircle size={18} strokeWidth={2} />
              Konsultasi via WhatsApp
            </a>

            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
              className="inline-flex items-center justify-center gap-2.5 font-semibold px-8 py-4 rounded-xl border transition-all hover:bg-white/10"
              style={{
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.9rem',
              }}
            >
              <Phone size={17} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </motion.div>

    </section>
  )
}
