'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Building2, BarChart2, Monitor, Target, ArrowUpRight, Sparkles, BadgeCheck, Clock, MessageCircle } from 'lucide-react'
import { layananData, WA_LINK } from '@/lib/data'

const iconMap: Record<string,React.ElementType> = {
  Shield:ShieldCheck, FileText:Building2, Briefcase:BarChart2, Settings:Monitor, Users:Target,
}

const cardAccents = [
  { icon:'linear-gradient(135deg,#1B4ED8,#3B82F6)', glow:'rgba(59,130,246,0.6)',  tag:'#1E40AF', tagBg:'rgba(59,130,246,0.13)',  cta:'#1B4ED8', glowSoft:'rgba(59,130,246,0.18)' },
  { icon:'linear-gradient(135deg,#059669,#34D399)', glow:'rgba(16,185,129,0.55)', tag:'#047857', tagBg:'rgba(16,185,129,0.13)',  cta:'#059669', glowSoft:'rgba(16,185,129,0.16)' },
  { icon:'linear-gradient(135deg,#7C3AED,#A78BFA)', glow:'rgba(139,92,246,0.55)', tag:'#6D28D9', tagBg:'rgba(139,92,246,0.13)',  cta:'#7C3AED', glowSoft:'rgba(139,92,246,0.16)' },
  { icon:'linear-gradient(135deg,#D97706,#FCD34D)', glow:'rgba(245,158,11,0.55)', tag:'#92400E', tagBg:'rgba(245,158,11,0.15)',  cta:'#B45309', glowSoft:'rgba(245,158,11,0.16)' },
  { icon:'linear-gradient(135deg,#DC2626,#F87171)', glow:'rgba(239,68,68,0.55)',  tag:'#B91C1C', tagBg:'rgba(239,68,68,0.13)',   cta:'#DC2626', glowSoft:'rgba(239,68,68,0.16)' },
]

const cardMeta = [
  { duration:'4-6 minggu',  credential:'ISO Certified Body',     featured:true  },
  { duration:'2-3 minggu',  credential:'Notaris Terdaftar',      featured:false },
  { duration:'3-4 minggu',  credential:'LPJK Resmi',             featured:false },
  { duration:'6-8 minggu',  credential:'Berpengalaman 10+ thn',  featured:false },
  { duration:'On-going',    credential:'Tim Auditor LSP',        featured:false },
]

