'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimoniData } from '@/lib/data'

export default function Testimoni() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimoni" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
              <Quote size={32} className="text-[#1B4ED8] mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{item.quote}"</p>
              <div>
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.role}</p>
                <p className="text-[#1B4ED8] text-sm font-medium">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-2">
          {testimoniData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${active === i ? 'bg-[#1B4ED8] w-6' : 'bg-gray-300 w-2.5'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
