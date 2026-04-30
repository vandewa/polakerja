'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Building2, BarChart2, Monitor, Target } from 'lucide-react'
import { layananData } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  Shield: ShieldCheck,
  FileText: Building2,
  Briefcase: BarChart2,
  Settings: Monitor,
  Users: Target,
}

export default function Layanan() {
  return (
    <section id="layanan" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#1B4ED8] font-semibold text-sm uppercase tracking-widest mb-3">Layanan Kami</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Solusi Lengkap untuk Kebutuhan Bisnis Anda</h2>
          <div className="w-12 h-1 bg-[#1B4ED8] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {layananData.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-sm cursor-pointer hover:shadow-lg hover:shadow-blue-100/50 transition-shadow"
              >
                <div className="w-16 h-16 bg-[#1B4ED8] rounded-full flex items-center justify-center shadow-md shadow-blue-200">
                  <Icon size={26} className="text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {item.items.map((sub) => (
                    <li key={sub} className="text-gray-500 text-sm">{sub}</li>
                  ))}
                </ul>
                <a href="#kontak" className="text-[#1B4ED8] text-sm font-semibold mt-auto hover:underline">
                  Selengkapnya →
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
