'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimoniData } from '@/lib/data'

export default function Testimoni() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimoni" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#1B4ED8] font-semibold text-sm uppercase tracking-widest mb-3">Testimoni Klien</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Kepercayaan Mereka, Prioritas Kami</h2>
          <div className="w-16 h-1 bg-[#1B4ED8] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimoniData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`bg-white rounded-2xl p-8 shadow-sm border-2 cursor-pointer transition-all ${active === i ? 'border-[#1B4ED8] shadow-blue-100 shadow-lg' : 'border-transparent hover:border-blue-100'}`}
            >
              <div className="flex items-start justify-between mb-4">
                {/* Large typographic opening quote mark */}
                <div
                  className="font-serif font-bold leading-none select-none"
                  style={{ fontSize: '3.5rem', color: '#1B4ED8', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#FACC15" stroke="#FACC15" />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {item.quote}
              </p>

              <div>
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.role}</p>
                <p className="text-sm" style={{ color: '#1B4ED8' }}>{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {testimoniData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${active === i ? 'w-6' : 'bg-gray-300 w-2.5'}`}
              style={active === i ? { background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)' } : {}}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
