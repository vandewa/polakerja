'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { testimoniData } from '@/lib/data'
import { Star } from 'lucide-react'

const avatarColors = ['#1B4ED8', '#7C3AED', '#059669']

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('')
}

export default function Testimoni() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimoni" className="py-28" style={{ background: '#F8FAFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-bold text-sm uppercase tracking-[0.18em] mb-4"
            style={{ color: '#1B4ED8' }}
          >
            Testimoni Klien
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="font-extrabold text-gray-900"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontFamily: 'Syne, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Kepercayaan Mereka,<br />Prioritas Kami
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {testimoniData.map((item, i) => {
            const isActive = active === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                className="relative rounded-2xl p-7 cursor-pointer transition-all duration-300 flex flex-col"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #0F2040 0%, #1E3A5F 100%)'
                    : '#fff',
                  border: isActive ? '1px solid rgba(59,130,246,0.3)' : '1px solid #E5E7EB',
                  boxShadow: isActive
                    ? '0 20px 60px rgba(27,78,216,0.25)'
                    : '0 2px 12px rgba(0,0,0,0.04)',
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: item.rating }).map((_, si) => (
                    <Star
                      key={si}
                      size={14}
                      style={{ color: isActive ? '#FCD34D' : '#F59E0B', fill: isActive ? '#FCD34D' : '#F59E0B' }}
                    />
                  ))}
                </div>

                {/* Quote mark */}
                <div
                  className="font-serif font-black mb-3 select-none leading-none"
                  style={{
                    fontSize: '3rem',
                    color: isActive ? 'rgba(96,165,250,0.4)' : 'rgba(27,78,216,0.15)',
                    lineHeight: 0.8,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <p
                  className="text-sm leading-relaxed mb-6 flex-grow"
                  style={{ color: isActive ? 'rgba(255,255,255,0.75)' : '#6B7280' }}
                >
                  {item.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 font-bold text-white text-xs"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: isActive
                        ? 'rgba(59,130,246,0.3)'
                        : `${avatarColors[i % avatarColors.length]}22`,
                      border: isActive
                        ? '1px solid rgba(59,130,246,0.4)'
                        : `1px solid ${avatarColors[i % avatarColors.length]}33`,
                      color: isActive ? '#93C5FD' : avatarColors[i % avatarColors.length],
                    }}
                  >
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: isActive ? '#fff' : '#111827' }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: isActive ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}
                    >
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>

                {/* Active glow */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2">
          {testimoniData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: '8px',
                width: active === i ? '24px' : '8px',
                background: active === i
                  ? 'linear-gradient(90deg, #1B4ED8, #3B82F6)'
                  : '#D1D5DB',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
