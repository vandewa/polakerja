'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { tentangPoints, WA_LINK, PHONE_DISPLAY } from '@/lib/data'

export default function TentangKami() {
  return (
    <section id="tentang" className="overflow-hidden">
      <div className="grid lg:grid-cols-2">

        {/* Left — text, contained */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center py-24 px-8 lg:px-16 xl:px-20"
          style={{ background: '#FAFAF8', minHeight: '600px' }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 block"
            style={{ color: '#1B4ED8' }}
          >
            Tentang Kami
          </span>

          <h2
            className="mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
          >
            Mengapa Memilih<br />
            <span style={{ color: '#1B4ED8' }}>Polakerja Consulting?</span>
          </h2>

          <p className="text-sm leading-loose mb-8" style={{ color: '#6B7280', maxWidth: '380px' }}>
            Kami bukan sekadar konsultan — kami partner strategis yang berkomitmen membantu bisnis Anda tumbuh, patuh regulasi, dan siap bersaing di level global.
          </p>

          {/* Points */}
          <ul className="flex flex-col gap-4 mb-10">
            {tentangPoints.map((point, i) => (
              <li key={point} className="flex items-center gap-4">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 300,
                    fontSize: '1.1rem',
                    color: '#1B4ED8',
                    opacity: 0.5,
                    minWidth: '28px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium" style={{ color: '#374151' }}>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                background: '#0D1117',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              Hubungi Kami
              <ArrowUpRight size={15} />
            </a>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
              className="text-sm font-medium transition-colors hover:text-blue-600"
              style={{ color: '#9CA3AF' }}
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </motion.div>

        {/* Right — full-bleed photo, no container */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ minHeight: '500px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85"
            alt="Tim Polakerja Consulting"
            fill
            className="object-cover"
          />

          {/* Dark gradient bottom */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,14,24,0.75) 0%, transparent 50%)' }}
          />

          {/* Stats overlay at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 p-8 grid grid-cols-3 gap-4"
            style={{ background: 'rgba(8,14,24,0.75)', backdropFilter: 'blur(12px)' }}
          >
            {[
              { value: '150+', label: 'Proyek Selesai' },
              { value: '100+', label: 'Klien Puas' },
              { value: '98%', label: 'Tingkat Sukses' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600,
                    fontSize: '1.8rem',
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
