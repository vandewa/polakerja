'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { UserCheck, ShieldCheck, Leaf, ArrowRight } from 'lucide-react'
import { tentangPoints, WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const badges = [
  { icon:UserCheck, label:'Profesional', color:'rgba(59,130,246,0.15)', border:'rgba(59,130,246,0.25)', ic:'#60A5FA' },
  { icon:ShieldCheck, label:'Terpercaya', color:'rgba(16,185,129,0.15)', border:'rgba(16,185,129,0.25)', ic:'#34D399' },
  { icon:Leaf, label:'Berkelanjutan', color:'rgba(139,92,246,0.15)', border:'rgba(139,92,246,0.25)', ic:'#A78BFA' },
]

export default function TentangKami() {
  return (
    <section id="tentang" className="py-28 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute pointer-events-none" style={{
        width:'600px',height:'600px',borderRadius:'50%',top:'-50px',right:'-100px',
        background:'radial-gradient(circle,rgba(27,78,216,0.12) 0%,transparent 65%)',filter:'blur(40px)',
      }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left text */}
          <motion.div
            initial={{opacity:0,x:-32}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
          >
            <span className="glass-sm inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
              style={{color:'#93C5FD'}}>
              Tentang Kami
            </span>

            <h2 className="font-bold text-white mb-5" style={{
              fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
              fontFamily:'Urbanist,sans-serif', lineHeight:1.1,
            }}>
              Mengapa Memilih<br />
              <span style={{
                background:'linear-gradient(125deg,#93C5FD,#3B82F6)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
              }}>Polakerja Consulting?</span>
            </h2>

            <p className="text-sm leading-loose mb-8" style={{color:'rgba(255,255,255,0.5)',maxWidth:'420px'}}>
              Kami bukan sekadar konsultan — kami partner strategis yang berkomitmen membantu bisnis Anda tumbuh secara terstruktur, patuh terhadap regulasi, dan siap bersaing di level yang lebih tinggi.
            </p>

            {/* Points */}
            <ul className="flex flex-col gap-3 mb-10">
              {tentangPoints.map(pt => (
                <li key={pt} className="glass-sm flex items-center gap-3 px-4 py-3 rounded-xl">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{background:'linear-gradient(135deg,#1B4ED8,#3B82F6)',boxShadow:'0 3px 10px rgba(27,78,216,0.4)'}}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium" style={{color:'rgba(255,255,255,0.75)'}}>
                    {pt}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-[1.02]"
                style={{background:'linear-gradient(135deg,#1B4ED8,#3B82F6)',color:'#fff',boxShadow:'0 8px 28px rgba(27,78,216,0.45)'}}>
                Hubungi Kami <ArrowRight size={15} />
              </a>
              <a href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
                className="text-sm font-medium transition-colors" style={{color:'rgba(255,255,255,0.35)'}}
                onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.7)')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.35)')}>
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>

          {/* Right photo + overlapping cards */}
          <motion.div
            initial={{opacity:0,x:32}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
            className="relative"
          >
            {/* Decorative glass border offset */}
            <div className="glass absolute rounded-2xl pointer-events-none"
              style={{top:'12px',left:'12px',right:'-12px',bottom:'-12px',zIndex:0,opacity:0.4}} />

            {/* Photo */}
            <div className="relative z-10 rounded-2xl overflow-hidden" style={{aspectRatio:'4/3'}}>
              <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Tim Polakerja" fill className="object-cover" />
              <div className="absolute inset-0" style={{
                background:'linear-gradient(to bottom, transparent 55%, rgba(5,9,26,0.85) 100%)'
              }}/>
            </div>

            {/* Experience badge */}
            <div className="absolute z-20 glass-strong flex items-center gap-3 rounded-2xl px-5 py-3.5"
              style={{bottom:'56px',left:'-20px',boxShadow:'0 16px 40px rgba(0,0,0,0.5)'}}>
              <div className="flex items-center justify-center rounded-xl shrink-0"
                style={{width:'40px',height:'40px',background:'linear-gradient(135deg,#1B4ED8,#3B82F6)',boxShadow:'0 6px 18px rgba(27,78,216,0.5)'}}>
                <ShieldCheck size={18} color="#fff" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-white font-bold" style={{fontSize:'1.1rem',fontFamily:'Urbanist,sans-serif',lineHeight:1}}>10+ Tahun</p>
                <p className="text-xs" style={{color:'rgba(255,255,255,0.45)'}}>Pengalaman Profesional</p>
              </div>
            </div>

            {/* Badges card */}
            <div className="relative z-10 glass rounded-2xl mx-6 -mt-12"
              style={{padding:'22px 24px 26px',boxShadow:'0 12px 48px rgba(0,0,0,0.45)'}}>
              <h3 className="font-bold text-white mb-5 text-sm" style={{fontFamily:'Urbanist,sans-serif'}}>
                Partner untuk Kepatuhan & Pertumbuhan Berkelanjutan.
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map(({icon:Icon,label,color,border,ic}) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{background:color,border:`1px solid ${border}`}}>
                      <Icon size={19} strokeWidth={1.5} style={{color:ic}} />
                    </div>
                    <span className="text-xs font-semibold" style={{color:'rgba(255,255,255,0.6)'}}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
