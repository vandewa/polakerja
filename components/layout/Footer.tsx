'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle, Phone, MapPin, Mail, ArrowUpRight, ArrowUp, Clock } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const ease = [0.22,1,0.36,1] as [number,number,number,number]

const links = {
  Layanan: ['Sertifikasi ISO','Legalitas & Perizinan','SBU & SKK','Sistem Manajemen','Pendampingan'],
  Perusahaan: ['Tentang Kami','Blog','Karir','Kontak'],
}

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden mt-12">
      {/* Top divider */}
      <div className="w-full h-px"
        style={{ background:'linear-gradient(90deg, transparent, rgba(15,23,42,0.08), transparent)' }} />

      {/* Background orbs */}
      <motion.div
        animate={{ scale:[1,1.06,1], opacity:[0.6,0.9,0.6] }}
        transition={{ duration:10, repeat:Infinity, ease:'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width:'700px', height:'350px', borderRadius:'50%',
          top:'-50px', left:'50%', transform:'translateX(-50%)',
          background:'radial-gradient(circle,rgba(27,78,216,0.08) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid — staggered entrance */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-50px' }}
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b"
          style={{ borderColor:'rgba(15,23,42,0.08)' }}
        >
          {/* Brand */}
          <motion.div
            variants={{ hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, ease } } }}
            className="md:col-span-4"
          >
            <motion.div
              whileHover={{ scale:1.03 }}
              transition={{ duration:0.3 }}
              className="mb-4 inline-block"
            >
              <Logo variant="light"/>
            </motion.div>
            <p className="text-sm leading-loose mb-6" style={{ color:'#64748B', maxWidth:'260px' }}>
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>

            <div className="flex flex-col gap-2.5 mb-5">
              <motion.a
                href={WA_LINK}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.03, x:2 }}
                whileTap={{ scale:0.97 }}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl w-fit"
                style={{ color:'#16A34A', borderColor:'rgba(34,197,94,0.25)', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.25)' }}
              >
                <MessageCircle size={14}/> Chat via WhatsApp
              </motion.a>
              <motion.a
                href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
                whileHover={{ scale:1.03, x:2 }}
                className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl w-fit"
                style={{
                  background:'rgba(255,255,255,0.55)',
                  backdropFilter:'blur(14px) saturate(180%)',
                  border:'1px solid rgba(255,255,255,0.75)',
                  color:'#475569',
                }}
              >
                <Phone size={13}/> {PHONE_DISPLAY}
              </motion.a>
            </div>

            {/* Operating hours with live "open/closed" indicator */}
            <div className="flex items-center gap-2 text-xs" style={{ color:'#64748B' }}>
              <span className="relative flex w-1.5 h-1.5">
                <motion.span
                  animate={{ scale:[1, 2.2, 1], opacity:[0.6, 0, 0.6] }}
                  transition={{ duration:1.8, repeat:Infinity, ease:'easeOut' }}
                  className="absolute inset-0 rounded-full"
                  style={{ background:'#22C55E' }}
                />
                <span className="relative w-1.5 h-1.5 rounded-full" style={{ background:'#22C55E' }}/>
              </span>
              <Clock size={11} strokeWidth={2.4}/>
              <span className="font-semibold">Senin–Sabtu</span>
              <span>·</span>
              <span>09.00–17.00 WIB</span>
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <motion.div
              key={title}
              variants={{ hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, ease } } }}
              className="md:col-span-2"
            >
              <h4 className="font-bold mb-5 text-sm" style={{ fontFamily:'Urbanist,sans-serif', color:'#0F172A' }}>
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map(l => (
                  <li key={l}>
                    <a href="#" className="relative text-sm transition-colors group inline-block py-0.5"
                      style={{ color:'#64748B' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#1B4ED8')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>
                      {l}
                      {/* Animated underline on hover */}
                      <span className="absolute left-0 right-0 -bottom-px h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        style={{ background:'linear-gradient(90deg, #1B4ED8, #3B82F6)' }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            variants={{ hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, ease } } }}
            className="md:col-span-4"
          >
            <h4 className="font-bold mb-5 text-sm" style={{ fontFamily:'Urbanist,sans-serif', color:'#0F172A' }}>
              Kontak Kami
            </h4>
            <ul className="flex flex-col gap-4 mb-6">
              {[
                { Icon:Phone, text:PHONE_DISPLAY, href:`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}` },
                { Icon:Mail, text:'info@polakerja.id', href:'mailto:info@polakerja.id' },
                { Icon:MapPin, text:'Jl. Terusbagus No. 16, Jakarta Selatan 12560', href:'#' },
              ].map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background:'rgba(27,78,216,0.08)',
                      border:'1px solid rgba(27,78,216,0.15)',
                    }}>
                    <Icon size={12} style={{ color:'#1B4ED8' }} strokeWidth={2.2}/>
                  </div>
                  <a href={href} className="text-sm leading-relaxed transition-colors pt-1"
                    style={{ color:'#475569' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            <motion.a
              href={WA_LINK}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.04, y:-2 }}
              whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl group relative overflow-hidden"
              style={{
                background:'linear-gradient(135deg, #22C55E, #16A34A)',
                color:'#fff',
                boxShadow:'0 6px 24px rgba(34,197,94,0.35)',
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}/>
              <MessageCircle size={14} className="relative z-10"/>
              <span className="relative z-10">Konsultasi Sekarang</span>
              <ArrowUpRight size={13} className="relative z-10"/>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color:'#94A3B8' }}>
          <p>© 2024 Polakerja Consulting. All rights reserved.</p>
          <div className="flex gap-5">
            {['Kebijakan Privasi','Syarat & Ketentuan'].map(t => (
              <a key={t} href="#" className="relative group transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
                {t}
                <span className="absolute left-0 right-0 -bottom-px h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background:'#1B4ED8' }}/>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span>Part of</span>
              <div className="relative rounded overflow-hidden shrink-0" style={{ width:'14px', height:'14px', background:'#1B4ED8' }}>
                <Image src="/logo-icon.png" alt="" fill className="object-cover" style={{ mixBlendMode:'screen' }}/>
              </div>
              <span className="font-medium" style={{ color:'#475569' }}>Pola Group</span>
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollTop}
              whileHover={{ scale:1.1, y:-2 }}
              whileTap={{ scale:0.95 }}
              className="ml-2 flex items-center justify-center rounded-full"
              style={{
                width:'30px', height:'30px',
                background:'rgba(27,78,216,0.08)',
                border:'1px solid rgba(27,78,216,0.2)',
                color:'#1B4ED8',
              }}
              aria-label="Kembali ke atas"
            >
              <ArrowUp size={14} strokeWidth={2.4}/>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
