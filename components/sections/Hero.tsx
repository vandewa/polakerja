'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, MessageCircle, CheckCircle2, ArrowRight, FolderCheck, Users, TrendingUp, CalendarDays } from 'lucide-react'
import { WA_LINK } from '@/lib/data'

function HeroCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let n = 0
    const step = Math.max(1, Math.ceil(target / (1500/16)))
    const t = setInterval(() => {
      n = Math.min(n + step, target)
      setCount(n)
      if (n >= target) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [target])
  return <>{count}{suffix}</>
}

const heroStatsData = [
  { icon: FolderCheck,  label: 'Proyek Selesai',    target: 150, suffix: '+' },
  { icon: Users,        label: 'Klien Puas',         target: 100, suffix: '+' },
  { icon: TrendingUp,   label: 'Tingkat Sukses',     target: 98,  suffix: '%' },
  { icon: CalendarDays, label: 'Tahun Pengalaman',   target: 10,  suffix: '+' },
]

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
      {/* Background photo — very faint texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80"
          alt="" fill className="object-cover opacity-[0.28]" priority
        />
      </div>

      {/* Local hero orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div style={{ position:'absolute', width:'700px', height:'700px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 65%)',
          filter:'blur(50px)', top:'-150px', left:'-100px' }} />
        <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 65%)',
          filter:'blur(50px)', bottom:'10%', right:'5%' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: 'radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop:'calc(64px + 6vh)', paddingBottom:'5vh', minHeight:'100svh',
          display:'flex', flexDirection:'column', gap:'2.5rem' }}>

        {/* Badge */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <span className="glass-sm inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color:'#1B4ED8' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{background:'#1B4ED8'}} />
            Konsultan ISO & Legalitas · Est. 2014
          </span>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8 flex-grow">

          {/* Left text */}
          <div className="lg:max-w-[52%]">
            <motion.h1
              initial={{opacity:0,y:36}} animate={{opacity:1,y:0}}
              transition={{duration:0.8,delay:0.08,ease}}
              className="font-bold mb-5"
              style={{ fontSize:'clamp(2.6rem,5.5vw,4.4rem)', lineHeight:1.06,
                letterSpacing:'-0.03em', color:'#0F172A', fontFamily:'Urbanist,sans-serif' }}
            >
              Bangun Sistem.<br />
              Pastikan Kepatuhan.<br />
              <span style={{
                background:'linear-gradient(125deg, #1B4ED8 0%, #3B82F6 50%, #6366F1 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>Dorong Pertumbuhan.</span>
            </motion.h1>

            <motion.p
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.6,delay:0.16,ease}}
              className="leading-relaxed mb-7"
              style={{ fontSize:'clamp(0.9rem,1.3vw,1rem)', color:'#475569', maxWidth:'440px' }}
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
                <div key={p} className="flex items-center gap-2.5 text-sm" style={{color:'#475569'}}>
                  <CheckCircle2 size={14} style={{color:'#1B4ED8',flexShrink:0}} />
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
                style={{ color:'#0F172A', fontSize:'0.9rem' }}
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
            <div className="rounded-3xl p-8 ml-auto relative overflow-hidden"
              style={{
                maxWidth:'320px',
                background:'transparent',
                backdropFilter:'blur(14px) saturate(125%)',
                WebkitBackdropFilter:'blur(14px) saturate(125%)',
                border:'1px solid rgba(255,255,255,0.06)',
                boxShadow:'0 28px 64px rgba(15,23,42,0.18), 0 0 40px rgba(27,78,216,0.04)',
              }}>
              {/* Top gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-px"
                style={{background:'linear-gradient(90deg, transparent, rgba(27,78,216,0.5), transparent)'}}/>

              {/* Icon */}
              <div className="flex items-center justify-center rounded-2xl mb-6"
                style={{ width:'56px', height:'56px',
                  background:'linear-gradient(135deg,#1B4ED8,#3B82F6)',
                  boxShadow:'0 8px 28px rgba(27,78,216,0.4)' }}>
                <ShieldCheck size={24} color="#fff" strokeWidth={1.8} />
              </div>

              <h3 className="font-bold mb-2"
                style={{ fontSize:'1.05rem', fontFamily:'Urbanist,sans-serif', lineHeight:1.35, color:'#0F172A' }}>
                Solusi Tepat untuk Bisnis yang Ingin Tumbuh & Berkelanjutan
              </h3>
              <p className="text-xs mb-5 font-medium" style={{color:'#475569'}}>
                Partner strategis untuk sistem & kepatuhan bisnis Anda.
              </p>

              {/* Service tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                    style={{ color:'#1E40AF', background:'rgba(59,130,246,0.13)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium stats strip — balanced glass + premium content */}
        <motion.div
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.6,delay:0.5,ease}}
          className="rounded-2xl px-4 sm:px-6 lg:px-8 py-7 mt-4 relative overflow-hidden"
          style={{
            background:'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.1) 100%)',
            backdropFilter:'blur(24px) saturate(160%)',
            WebkitBackdropFilter:'blur(24px) saturate(160%)',
            border:'1px solid rgba(255,255,255,0.28)',
            boxShadow:'0 28px 64px rgba(15,23,42,0.22), 0 0 50px rgba(27,78,216,0.08), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.15)',
          }}
        >
          {/* Top gradient accent line */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{background:'linear-gradient(90deg, transparent, rgba(27,78,216,0.6), transparent)'}}/>

          {/* Subtle blue glow blob inside panel */}
          <div className="absolute pointer-events-none" style={{
            width:'600px',height:'140px',borderRadius:'50%',top:'50%',left:'50%',
            transform:'translate(-50%,-50%)',
            background:'radial-gradient(ellipse,rgba(27,78,216,0.1) 0%,transparent 70%)',
            filter:'blur(40px)',
          }}/>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-0">
            {heroStatsData.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center text-center gap-3 px-3 py-1 group"
                  style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.18)' : 'none' }}
                >
                  {/* Icon — solid blue gradient that POPS */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background:'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)',
                      boxShadow:'0 8px 22px rgba(27,78,216,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
                    }}
                  >
                    <Icon size={17} color="#fff" strokeWidth={2.2}/>
                  </div>

                  {/* Number — gradient navy → blue */}
                  <span
                    className="font-extrabold leading-none"
                    style={{
                      fontSize:'clamp(1.7rem, 2.9vw, 2.2rem)',
                      fontFamily:'Urbanist, sans-serif',
                      letterSpacing:'-0.03em',
                      background:'linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)',
                      WebkitBackgroundClip:'text',
                      WebkitTextFillColor:'transparent',
                      backgroundClip:'text',
                    }}
                  >
                    <HeroCounter target={s.target} suffix={s.suffix}/>
                  </span>

                  {/* Decorative gradient line */}
                  <div className="w-8 h-[2px] rounded-full"
                    style={{background:'linear-gradient(90deg, transparent, rgba(27,78,216,0.7), transparent)'}}/>

                  {/* Label */}
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] font-bold leading-tight"
                    style={{color:'#1E293B'}}
                  >
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
