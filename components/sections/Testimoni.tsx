'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimoniData } from '@/lib/data'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimoni() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next: number) => {
    setDir(next > active ? 1 : -1)
    setActive(next)
  }
  const prev = () => go((active - 1 + testimoniData.length) % testimoniData.length)
  const next = () => go((active + 1) % testimoniData.length)

  const item = testimoniData[active]

  return (
    <section id="testimoni" className="py-28" style={{ background: '#FAFAF8' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Top row: label + counter + nav */}
        <div className="flex items-center justify-between mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: '#1B4ED8' }}
          >
            Testimoni Klien
          </span>
          <div className="flex items-center gap-6">
            <span className="text-sm" style={{ color: '#9CA3AF' }}>
              {String(active + 1).padStart(2, '0')} /{' '}
              {String(testimoniData.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-gray-900 hover:border-gray-900 hover:text-white"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-gray-900 hover:border-gray-900 hover:text-white"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-8">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} size={16} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
          ))}
        </div>

        {/* Large pullquote */}
        <div className="overflow-hidden mb-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
                lineHeight: 1.45,
                color: '#111827',
                letterSpacing: '-0.01em',
                maxWidth: '900px',
              }}
            >
              &ldquo;{item.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Thin rule */}
        <div className="h-px mb-7" style={{ background: '#E5E7EB' }} />

        {/* Author */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`author-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-5"
          >
            {/* Avatar initials */}
            <div
              className="flex items-center justify-center rounded-full font-semibold text-sm shrink-0"
              style={{
                width: '48px',
                height: '48px',
                background: '#EFF6FF',
                color: '#1B4ED8',
                border: '1px solid #DBEAFE',
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              {item.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>

            <div>
              <p
                className="font-semibold"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: '#111827' }}
              >
                {item.name}
              </p>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>
                {item.role} · {item.company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-2 mt-10">
          {testimoniData.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: '3px',
                width: active === i ? '32px' : '12px',
                background: active === i ? '#1B4ED8' : '#D1D5DB',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
