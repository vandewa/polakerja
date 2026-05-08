'use client'
import { motion } from 'framer-motion'
import { ClipboardCheck, ArrowRight } from 'lucide-react'
import { whatsappConsultUrl } from '@/lib/data'

export default function CTA() {
  return (
    <section className="px-0 pt-2 pb-0">
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1B4ED8 0%, #1E40AF 100%)',
        }}
      >
        {/* Soft glow blob top-right */}
        <div
          className="pointer-events-none absolute -top-24 -right-12 w-72 h-72 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(191,219,254,0.30), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 py-7 sm:py-8 grid md:grid-cols-[auto_1fr_auto] items-center gap-5"
        >
          {/* Icon badge */}
          <div
            className="hidden md:flex items-center justify-center w-14 h-14 rounded-xl shrink-0"
            style={{
              background: 'rgba(255,255,255,0.16)',
              border: '1px solid rgba(255,255,255,0.28)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            <ClipboardCheck size={26} color="#fff" />
          </div>

          {/* Heading & sub */}
          <div className="text-white">
            <h3
              className="font-extrabold tracking-tight"
              style={{ fontSize: 'clamp(1.15rem, 2vw, 1.45rem)' }}
            >
              Siap Meningkatkan Sistem dan Kepatuhan Bisnis Anda?
            </h3>
            <p
              className="mt-1 text-[13px]"
              style={{ color: 'rgba(255,255,255,0.92)' }}
            >
              Konsultasikan kebutuhan Anda dengan tim ahli kami sekarang juga.
            </p>
          </div>

          {/* CTA button */}
          <a
            href={whatsappConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 transition-transform hover:scale-[1.03] whitespace-nowrap"
            style={{
              background: '#fff',
              color: '#1B4ED8',
              boxShadow: '0 10px 24px rgba(15,23,42,0.16)',
            }}
          >
            Konsultasi Gratis Sekarang <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
