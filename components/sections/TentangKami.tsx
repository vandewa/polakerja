'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { tentangPoints } from '@/lib/data'

export default function TentangKami() {
  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#1B4ED8] font-semibold text-sm uppercase tracking-widest mb-4">Tentang Kami</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Mengapa Memilih<br />Polakerja Consulting?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kami bukan hanya konsultan. Kami adalah mitra strategis yang membantu membangun fondasi bisnis Anda secara terstruktur, melalui evaluasi reguler, dan dengan tenaga ahli yang kompeten setiap minggu.
            </p>
            <ul className="flex flex-col gap-4 mb-10">
              {tentangPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#1B4ED8] shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <a href="#kontak" className="inline-flex items-center gap-2 bg-[#1B4ED8] text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Selengkapnya Tentang Kami →
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Tim Polakerja Consulting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(30,58,95,0.4)' }} />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Image src="/logo.svg" alt="Polakerja" width={120} height={30} className="mb-2 brightness-0 invert" />
                <p className="text-white text-sm font-medium">Partner Anda untuk Kepatuhan dan Pertumbuhan Berkelanjutan</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              {['Profesional', 'Terpercaya', 'Berkelanjutan'].map((badge) => (
                <div key={badge} className="flex-1 bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-[#1B4ED8] font-bold text-sm">{badge}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
