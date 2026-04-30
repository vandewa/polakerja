'use client'
import { motion } from 'framer-motion'
import { MessageCircle, ClipboardList, Zap, Search, Award } from 'lucide-react'
import { prosesData } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  MessageCircle, ClipboardList, Zap, Search, Award,
}

export default function Proses() {
  return (
    <section id="proses" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#1B4ED8] font-semibold text-sm uppercase tracking-widest mb-3">Proses Kami</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Pendekatan Sistematis, Hasil Optimal</h2>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-blue-100 z-0" />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {prosesData.map((item, i) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="w-20 h-20 bg-white border-2 border-blue-100 rounded-full flex items-center justify-center shadow-md">
                    <Icon size={28} className="text-[#1B4ED8]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1B4ED8] uppercase tracking-widest mb-1">Langkah {item.step}</p>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
