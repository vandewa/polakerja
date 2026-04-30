'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { WA_LINK } from '@/lib/data'

const ease = [0.22,1,0.36,1] as [number,number,number,number]

const points = [
  'Konsultasi GRATIS, tanpa komitmen',
  'Respons cepat via WhatsApp',
  'Didampingi hingga sertifikat terbit',
]

const tags = ['ISO 9001','ISO 14001','ISO 45001','Legalitas','SBU','SKK']

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Background photo — very dark, nearly invisible texture */}
      <div className="absolute inset-0 z-0">
        <Image src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80"
          alt="" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: 'rgba(5,9,26,0.88)' }} />
      </div>

      {/* Local hero orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div style={{ position:'absolute', width:'700px', height:'700px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(27,78,216,0.22) 0%, transparent 65%)',
          filter:'blur(40px)', top:'-150px', left:'-100px' }} />
        <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%)',
          filter:'blur(40px)', bottom:'10%', right:'5%' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop:'calc(64px + 7vh)', paddingBottom:'6vh', minHeight:'100svh',
          display:'flex', flexDirection:'column', justifyContent:'space-between' }}>

        {/* Badge */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <span className="glass-sm inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color:'#93C5FD' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            Konsultan ISO & Legalitas · Est. 2014
          </span>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8 flex-1 py-10 lg:py-0">

          {/* Left text */}
          <div className="lg:max-w-[52%]">
            <motion.h1
              initial={{opacity:0,y:36}} animate={{opacity:1,y:0}}
              transition={{duration:0.8,delay:0.08,ease}}
              className="font-bold text-white mb-5"
              style={{ fontSize:'clamp(2.6rem,5.5vw,4.4rem)', lineHeight:1.06,
                letterSpacing:'-0.03em', fontFamily:'Urbanist,sans-serif' }}
            >
              Bangun Sistem.<br />
              Pastikan Kepatuhan.<br />
              <span style={{
                background:'linear-gradient(125deg, #93C5FD 0%, #3B82F6 50%, #1B4ED8 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>Dorong Pertumbuhan.</span>
            </motion.h1>

            <motion.p
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.6,delay:0.16,ease}}
              className="leading-relaxed mb-7"
              style={{ fontSize:'clamp(0.9rem,1.3vw,1rem)', color:'rgba(255,255,255,0.5)', maxWidth:'440px' }}
            >
              Kami membantu perusahaan membangun sistem manajemen yang efektif,
              memenuhi standar internasional, dan siap bersaing di tingkat global.
            </motion.p>

            <motion.div
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
              transition={{duration:0.5,delay:0.22,ease}}
              className="flex flex-col gap-2.5 mb-8"
            >
              {points.map(p => (
                <div key={p} className="flex items-center gap-2.5 text-sm" style={{color:'rgba(255,255,255,0.6)'}}>
                  <CheckCircle2 size={14} style={{color:'#60A5FA',flexShrink:0}} />
                  {p}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
              transition={{duration:0.5,delay:0.28,ease}}
              className="flex flex-wrap gap-3"
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.03]"
                style={{ background:'linear-gradient(135deg,#22C55E,#16A34A)', color:'#fff',
                  fontSize:'0.9rem', boxShadow:'0 8px 32px rgba(34,197,94,0.4)' }}
              >
                <MessageCircle size={17} strokeWidth={2} />
                Konsultasi via WhatsApp
              </a>
              <a href="#layanan"
                className="glass inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.02]"
                style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.9rem' }}
              >
                Lihat Layanan <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>

          {/* Right — floating glass card */}
          <motion.div
            initial={{opacity:0,x:40,y:20}} animate={{opacity:1,x:0,y:0}}
            transition={{duration:0.9,delay:0.35,ease}}
            className="animate-float hidden lg:block lg:flex-1"
          >
            <div className="glass rounded-3xl p-8 ml-auto"
              style={{ maxWidth:'320px',
                boxShadow:'0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(27,78,216,0.12), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
              {/* Icon */}
              <div className="flex items-center justify-center rounded-2xl mb-6"
                style={{ width:'56px', height:'56px',
                  background:'linear-gradient(135deg,#1B4ED8,#3B82F6)',
                  boxShadow:'0 8px 28px rgba(27,78,216,0.5)' }}>
                <ShieldCheck size={24} color="#fff" strokeWidth={1.8} />
              </div>

              <h3 className="font-bold text-white mb-2"
                style={{ fontSize:'1.05rem', fontFamily:'Urbanist,sans-serif', lineHeight:1.35 }}>
                Solusi Tepat untuk Bisnis yang Ingin Tumbuh & Berkelanjutan
              </h3>
              <p className="text-xs mb-5" style={{color:'rgba(255,255,255,0.38)'}}>
                Partner strategis untuk sistem & kepatuhan bisnis Anda.
              </p>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="glass-sm text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ color:'#93C5FD' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom glass stats strip */}
        <motion.div
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.6,delay:0.5,ease}}
          className="glass rounded-2xl px-8 py-5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {[
              {v:'150+',l:'Proyek Selesai'},
              {v:'100+',l:'Klien Puas'},
              {v:'98%', l:'Tingkat Sukses'},
              {v:'10+', l:'Tahun Pengalaman'},
            ].map((s,i) => (
              <div key={s.l} className="flex flex-col items-center py-2"
                style={{ borderRight: i<3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <span className="font-bold text-white" style={{fontSize:'1.6rem',lineHeight:1,fontFamily:'Urbanist,sans-serif'}}>
                  {s.v}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] mt-1" style={{color:'rgba(255,255,255,0.35)'}}>
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
