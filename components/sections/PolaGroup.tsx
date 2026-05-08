'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, BarChart2, ArrowRight } from 'lucide-react'

const POLAPAJAK_URL = 'https://polapajak.id'

const ArrowUpRight = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

export default function PolaGroup() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      style={{
        background:
          'linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 50%, #FFFFFF 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-5">
            <div
              className="relative rounded overflow-hidden shrink-0"
              style={{ width: 14, height: 14, background: '#1B4ED8' }}
            >
              <Image
                src="/logo-icon.png"
                alt=""
                fill
                className="object-cover"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-700">
              Pola Group
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Solusi Terintegrasi untuk Bisnis Anda
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm lg:text-base">
            Compliance, legalitas, dan keuangan dalam satu ekosistem.
            <br className="hidden sm:block" />
            Dua brand, satu komitmen — siap mendampingi bisnis Anda dari fondasi hingga pertumbuhan.
          </p>
        </motion.div>

        {/* ── Two cards ── */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Polakerja — current site */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl p-6 sm:p-8 bg-white"
            style={{
              border: '2px solid #1B4ED8',
              boxShadow: '0 18px 40px rgba(27,78,216,0.12)',
            }}
          >
            <span
              className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: '#EFF6FF', color: '#1B4ED8' }}
            >
              Anda di sini
            </span>

            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
              style={{ background: '#EFF6FF' }}
            >
              <ShieldCheck size={28} className="text-[#1B4ED8]" strokeWidth={1.8} />
            </div>

            <p className="font-bold text-[#1B4ED8] text-[11px] uppercase tracking-[0.2em] mb-2">
              Polakerja Consulting
            </p>
            <h3 className="font-extrabold text-gray-900 text-xl lg:text-2xl mb-3">
              ISO, Legalitas &amp; Perizinan
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Bangun fondasi compliance bisnis Anda — dari sertifikasi standar
              internasional, legalitas, perizinan, hingga sistem manajemen siap audit.
            </p>

            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#1B4ED8]">•</span>
                Sertifikasi ISO 9001 / 14001 / 45001 / 37001
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4ED8]">•</span>
                Pendirian PT, NIB &amp; OSS, perizinan akta
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4ED8]">•</span>
                SBU &amp; SKK Konstruksi (LPJK)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4ED8]">•</span>
                Sistem manajemen &amp; pendampingan audit
              </li>
            </ul>
          </motion.div>

          {/* Polapajak — visit other */}
          <motion.a
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            href={POLAPAJAK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl p-6 sm:p-8 text-white overflow-hidden transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_28px_60px_rgba(22,163,74,0.45)]"
            style={{
              background: 'linear-gradient(135deg, #16A34A 0%, #15803D 60%, #14532D 100%)',
              boxShadow: '0 20px 45px rgba(22,163,74,0.32)',
            }}
          >
            {/* Decorative dotted pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
            {/* Decorative blob top-right */}
            <div
              className="pointer-events-none absolute -top-16 -right-12 w-56 h-56 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(187,247,208,0.35), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            {/* Decorative blob bottom-left for depth */}
            <div
              className="pointer-events-none absolute -bottom-20 -left-16 w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(34,197,94,0.30), transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            {/* Top-right "external link" indicator */}
            <div className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.28)' }}
            >
              <ArrowUpRight size={16} />
            </div>

            {/* Icon */}
            <div
              className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.28)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <BarChart2 size={28} className="text-white" strokeWidth={1.8} />
            </div>

            <p className="relative font-bold text-green-100 text-[11px] uppercase tracking-[0.2em] mb-2">
              Polapajak Consulting
            </p>
            <h3 className="relative font-extrabold text-white text-xl lg:text-2xl mb-3">
              Pajak &amp; Akuntansi
            </h3>

            {/* Trust pills */}
            <div className="relative flex flex-wrap gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.22)' }}
              >
                <span className="text-green-200">●</span> 200+ Klien Terpercaya
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.22)' }}
              >
                <span className="text-green-200">●</span> 15+ Tahun
              </span>
            </div>

            <p className="relative text-green-50/90 text-sm leading-relaxed mb-5">
              Kelola pajak dan keuangan bisnis Anda bersama ahli — dari
              perencanaan pajak hingga pembukuan dan laporan keuangan yang
              rapi dan tepat waktu.
            </p>

            <ul className="relative flex flex-col gap-2 text-sm text-green-50/90 mb-7">
              <li className="flex items-start gap-2">
                <span className="text-green-200">•</span>
                Konsultasi &amp; perencanaan pajak
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-200">•</span>
                Pembukuan &amp; laporan keuangan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-200">•</span>
                Payroll &amp; compliance pajak bulanan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-200">•</span>
                Audit &amp; advisory
              </li>
            </ul>

            {/* Strong CTA pill */}
            <span
              className="relative inline-flex items-center gap-2 font-bold text-sm rounded-full px-5 py-2.5 transition-all group-hover:gap-3"
              style={{
                background: '#FFFFFF',
                color: '#15803D',
                boxShadow: '0 8px 20px rgba(15,23,42,0.18)',
              }}
            >
              Kunjungi PolaPajak
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
