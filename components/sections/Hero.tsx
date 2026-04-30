'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Gedung perkantoran"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p {...fadeUp(0)} className="text-[#1B4ED8] font-semibold text-sm uppercase tracking-widest mb-4">
              Konsultan ISO & Legalitas Terpercaya
            </motion.p>
            <motion.h1 {...fadeUp(0.1)} className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Bangun Sistem.<br />
              Pastikan Kepatuhan.<br />
              <span className="text-[#1B4ED8]">Dorong Pertumbuhan.</span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="text-gray-600 text-lg mb-8 max-w-lg">
              Kami membantu perusahaan membangun sistem manajemen yang efektif, memenuhi standar, dan siap bersaing di tingkat global.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-8">
              {['Berpengalaman & Professional', 'Pendekatan Praktis & Efisien', '100% Komitmen Klien'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-[#1B4ED8] shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
              <a href="#kontak" className="bg-[#1B4ED8] text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Konsultasi Gratis
              </a>
              <a href="#layanan" className="border border-[#1B4ED8] text-[#1B4ED8] font-semibold px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
                Lihat Layanan →
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm ml-auto border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-[#1B4ED8] rounded-sm" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">Solusi Tepat untuk Bisnis yang Ingin Tumbuh & Berkelanjutan</h3>
              <p className="text-gray-500 text-sm mb-6">Partner terpercaya untuk kepatuhan dan pertumbuhan bisnis Anda.</p>
              <div className="flex flex-wrap gap-2">
                {['ISO · Legalitas', 'SBU · SKK · COS'].map((tag) => (
                  <span key={tag} className="bg-blue-50 text-[#1B4ED8] text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
