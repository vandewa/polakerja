'use client'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20" style={{ backgroundColor: '#1B4ED8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Siap Meningkatkan Sistem dan Kepatuhan Bisnis Anda?
            </h2>
            <p className="text-blue-200 text-base">
              Konsultasikan kebutuhan Anda dengan tim ahli kami sekarang juga.
            </p>
          </div>
          <a
            href="#kontak"
            className="shrink-0 bg-white text-[#1B4ED8] font-bold px-8 py-4 rounded-md hover:bg-blue-50 transition-colors text-base whitespace-nowrap"
          >
            Konsultasi Gratis Sekarang →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
