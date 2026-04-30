'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Building2, BarChart2, Monitor, Target, ArrowUpRight } from 'lucide-react'
import { layananData, WA_LINK } from '@/lib/data'

const iconMap: Record<string,React.ElementType> = {
  Shield:ShieldCheck, FileText:Building2, Briefcase:BarChart2, Settings:Monitor, Users:Target,
}

const cardAccents = [
  { orb:'rgba(27,78,216,0.35)', icon:'linear-gradient(135deg,#1B4ED8,#3B82F6)', glow:'rgba(27,78,216,0.2)' },
  { orb:'rgba(16,185,129,0.3)',  icon:'linear-gradient(135deg,#059669,#34D399)', glow:'rgba(16,185,129,0.18)' },
  { orb:'rgba(139,92,246,0.3)',  icon:'linear-gradient(135deg,#7C3AED,#A78BFA)', glow:'rgba(139,92,246,0.18)' },
  { orb:'rgba(245,158,11,0.3)',  icon:'linear-gradient(135deg,#D97706,#FCD34D)', glow:'rgba(245,158,11,0.18)' },
  { orb:'rgba(239,68,68,0.28)',  icon:'linear-gradient(135deg,#DC2626,#F87171)', glow:'rgba(239,68,68,0.18)' },
]

export default function Layanan() {
  return (
    <section id="layanan" className="py-28 relative overflow-hidden">
      {/* Section orbs */}
      <div className="absolute pointer-events-none" style={{
        width:'600px',height:'600px',borderRadius:'50%',top:'-100px',left:'-100px',
        background:'radial-gradient(circle,rgba(27,78,216,0.1) 0%,transparent 65%)',filter:'blur(40px)',
      }}/>
      <div className="absolute pointer-events-none" style={{
        width:'500px',height:'500px',borderRadius:'50%',bottom:'-50px',right:'5%',
        background:'radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 65%)',filter:'blur(40px)',
      }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.6}}
          className="text-center mb-16"
        >
          <span className="glass-sm inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5"
            style={{color:'#93C5FD'}}>
            Layanan Kami
          </span>
          <h2 className="font-bold text-white" style={{
            fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
            fontFamily:'Urbanist,sans-serif', lineHeight:1.1,
          }}>
            Solusi Lengkap untuk<br />Kebutuhan Bisnis Anda
          </h2>
        </motion.div>

        {/* Glass cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {layananData.map((item, i) => {
            const Icon = iconMap[item.icon]
            const ac = cardAccents[i % cardAccents.length]
            const num = String(i+1).padStart(2,'0')
            return (
              <motion.div
                key={item.id}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:0.55,delay:i*0.08,ease:[0.22,1,0.36,1]}}
                className="glass glass-hover group relative rounded-2xl p-7 flex flex-col gap-5 cursor-pointer overflow-hidden"
              >
                {/* Inner top highlight gradient */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                  style={{background:`linear-gradient(90deg, transparent, ${ac.glow.replace('0.2','0.6')}, transparent)`}} />

                {/* Faded number bg */}
                <span className="absolute top-4 right-5 font-bold select-none pointer-events-none"
                  style={{ fontSize:'5rem', color:'rgba(255,255,255,0.03)',
                    fontFamily:'Urbanist,sans-serif', lineHeight:1 }}>
                  {num}
                </span>

                {/* Icon */}
                <div className="flex items-center justify-center rounded-xl shrink-0"
                  style={{ width:'50px',height:'50px', background:ac.icon, boxShadow:`0 6px 20px ${ac.glow}` }}>
                  <Icon size={21} color="#fff" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-white" style={{fontSize:'1.02rem',fontFamily:'Urbanist,sans-serif'}}>
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 flex-grow">
                  {item.items.map(sub => (
                    <span key={sub} className="glass-sm text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{color:'rgba(255,255,255,0.55)'}}>
                      {sub}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
                  style={{color:'#60A5FA'}}>
                  Konsultasi Sekarang <ArrowUpRight size={14} />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
