'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { testimoniData } from '@/lib/data'
import { Star } from 'lucide-react'

const avatarColors = [
  {bg:'rgba(27,78,216,0.2)',border:'rgba(27,78,216,0.35)',text:'#60A5FA'},
  {bg:'rgba(139,92,246,0.2)',border:'rgba(139,92,246,0.35)',text:'#A78BFA'},
  {bg:'rgba(16,185,129,0.2)',border:'rgba(16,185,129,0.35)',text:'#34D399'},
]

function initials(name:string){ return name.split(' ').map(n=>n[0]).slice(0,2).join('') }

export default function Testimoni() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimoni" className="py-28 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{position:'absolute',width:'700px',height:'400px',borderRadius:'50%',
          top:'20%',left:'50%',transform:'translateX(-50%)',
          background:'radial-gradient(circle,rgba(27,78,216,0.1) 0%,transparent 65%)',filter:'blur(40px)'}}/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.6}}
          className="text-center mb-14"
        >
          <span className="glass-sm inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5"
            style={{color:'#93C5FD'}}>
            Testimoni Klien
          </span>
          <h2 className="font-bold text-white" style={{
            fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
            fontFamily:'Urbanist,sans-serif', lineHeight:1.1,
          }}>
            Kepercayaan Mereka,<br />Prioritas Kami
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {testimoniData.map((item, i) => {
            const isActive = active === i
            const av = avatarColors[i % avatarColors.length]
            return (
              <motion.div
                key={i}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:0.55,delay:i*0.1,ease:[0.22,1,0.36,1]}}
                onClick={() => setActive(i)}
                className="relative rounded-2xl p-7 cursor-pointer flex flex-col transition-all duration-300"
                style={{
                  background: isActive ? 'rgba(27,78,216,0.18)' : 'rgba(255,255,255,0.055)',
                  backdropFilter:'blur(20px)',
                  WebkitBackdropFilter:'blur(20px)',
                  border: isActive ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.09)',
                  boxShadow: isActive
                    ? '0 24px 64px rgba(27,78,216,0.25), inset 0 1px 0 rgba(255,255,255,0.12)'
                    : '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                  transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {/* Top highlight on active */}
                {isActive && (
                  <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                    style={{background:'linear-gradient(90deg,transparent,rgba(96,165,250,0.7),transparent)'}}/>
                )}

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length:item.rating}).map((_,si)=>(
                    <Star key={si} size={13} style={{fill:isActive?'#FCD34D':'#F59E0B',color:isActive?'#FCD34D':'#F59E0B'}}/>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="font-serif font-black mb-2 select-none"
                  style={{fontSize:'2.8rem',color:isActive?'rgba(96,165,250,0.35)':'rgba(255,255,255,0.08)',lineHeight:0.8}}
                  aria-hidden>
                  &ldquo;
                </div>

                <p className="text-sm leading-relaxed mb-6 flex-grow"
                  style={{color:isActive?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.5)'}}>
                  {item.quote}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full shrink-0 font-bold text-xs"
                    style={{width:'40px',height:'40px',background:av.bg,border:`1px solid ${av.border}`,color:av.text,
                      fontFamily:'Urbanist,sans-serif',fontSize:'0.9rem'}}>
                    {initials(item.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{color:isActive?'#fff':'rgba(255,255,255,0.8)'}}>
                      {item.name}
                    </p>
                    <p className="text-xs" style={{color:isActive?'rgba(255,255,255,0.45)':'rgba(255,255,255,0.3)'}}>
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {testimoniData.map((_,i)=>(
            <button key={i} onClick={()=>setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{height:'3px',width:active===i?'28px':'10px',
                background:active===i?'#3B82F6':'rgba(255,255,255,0.2)'}}/>
          ))}
        </div>
      </div>
    </section>
  )
}
