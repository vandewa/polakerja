'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimoniData } from '@/lib/data'
import { Star, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const ease = [0.22,1,0.36,1] as [number,number,number,number]

const avatarColors = [
  { bg:'rgba(27,78,216,0.12)',  border:'rgba(27,78,216,0.3)',  text:'#1B4ED8', glow:'rgba(27,78,216,0.25)' },
  { bg:'rgba(124,58,237,0.12)', border:'rgba(124,58,237,0.3)', text:'#7C3AED', glow:'rgba(124,58,237,0.25)' },
  { bg:'rgba(5,150,105,0.12)',  border:'rgba(5,150,105,0.3)',  text:'#059669', glow:'rgba(5,150,105,0.25)' },
]

function initials(name:string){ return name.split(' ').map(n=>n[0]).slice(0,2).join('') }

export default function Testimoni() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-rotate every 5 seconds, pause on hover
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setActive(a => (a + 1) % testimoniData.length)
    }, 5000)
    return () => clearInterval(t)
  }, [paused])

  const goPrev = () => setActive(a => (a - 1 + testimoniData.length) % testimoniData.length)
  const goNext = () => setActive(a => (a + 1) % testimoniData.length)

  return (
    <section id="testimoni" className="py-28 relative overflow-hidden">
      {/* Breathing orbs */}
      <motion.div
        animate={{ scale:[1,1.07,1], opacity:[0.7,1,0.7] }}
        transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width:'700px', height:'400px', borderRadius:'50%',
          top:'20%', left:'50%', transform:'translateX(-50%)',
          background:'radial-gradient(circle,rgba(27,78,216,0.10) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale:[1,1.05,1], opacity:[0.5,0.8,0.5] }}
        transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:1 }}
        className="absolute pointer-events-none"
        style={{
          width:'500px', height:'500px', borderRadius:'50%',
          bottom:'-100px', right:'-100px',
          background:'radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — choreographed entrance */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}}
          variants={{
            hidden:{},
            visible:{transition:{staggerChildren:0.12}}
          }}
          className="text-center mb-14"
        >
          <motion.div
            variants={{ hidden:{opacity:0,y:12}, visible:{opacity:1,y:0,transition:{duration:0.5,ease}} }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-10" style={{background:'linear-gradient(90deg, transparent, rgba(27,78,216,0.5))'}} />
            <span className="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-1.5"
              style={{color:'#1B4ED8'}}>
              <Sparkles size={11} strokeWidth={2.4}/>
              Testimoni Klien
            </span>
            <div className="h-px w-10" style={{background:'linear-gradient(90deg, rgba(27,78,216,0.5), transparent)'}} />
          </motion.div>

          <motion.h2
            variants={{ hidden:{opacity:0,y:24}, visible:{opacity:1,y:0,transition:{duration:0.7,ease}} }}
            className="font-bold mb-5"
            style={{
              fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
              fontFamily:'Urbanist,sans-serif', lineHeight:1.1, color:'#0F172A',
            }}
          >
            Kepercayaan Mereka,{' '}
            <span style={{
              background:'linear-gradient(125deg,#1B4ED8 0%, #3B82F6 50%, #6366F1 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>Prioritas Kami</span>
          </motion.h2>

          <motion.p
            variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0,transition:{duration:0.6,ease}} }}
            className="max-w-xl mx-auto text-sm leading-relaxed"
            style={{color:'#475569'}}
          >
            Cerita nyata dari klien yang telah mempercayakan sertifikasi dan kepatuhan bisnisnya kepada kami.
          </motion.p>
        </motion.div>

        {/* Cards grid — choreographed staggered entrance */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            initial="hidden" whileInView="visible" viewport={{once:true, margin:'-80px'}}
            variants={{
              hidden:{},
              visible:{transition:{staggerChildren:0.15, delayChildren:0.2}}
            }}
            className="grid md:grid-cols-3 gap-5 mb-10"
          >
            {testimoniData.map((item, i) => {
              const isActive = active === i
              const av = avatarColors[i % avatarColors.length]
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden:{opacity:0, y:50},
                    visible:{opacity:1, y:0, transition:{duration:0.7, ease}}
                  }}
                  whileHover={{ y:-8, transition:{duration:0.35,ease} }}
                  onClick={() => setActive(i)}
                  className="relative rounded-2xl p-7 cursor-pointer flex flex-col group overflow-hidden transition-all duration-500"
                  style={{
                    background: isActive
                      ? `linear-gradient(180deg, ${av.bg.replace('0.12','0.18')}, rgba(255,255,255,0.6))`
                      : 'rgba(255,255,255,0.55)',
                    backdropFilter:'blur(22px) saturate(180%)',
                    WebkitBackdropFilter:'blur(22px) saturate(180%)',
                    border: isActive ? `1px solid ${av.border}` : '1px solid rgba(255,255,255,0.75)',
                    boxShadow: isActive
                      ? `0 24px 60px ${av.glow}, 0 0 50px ${av.glow.replace('0.25','0.12')}, inset 0 1px 0 rgba(255,255,255,0.95)`
                      : '0 8px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                    transform: isActive ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Top gradient accent line — only on active */}
                  {isActive && (
                    <motion.div
                      layoutId="testimoni-accent"
                      className="absolute inset-x-0 top-0 h-px"
                      style={{background:`linear-gradient(90deg,transparent,${av.text},transparent)`}}
                    />
                  )}

                  {/* Stars — animated fill in */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({length: item.rating}).map((_, si) => (
                      <motion.div
                        key={si}
                        initial={{ opacity:0, scale:0, rotate:-180 }}
                        whileInView={{ opacity:1, scale:1, rotate:0 }}
                        viewport={{ once:true }}
                        transition={{
                          delay: 0.2 + i * 0.15 + 0.4 + si * 0.06,
                          type:'spring',
                          stiffness: 280,
                          damping: 14,
                        }}
                      >
                        <Star size={14} style={{
                          fill: isActive ? '#FCD34D' : '#F59E0B',
                          color: isActive ? '#FCD34D' : '#F59E0B',
                          filter: isActive ? 'drop-shadow(0 2px 4px rgba(245,158,11,0.4))' : 'none',
                        }} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote icon — subtle pulse on active */}
                  <motion.div
                    animate={isActive ? { scale:[1,1.1,1] } : { scale:1 }}
                    transition={{ duration:2.5, repeat: isActive ? Infinity : 0, ease:'easeInOut' }}
                    className="mb-3"
                  >
                    <Quote
                      size={22}
                      style={{
                        color: isActive ? av.text : '#CBD5E1',
                        opacity: isActive ? 0.6 : 0.5,
                        transform:'scaleX(-1)',
                      }}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Quote text */}
                  <p className="text-sm leading-relaxed mb-6 flex-grow"
                    style={{color: isActive ? '#1E293B' : '#475569'}}>
                    {item.quote}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-3">
                    {/* Avatar — pulses on active */}
                    <motion.div
                      animate={isActive ? { scale:[1, 1.06, 1] } : { scale:1 }}
                      transition={{ duration:2.5, repeat: isActive ? Infinity : 0, ease:'easeInOut' }}
                      className="flex items-center justify-center rounded-full shrink-0 font-bold transition-shadow duration-500"
                      style={{
                        width:'44px', height:'44px',
                        background: av.bg,
                        border:`1.5px solid ${av.border}`,
                        color: av.text,
                        fontFamily:'Urbanist,sans-serif',
                        fontSize:'0.95rem',
                        boxShadow: isActive ? `0 6px 18px ${av.glow}` : 'none',
                      }}
                    >
                      {initials(item.name)}
                    </motion.div>
                    <div>
                      <p className="font-bold text-sm" style={{color:'#0F172A'}}>
                        {item.name}
                      </p>
                      <p className="text-xs" style={{color:'#64748B'}}>
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom controls — prev / dots / next */}
          <motion.div
            initial={{opacity:0, y:12}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{delay:0.6, duration:0.5, ease}}
            className="flex items-center justify-center gap-5"
          >
            {/* Prev */}
            <motion.button
              onClick={goPrev}
              whileHover={{ scale:1.1, x:-2 }}
              whileTap={{ scale:0.95 }}
              className="flex items-center justify-center rounded-full transition-colors"
              style={{
                width:'40px', height:'40px',
                background:'rgba(255,255,255,0.7)',
                backdropFilter:'blur(14px)',
                WebkitBackdropFilter:'blur(14px)',
                border:'1px solid rgba(255,255,255,0.85)',
                color:'#475569',
                boxShadow:'0 4px 12px rgba(15,23,42,0.06)',
              }}
              onMouseEnter={e=>(e.currentTarget.style.color='#1B4ED8')}
              onMouseLeave={e=>(e.currentTarget.style.color='#475569')}
              aria-label="Previous"
            >
              <ChevronLeft size={18} strokeWidth={2.2}/>
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimoniData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    height:'4px',
                    width: active === i ? '32px' : '12px',
                    background: active === i
                      ? 'linear-gradient(90deg,#1B4ED8,#3B82F6)'
                      : 'rgba(15,23,42,0.18)',
                    boxShadow: active === i ? '0 2px 8px rgba(27,78,216,0.35)' : 'none',
                  }}
                  aria-label={`Go to testimoni ${i+1}`}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={goNext}
              whileHover={{ scale:1.1, x:2 }}
              whileTap={{ scale:0.95 }}
              className="flex items-center justify-center rounded-full transition-colors"
              style={{
                width:'40px', height:'40px',
                background:'rgba(255,255,255,0.7)',
                backdropFilter:'blur(14px)',
                WebkitBackdropFilter:'blur(14px)',
                border:'1px solid rgba(255,255,255,0.85)',
                color:'#475569',
                boxShadow:'0 4px 12px rgba(15,23,42,0.06)',
              }}
              onMouseEnter={e=>(e.currentTarget.style.color='#1B4ED8')}
              onMouseLeave={e=>(e.currentTarget.style.color='#475569')}
              aria-label="Next"
            >
              <ChevronRight size={18} strokeWidth={2.2}/>
            </motion.button>
          </motion.div>

          {/* Auto-rotate indicator hint */}
          <motion.p
            initial={{opacity:0}}
            whileInView={{opacity:0.5}}
            viewport={{once:true}}
            transition={{delay:1, duration:0.6}}
            className="text-center text-[10px] mt-4 uppercase tracking-[0.2em] font-bold"
            style={{color:'#94A3B8'}}
          >
            {paused ? 'Paused' : 'Auto-rotating'}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
