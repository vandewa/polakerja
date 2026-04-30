'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { layananData, WA_LINK } from '@/lib/data'

export default function Layanan() {
  return (
    <section id="layanan" className="py-28" style={{ background: '#FAFAF8' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Section header — label left, title right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 mb-16 pb-10 border-b border-gray-200"
        >
          <div className="flex items-center gap-6 lg:min-w-[200px]">
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em] shrink-0"
              style={{ color: '#1B4ED8' }}
            >
              Layanan Kami
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
          >
            Solusi Lengkap untuk<br />Kebutuhan Bisnis Anda
          </h2>
        </motion.div>

        {/* Service rows */}
        <div>
          {layananData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group border-b border-gray-100"
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start lg:items-center gap-6 lg:gap-10 py-8 lg:py-9 cursor-pointer"
              >
                {/* Big number */}
                <span
                  className="shrink-0 transition-all duration-300"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 300,
                    fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                    lineHeight: 1,
                    color: '#1B4ED8',
                    opacity: 0.18,
                    minWidth: '68px',
                    // group-hover handled via onMouseEnter below
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.18')}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <h3
                  className="shrink-0 transition-colors duration-300 group-hover:text-blue-700"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600,
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)',
                    lineHeight: 1.2,
                    color: '#111827',
                    minWidth: '200px',
                    maxWidth: '220px',
                  }}
                >
                  {item.title}
                </h3>

                {/* Tags — hidden on mobile, visible lg+ */}
                <div className="hidden lg:flex flex-wrap gap-2 flex-1">
                  {item.items.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200"
                      style={{ background: '#F1F5F9', color: '#64748B' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow — appears on hover */}
                <div
                  className="ml-auto shrink-0 flex items-center gap-1.5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ color: '#1B4ED8' }}
                >
                  Konsultasi
                  <ArrowUpRight size={15} />
                </div>
              </a>

              {/* Mobile tags */}
              <div className="lg:hidden flex flex-wrap gap-2 pb-6 pl-[76px]">
                {item.items.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: '#F1F5F9', color: '#64748B' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
