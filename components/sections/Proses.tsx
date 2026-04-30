'use client'
import { motion } from 'framer-motion'
import { MessageCircle, ClipboardList, Zap, Search, Award } from 'lucide-react'
import { prosesData } from '@/lib/data'

const iconMap: Record<string,React.ElementType> = {
  MessageCircle, ClipboardList, Zap, Search, Award,
}
const colors = ['#3B82F6','#8B5CF6','#10B981','#F59E0B','#EF4444']

export default function Proses() {
  return (
    <section id="proses" className="py-28 relative overflow-hidden">
      {/* Orb */}
      <div className="absolute pointer-events-none" style={{
        width:'700px',height:'400px',borderRadius:'50%',top:'30%',left:'50%',
        transform:'translateX(-50%)',
        background:'radial-gradient(circle,rgba(27,78,216,0.09) 0%,transparent 65%)',
        filter:'blur(40px)',
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
            Proses Kami
          </span>
          <h2 className="font-bold text-white" style={{
            fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
            fontFamily:'Urbanist,sans-serif', lineHeight:1.1,
          }}>
            Pendekatan Sistematis,<br />Hasil Optimal
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute z-0" style={{
            top:'44px', left:'calc(10% + 44px)', right:'calc(10% + 44px)', height:'1px',
            background:'linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 20%, rgba(59,130,246,0.3) 80%, transparent)',
          }}/>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {prosesData.map((item, i) => {
              const Icon = iconMap[item.icon]
              const color = colors[i]
              return (
                <motion.div
                  key={item.step}
                  initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                  transition={{duration:0.55,delay:i*0.1,ease:[0.22,1,0.36,1]}}
                  className="glass glass-hover rounded-2xl p-6 flex flex-col items-center text-center gap-4"
                >
                  {/* Glowing icon circle */}
                  <div className="relative flex items-center justify-center rounded-2xl shrink-0"
                    style={{ width:'80px', height:'80px',
                      background:`rgba(${color==='#3B82F6'?'59,130,246':color==='#8B5CF6'?'139,92,246':color==='#10B981'?'16,185,129':color==='#F59E0B'?'245,158,11':'239,68,68'},0.12)`,
                      border:`1px solid rgba(${color==='#3B82F6'?'59,130,246':color==='#8B5CF6'?'139,92,246':color==='#10B981'?'16,185,129':color==='#F59E0B'?'245,158,11':'239,68,68'},0.2)`,
                    }}>
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white font-bold text-[11px]"
                      style={{ width:'22px', height:'22px', background:color, boxShadow:`0 4px 12px ${color}55` }}>
                      {item.step}
                    </span>
                    <Icon size={28} style={{color}} strokeWidth={1.6} />
                  </div>

                  <h3 className="font-bold text-white" style={{fontSize:'0.92rem',fontFamily:'Urbanist,sans-serif'}}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.45)'}}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
