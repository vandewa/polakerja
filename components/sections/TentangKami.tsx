'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react'
import { tentangPoints, WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as [number,number,number,number]

const pointAccents = [
  { ic:'#1B4ED8', bg:'rgba(27,78,216,0.08)',  border:'rgba(27,78,216,0.25)',  glow:'rgba(27,78,216,0.18)' },
  { ic:'#7C3AED', bg:'rgba(124,58,237,0.08)', border:'rgba(124,58,237,0.25)', glow:'rgba(124,58,237,0.18)' },
  { ic:'#059669', bg:'rgba(5,150,105,0.08)',  border:'rgba(5,150,105,0.25)',  glow:'rgba(5,150,105,0.18)' },
  { ic:'#D97706', bg:'rgba(217,119,6,0.08)',  border:'rgba(217,119,6,0.25)',  glow:'rgba(217,119,6,0.18)' },
  { ic:'#DC2626', bg:'rgba(220,38,38,0.08)',  border:'rgba(220,38,38,0.25)',  glow:'rgba(220,38,38,0.18)' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = Math.max(1, Math.ceil(target / (1500/16)))
    const t = setInterval(() => {
      n = Math.min(n + step, target)
      setCount(n)
      if (n >= target) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function TentangKami() {
  return (
    <section id="tentang" className="py-28 relative overflow-hidden">
      {/* Breathing orbs */}
      <motion.div
        animate={{ scale:[1,1.08,1], opacity:[0.7,1,0.7] }}
        transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width:'600px', height:'600px', borderRadius:'50%',
          top:'-50px', right:'-100px',
          background:'radial-gradient(circle,rgba(59,130,246,0.13) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale:[1,1.06,1], opacity:[0.6,0.9,0.6] }}
        transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:1.5 }}
        className="absolute pointer-events-none"
        style={{
          width:'500px', height:'500px', borderRadius:'50%',
          bottom:'-100px', left:'-50px',
          background:'radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT — choreographed entrance */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{once:true, margin:'-50px'}}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* Eyebrow with deco line */}
            <motion.div
              variants={{ hidden:{opacity:0,y:12}, visible:{opacity:1,y:0,transition:{duration:0.5,ease}} }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-1.5"
                style={{color:'#1B4ED8'}}>
                <Sparkles size={11} strokeWidth={2.4}/>
                Tentang Kami
              </span>
              <div className="h-px flex-1 max-w-[100px]"
                style={{background:'linear-gradient(90deg, rgba(27,78,216,0.5), transparent)'}} />
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={{ hidden:{opacity:0,y:24}, visible:{opacity:1,y:0,transition:{duration:0.7,ease}} }}
              className="font-bold mb-5"
              style={{
                fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
                fontFamily:'Urbanist,sans-serif', lineHeight:1.1, color:'#0F172A',
              }}
            >
              Mengapa Memilih<br />
              <span style={{
                background:'linear-gradient(125deg,#1B4ED8,#3B82F6)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>Polakerja Consulting?</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0,transition:{duration:0.6,ease}} }}
              className="text-sm leading-loose mb-8"
              style={{color:'#475569', maxWidth:'420px'}}
            >
              Kami bukan sekadar konsultan — kami partner strategis yang berkomitmen membantu bisnis Anda tumbuh secara terstruktur, patuh terhadap regulasi, dan siap bersaing di level yang lebih tinggi.
            </motion.p>

            {/* Points — interactive list with stagger */}
            <motion.ul
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
              }}
              className="flex flex-col gap-3 mb-10"
            >
              {tentangPoints.map((pt, i) => {
                const ac = pointAccents[i]
                return (
                  <motion.li
                    key={pt}
                    variants={{
                      hidden: { opacity:0, x:-24 },
                      visible: { opacity:1, x:0, transition:{duration:0.5, ease} }
                    }}
                    whileHover={{ x: 6, transition:{duration:0.3, ease} }}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
                    style={{
                      background:'rgba(255,255,255,0.55)',
                      backdropFilter:'blur(14px) saturate(180%)',
                      WebkitBackdropFilter:'blur(14px) saturate(180%)',
                      border:'1px solid rgba(255,255,255,0.75)',
                      boxShadow:'0 2px 8px rgba(15,23,42,0.04)',
                      transition:'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = ac.bg.replace('0.08','0.12')
                      el.style.borderColor = ac.border
                      el.style.boxShadow = `0 8px 24px ${ac.glow}`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(255,255,255,0.55)'
                      el.style.borderColor = 'rgba(255,255,255,0.75)'
                      el.style.boxShadow = '0 2px 8px rgba(15,23,42,0.04)'
                    }}
                  >
                    {/* Check icon — gradient bg, scales+rotates on hover */}
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                      style={{
                        background:`linear-gradient(135deg,${ac.ic},${ac.ic}cc)`,
                        boxShadow:`0 3px 10px ${ac.ic}55`,
                      }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium flex-1" style={{color:'#334155'}}>
                      {pt}
                    </span>
                    {/* Arrow appears on hover */}
                    <ArrowRight size={14} strokeWidth={2.4}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                      style={{color: ac.ic}}/>
                  </motion.li>
                )
              })}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0,transition:{duration:0.5,ease}} }}
              className="flex items-center gap-4"
            >
              <motion.a
                href={WA_LINK} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04, y:-2 }}
                whileTap={{ scale:0.98 }}
                transition={{ duration:0.3, ease }}
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl"
                style={{
                  background:'linear-gradient(135deg,#1B4ED8,#3B82F6)',
                  color:'#fff',
                  boxShadow:'0 8px 28px rgba(27,78,216,0.4)',
                }}
              >
                Hubungi Kami <ArrowRight size={15}/>
              </motion.a>

              <a href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
                className="flex items-center gap-2 text-sm font-medium transition-colors group"
                style={{color:'#94A3B8'}}
                onMouseEnter={e=>(e.currentTarget.style.color='#0F172A')}
                onMouseLeave={e=>(e.currentTarget.style.color='#94A3B8')}>
                {/* Pulsing green dot — "online" indicator */}
                <span className="relative flex w-2 h-2">
                  <motion.span
                    animate={{ scale:[1, 2.2, 1], opacity:[0.6, 0, 0.6] }}
                    transition={{ duration:1.8, repeat:Infinity, ease:'easeOut' }}
                    className="absolute inset-0 rounded-full"
                    style={{ background:'#22C55E' }}
                  />
                  <span className="relative w-2 h-2 rounded-full" style={{background:'#22C55E'}}/>
                </span>
                {PHONE_DISPLAY}
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — interactive photo with continuous animations */}
          <motion.div
            initial={{opacity:0, x:48}}
            whileInView={{opacity:1, x:0}}
            viewport={{once:true, margin:'-50px'}}
            transition={{duration:1, ease, delay:0.2}}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden"
              style={{
                aspectRatio:'4/5',
                boxShadow:'0 40px 80px rgba(15,23,42,0.18), 0 16px 40px rgba(27,78,216,0.1)',
              }}>
              {/* Photo with hover Ken Burns zoom */}
              <motion.div
                whileHover={{ scale:1.06 }}
                transition={{ duration:1.5, ease:'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85"
                  alt="Tim Polakerja Consulting"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Bottom gradient for stats readability */}
              <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
                height:'45%',
                background:'linear-gradient(to top, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.15) 50%, transparent 100%)',
              }}/>

              {/* Top-right "Tersertifikasi" pill — floats + sparkle rotates */}
              <motion.div
                className="absolute top-5 right-5 rounded-full px-4 py-2 flex items-center gap-2"
                animate={{ y:[0, -6, 0] }}
                whileHover={{ scale:1.06 }}
                transition={{
                  y: { duration:4, repeat:Infinity, ease:'easeInOut' },
                  scale: { duration:0.3 },
                }}
                style={{
                  background:'rgba(255,255,255,0.95)',
                  backdropFilter:'blur(24px) saturate(180%)',
                  WebkitBackdropFilter:'blur(24px) saturate(180%)',
                  border:'1px solid rgba(255,255,255,1)',
                  boxShadow:'0 8px 24px rgba(15,23,42,0.15), 0 2px 8px rgba(15,23,42,0.08)',
                }}
              >
                <motion.div
                  animate={{ rotate:[0, 14, -14, 0] }}
                  transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
                >
                  <Sparkles size={13} style={{color:'#1B4ED8'}} strokeWidth={2.4}/>
                </motion.div>
                <span className="text-xs font-bold" style={{color:'#0F172A'}}>Tim Tersertifikasi</span>
              </motion.div>

              {/* Top-left experience badge — floats with offset delay */}
              <motion.div
                className="absolute top-5 left-5 rounded-2xl px-4 py-3 flex items-center gap-3"
                animate={{ y:[0, -8, 0] }}
                whileHover={{ scale:1.06 }}
                transition={{
                  y: { duration:4.5, repeat:Infinity, ease:'easeInOut', delay:0.5 },
                  scale: { duration:0.3 },
                }}
                style={{
                  background:'rgba(255,255,255,0.95)',
                  backdropFilter:'blur(24px) saturate(180%)',
                  WebkitBackdropFilter:'blur(24px) saturate(180%)',
                  border:'1px solid rgba(255,255,255,1)',
                  boxShadow:'0 12px 32px rgba(15,23,42,0.18), 0 4px 12px rgba(15,23,42,0.08)',
                }}
              >
                <motion.div
                  animate={{ scale:[1, 1.08, 1] }}
                  transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{
                    width:'40px', height:'40px',
                    background:'linear-gradient(135deg,#1B4ED8,#3B82F6)',
                    boxShadow:'0 6px 18px rgba(27,78,216,0.45)',
                  }}>
                  <ShieldCheck size={18} color="#fff" strokeWidth={1.8}/>
                </motion.div>
                <div>
                  <p className="font-bold" style={{fontSize:'1.05rem',fontFamily:'Urbanist,sans-serif',lineHeight:1,color:'#0F172A'}}>
                    10+ Tahun
                  </p>
                  <p className="text-[11px] mt-0.5 font-semibold" style={{color:'#475569'}}>Pengalaman</p>
                </div>
              </motion.div>

              {/* Bottom stats panel — slides in + animated counters + hover scale per cell */}
              <motion.div
                initial={{opacity:0, y:24}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.7, delay:1, ease}}
                className="absolute bottom-4 left-4 right-4 rounded-2xl px-3 py-5"
                style={{
                  background:'rgba(255,255,255,0.96)',
                  backdropFilter:'blur(28px) saturate(200%)',
                  WebkitBackdropFilter:'blur(28px) saturate(200%)',
                  border:'1px solid rgba(255,255,255,1)',
                  boxShadow:'0 16px 48px rgba(15,23,42,0.22), 0 4px 16px rgba(15,23,42,0.1)',
                }}
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                  style={{background:'linear-gradient(90deg, transparent, rgba(27,78,216,0.55), transparent)'}}/>

                <div className="grid grid-cols-3 items-center">
                  {[
                    { target:150, suffix:'+', l:'Proyek' },
                    { target:100, suffix:'+', l:'Klien Puas' },
                    { target:98,  suffix:'%', l:'Sukses' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.l}
                      whileHover={{ y:-4, transition:{duration:0.3} }}
                      className="text-center px-2 cursor-pointer group"
                      style={{borderRight: i<2 ? '1px solid rgba(15,23,42,0.1)' : 'none'}}
                    >
                      <p className="font-bold transition-transform duration-300 group-hover:scale-110" style={{
                        fontSize:'clamp(1.4rem,2.6vw,1.85rem)',
                        color:'#0F172A',
                        fontFamily:'Urbanist,sans-serif',
                        lineHeight:1,
                        letterSpacing:'-0.02em',
                      }}>
                        <Counter target={s.target} suffix={s.suffix}/>
                      </p>
                      <p className="text-[10px] mt-1.5 uppercase tracking-[0.15em] font-bold" style={{color:'#475569'}}>
                        {s.l}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