export default function Layanan() {
  return (
    <section id="layanan" className="py-28 relative overflow-hidden">
      {/* Section orbs */}
      <div className="absolute pointer-events-none" style={{
        width:'600px',height:'600px',borderRadius:'50%',top:'-100px',left:'-100px',
        background:'radial-gradient(circle,rgba(59,130,246,0.14) 0%,transparent 65%)',filter:'blur(50px)',
      }}/>
      <div className="absolute pointer-events-none" style={{
        width:'500px',height:'500px',borderRadius:'50%',bottom:'-50px',right:'5%',
        background:'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 65%)',filter:'blur(50px)',
      }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — enhanced editorial */}
        <motion.div
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.6}}
          className="text-center mb-16"
        >
          {/* Eyebrow with decorative lines */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10" style={{background:'linear-gradient(90deg, transparent, rgba(27,78,216,0.5))'}} />
            <span className="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-1.5"
              style={{color:'#1B4ED8'}}>
              <Sparkles size={11} strokeWidth={2.4}/>
              Layanan Kami
            </span>
            <div className="h-px w-10" style={{background:'linear-gradient(90deg, rgba(27,78,216,0.5), transparent)'}} />
          </div>

          {/* Split heading with gradient on key word */}
          <h2 className="font-bold mb-5" style={{
            fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
            fontFamily:'Urbanist,sans-serif', lineHeight:1.1, color:'#0F172A',
          }}>
            Solusi Lengkap untuk{' '}
            <span style={{
              background:'linear-gradient(125deg,#1B4ED8 0%, #3B82F6 50%, #6366F1 100%)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            }}>Kebutuhan Bisnis Anda</span>
          </h2>

          {/* Substantial subtitle */}
          <p className="max-w-2xl mx-auto text-sm leading-relaxed" style={{color:'#475569'}}>
            Sudah dipercaya 100+ perusahaan untuk sertifikasi ISO, legalitas perizinan, dan pendampingan profesional dari awal hingga sertifikat terbit.
          </p>
        </motion.div>

        {/* Cards grid — 3+3 layout (5 services + 1 CTA card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {layananData.map((item, i) => {
            const Icon = iconMap[item.icon]
            const ac = cardAccents[i % cardAccents.length]
            const meta = cardMeta[i]
            const isFeatured = meta.featured
            return (
              <motion.div
                key={item.id}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:0.55,delay:i*0.08,ease:[0.22,1,0.36,1]}}
                className="glass glass-hover group relative rounded-2xl p-6 flex flex-col cursor-pointer overflow-hidden"
                style={isFeatured ? {
                  background:'linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(239,246,255,0.65) 100%)',
                  boxShadow:`0 12px 40px rgba(15,23,42,0.08), 0 0 50px ${ac.glowSoft}, inset 0 1px 0 rgba(255,255,255,0.95)`,
                } : undefined}
              >
                {/* Top gradient line — brighter on hover */}
                <div className="absolute inset-x-0 top-0 h-px group-hover:h-[2px] transition-all duration-300"
                  style={{background:`linear-gradient(90deg, transparent, ${ac.glow}, transparent)`}} />

                {/* Featured badge */}
                {isFeatured && (
                  <div className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-3 relative"
                    style={{
                      background:'linear-gradient(135deg, #B45309 0%, #EA580C 45%, #F59E0B 100%)',
                      boxShadow:'0 8px 24px rgba(234,88,12,0.45), 0 2px 8px rgba(180,83,9,0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}>
                    {/* Subtle shimmer overlay */}
                    <div className="absolute inset-0 rounded-full pointer-events-none"
                      style={{background:'linear-gradient(180deg, rgba(255,255,255,0.25), transparent 50%)'}} />
                    <Sparkles size={11} color="#fff" strokeWidth={2.8}
                      style={{filter:'drop-shadow(0 1px 1px rgba(0,0,0,0.25))', position:'relative'}}/>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white relative"
                      style={{textShadow:'0 1px 2px rgba(120,45,8,0.4)'}}>
                      Paling Diminati
                    </span>
                  </div>
                )}

                {/* Top row: icon + duration pill */}
                <div className="flex items-start justify-between mb-5">
                  {/* Icon with hover scale + rotate */}
                  <div
                    className="flex items-center justify-center rounded-xl shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      width:'48px', height:'48px', background: ac.icon,
                      boxShadow:`0 8px 24px ${ac.glow.replace(/,0\.\d+\)/,',0.32)')}`,
                    }}>
                    <Icon size={20} color="#fff" strokeWidth={2}/>
                  </div>

                  {/* Duration pill */}
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{
                      background:'rgba(255,255,255,0.65)',
                      backdropFilter:'blur(12px)',
                      WebkitBackdropFilter:'blur(12px)',
                      border:'1px solid rgba(255,255,255,0.8)',
                      color:'#475569',
                    }}>
                    <Clock size={10} strokeWidth={2.2}/>
                    {meta.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold mb-2.5" style={{fontSize:'1.1rem',fontFamily:'Urbanist,sans-serif',color:'#0F172A'}}>
                  {item.title}
                </h3>

                {/* Trust signal row */}
                <div className="flex items-center gap-1.5 mb-4">
                  <BadgeCheck size={13} style={{color: ac.cta}} strokeWidth={2.2}/>
                  <span className="text-xs font-semibold" style={{color:'#475569'}}>
                    {meta.credential}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.items.map(sub => (
                    <span
                      key={sub}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ color: ac.tag, background: ac.tagBg }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Spacer pushes CTA to bottom */}
                <div className="flex-grow" />

                {/* CTA pill button */}
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold rounded-full px-4 py-2 w-fit transition-all group-hover:gap-2.5 group-hover:scale-[1.03]"
                  style={{
                    background:'rgba(255,255,255,0.65)',
                    backdropFilter:'blur(12px)',
                    WebkitBackdropFilter:'blur(12px)',
                    border:`1px solid ${ac.glowSoft}`,
                    color: ac.cta,
                    boxShadow:`0 4px 16px ${ac.glowSoft}`,
                  }}>
                  Konsultasi Sekarang <ArrowUpRight size={13} strokeWidth={2.4}/>
                </a>
              </motion.div>
            )
          })}

          {/* 6th card — CTA feature card filling the empty grid slot */}
          <motion.div
            initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:0.55, delay: layananData.length * 0.08, ease:[0.22,1,0.36,1]}}
            className="group relative rounded-2xl p-7 flex flex-col cursor-pointer overflow-hidden text-white transition-transform hover:scale-[1.02]"
            style={{
              background:'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 50%, #6366F1 100%)',
              boxShadow:'0 20px 48px rgba(27,78,216,0.4), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            {/* Decorative orbs inside card */}
            <div className="absolute pointer-events-none" style={{
              width:'200px',height:'200px',borderRadius:'50%',top:'-50px',right:'-50px',
              background:'radial-gradient(circle,rgba(255,255,255,0.18) 0%,transparent 65%)',
              filter:'blur(20px)',
            }}/>
            <div className="absolute pointer-events-none" style={{
              width:'160px',height:'160px',borderRadius:'50%',bottom:'-40px',left:'-30px',
              background:'radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 65%)',
              filter:'blur(20px)',
            }}/>

            {/* Dot grid texture */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage:'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize:'20px 20px',
            }}/>

            <div className="relative z-10 flex flex-col h-full">
              {/* Glass icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background:'rgba(255,255,255,0.2)',
                  backdropFilter:'blur(12px)',
                  WebkitBackdropFilter:'blur(12px)',
                  border:'1px solid rgba(255,255,255,0.35)',
                  boxShadow:'inset 0 1px 0 rgba(255,255,255,0.25)',
                }}>
                <MessageCircle size={22} color="#fff" strokeWidth={2}/>
              </div>

              {/* Eyebrow */}
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{color:'rgba(255,255,255,0.7)'}}>
                Konsultasi Gratis
              </span>

              {/* Title */}
              <h3 className="font-bold text-white mb-3" style={{fontSize:'1.2rem',fontFamily:'Urbanist,sans-serif',lineHeight:1.2}}>
                Belum Yakin Mau Mulai Dari Mana?
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{color:'rgba(255,255,255,0.78)'}}>
                Diskusikan kebutuhan Anda dengan tim ahli kami. Kami bantu pilihkan layanan paling tepat untuk bisnis Anda — gratis dan tanpa komitmen.
              </p>

              {/* Spacer */}
              <div className="flex-grow" />

              {/* Trust mini-row */}
              <div className="flex items-center gap-3 mb-5 text-xs" style={{color:'rgba(255,255,255,0.65)'}}>
                <span className="flex items-center gap-1"><BadgeCheck size={12}/>Respons &lt; 1 jam</span>
                <span className="opacity-50">·</span>
                <span className="flex items-center gap-1"><BadgeCheck size={12}/>100% Gratis</span>
              </div>

              {/* Solid white button */}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-bold rounded-full px-5 py-3 w-fit transition-all group-hover:gap-3"
                style={{
                  background:'#fff', color:'#1B4ED8', fontSize:'0.85rem',
                  boxShadow:'0 8px 24px rgba(0,0,0,0.18)',
                }}>
                <MessageCircle size={14} strokeWidth={2.4}/>
                Mulai Konsultasi
                <ArrowUpRight size={14} strokeWidth={2.4}/>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
