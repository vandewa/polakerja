'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData } from '@/lib/data'
import { FolderCheck, Users, TrendingUp, Clock } from 'lucide-react'

const icons = [FolderCheck, Users, TrendingUp, Clock]

function Counter({ value, suffix }: { value:number; suffix:string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once:true })
  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = Math.ceil(value / (1600/16))
    const t = setInterval(() => {
      n = Math.min(n+step, value)
      setCount(n)
      if (n >= value) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView, value])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Strong blue orbs for this section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', width:'800px', height:'400px', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(27,78,216,0.18) 0%,transparent 65%)',
          filter:'blur(50px)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass panel */}
        <div className="glass rounded-3xl overflow-hidden"
          style={{ boxShadow:'0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {statsData.map((item, i) => {
              const Icon = icons[i]
              return (
                <motion.div
                  key={item.label}
                  initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                  transition={{duration:0.55,delay:i*0.1}}
                  className="flex flex-col gap-4 p-8 lg:p-10 group hover:bg-white/[0.03] transition-colors"
                  style={{
                    borderRight: i<3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    borderBottom: i<2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  {/* Icon in glass circle */}
                  <div className="glass-sm w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ borderColor:'rgba(59,130,246,0.2)' }}>
                    <Icon size={17} style={{color:'#60A5FA'}} strokeWidth={1.8} />
                  </div>

                  {/* Number */}
                  <div className="font-bold text-white"
                    style={{ fontSize:'clamp(2.8rem,5vw,3.8rem)', lineHeight:1,
                      fontFamily:'Urbanist,sans-serif', letterSpacing:'-0.03em' }}>
                    <Counter value={item.value} suffix={item.suffix} />
                  </div>

                  {/* Thin blue rule */}
                  <div className="w-8 h-px" style={{background:'rgba(59,130,246,0.5)'}} />

                  <div>
                    <p className="font-semibold text-white mb-1" style={{fontSize:'0.9rem'}}>
                      {item.label}
                    </p>
                    <p className="text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.32)'}}>
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
