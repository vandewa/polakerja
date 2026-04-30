'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData } from '@/lib/data'
import { Layers, Award, Zap, CalendarClock } from 'lucide-react'

const icons = [Layers, Award, Zap, CalendarClock]

function Counter({ value, suffix, animate }: { value: string; suffix: string; animate: boolean }) {
  const [display, setDisplay] = useState<string>(animate ? '0' : value)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!animate || !inView) return
    const target = parseInt(value, 10)
    if (isNaN(target)) {
      setDisplay(value)
      return
    }
    let n = 0
    const step = Math.max(1, Math.ceil(target / (1600 / 16)))
    const t = setInterval(() => {
      n = Math.min(n + step, target)
      setDisplay(String(n))
      if (n >= target) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView, value, animate])

  return <span ref={ref}>{display}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Centered orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', width:'900px', height:'400px', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(27,78,216,0.16) 0%,transparent 65%)',
          filter:'blur(60px)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.6}}
          className="text-center mb-12"
        >
          <span className="glass-sm inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5"
            style={{color:'#1B4ED8'}}>
            Kapasitas Kami
          </span>
          <h2 className="font-bold mb-4" style={{
            fontSize:'clamp(1.7rem,3.2vw,2.4rem)', letterSpacing:'-0.025em',
            fontFamily:'Urbanist,sans-serif', lineHeight:1.15, color:'#0F172A',
          }}>
            Cakupan Lengkap &amp;{' '}
            <span style={{
              background:'linear-gradient(125deg,#1B4ED8 0%, #3B82F6 50%, #6366F1 100%)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            }}>Respons Cepat</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{color:'#475569'}}>
            Lebih dari sekadar konsultan — kami partner yang siap melayani bisnis Anda dengan kapasitas profesional yang teruji.
          </p>
        </motion.div>

        <div className="glass-strong rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {statsData.map((item, i) => {
              const Icon = icons[i]
              return (
                <motion.div
                  key={item.label}
                  initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                  transition={{duration:0.55,delay:i*0.1}}
                  className="flex flex-col gap-4 p-8 lg:p-10 group transition-colors hover:bg-white/40"
                  style={{
                    borderRight: i<3 ? '1px solid rgba(15,23,42,0.06)' : 'none',
                    borderBottom: i<2 ? '1px solid rgba(15,23,42,0.06)' : 'none',
                  }}
                >
                  {/* Icon in glass circle */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background:'rgba(27,78,216,0.08)', border:'1px solid rgba(27,78,216,0.15)' }}>
                    <Icon size={17} style={{color:'#1B4ED8'}} strokeWidth={1.8} />
                  </div>

                  {/* Number */}
                  <div className="font-bold"
                    style={{ fontSize:'clamp(2.4rem,4.5vw,3.4rem)', lineHeight:1,
                      fontFamily:'Urbanist,sans-serif', letterSpacing:'-0.03em',
                      background:'linear-gradient(135deg,#0F172A 0%,#1E293B 100%)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                    }}>
                    <Counter value={item.value} suffix={item.suffix} animate={item.animate} />
                  </div>

                  {/* Thin blue rule */}
                  <div className="w-8 h-px" style={{background:'#1B4ED8'}} />

                  <div>
                    <p className="font-semibold mb-1" style={{fontSize:'0.9rem', color:'#0F172A'}}>
                      {item.label}
                    </p>
                    <p className="text-xs leading-relaxed" style={{color:'#64748B'}}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
