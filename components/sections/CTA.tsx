'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Phone, CheckCircle2, Sparkles } from 'lucide-react'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const ease = [0.22,1,0.36,1] as [number,number,number,number]

const trust = ['Konsultasi GRATIS','Respons < 1 Jam','Tanpa Komitmen','10+ Tahun Pengalaman']

function MiniCounter({ target, suffix }: { target:number; suffix:string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once:true })
  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = Math.max(1, Math.ceil(target / (1500/16)))
    const t = setInterval(() => {
      n = Math.min(n+step, target)
      setCount(n)
      if (n >= target) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function CTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Multiple breathing orbs */}
      <motion.div
        animate={{ scale:[1,1.1,1], opacity:[0.7,1,0.7] }}
        transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width:'900px', height:'500px', borderRadius:'50%',
          top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          background:'radial-gradient(circle,rgba(27,78,216,0.18) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale:[1,1.06,1], opacity:[0.5,0.8,0.5] }}
        transition={{ duration:10, repeat:Infinity, ease:'easeInOut', delay:1 }}
        className="absolute pointer-events-none"
        style={{
          width:'600px', height:'400px', borderRadius:'50%',
          top:'30%', left:'20%',
          background:'radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale:[1,1.08,1], opacity:[0.4,0.7,0.4] }}
        transition={{ duration:12, repeat:Infinity, ease:'easeInOut', delay:2 }}
        className="absolute pointer-events-none"
        style={{
          width:'500px', height:'400px', borderRadius:'50%',
          bottom:'20%', right:'15%',
          background:'radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating decorative elements — outer (entrance) + inner (continuous) */}
        <motion.div
          initial={{ opacity:0, scale:0 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ delay:0.6, duration:0.6, type:'spring', stiffness:180, damping:14 }}
          className="absolute pointer-events-none z-20"
          style={{ top:'-20px', left:'-30px' }}
        >
          <motion.div
            animate={{ y:[0, -12, 0], rotate:[0, 8, 0] }}
            transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
            className="flex items-center justify-center w-12 h-12 rounded-2xl"
            style={{
              background:'linear-gradient(135deg, #FCD34D, #F59E0B)',
              boxShadow:'0 12px 32px rgba(245,158,11,0.45)',
            }}
          >
            <Sparkles size={20} color="#fff" strokeWidth={2.4}/>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity:0, scale:0 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ delay:0.8, duration:0.6, type:'spring', stiffness:180, damping:14 }}
          className="absolute pointer-events-none z-20 hidden md:block"
          style={{ top:'40%', right:'-20px' }}
        >
          <motion.div
            animate={{ y:[0, 8, 0], rotate:[0, -5, 0] }}
            transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut' }}
            className="w-3 h-3 rounded-full"
            style={{
              background:'linear-gradient(135deg, #3B82F6, #6366F1)',
              boxShadow:'0 4px 16px rgba(59,130,246,0.6)',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity:0, scale:0 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ delay:1, duration:0.6, type:'spring', stiffness:180, damping:14 }}
          className="absolute pointer-events-none z-20 hidden md:block"
          style={{ bottom:'10%', left:'-15px' }}
        >
          <motion.div
            animate={{ y:[0, -8, 0] }}
            transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
            className="w-4 h-4 rounded-full"
            style={{
              background:'linear-gradient(135deg, #8B5CF6, #A78BFA)',
              boxShadow:'0 4px 16px rgba(139,92,246,0.6)',
            }}
          />
        </motion.div>

        {/* Animated gradient border wrapper */}
        <motion.div
          initial={{ opacity:0, y:30, scale:0.96 }}
          whileInView={{ opacity:1, y:0, scale:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, ease }}
          className="relative rounded-3xl p-[1.5px] animate-gradient-flow"
          style={{
            background:'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 25%, #6366F1 50%, #8B5CF6 75%, #1B4ED8 100%)',
            backgroundSize:'300% 300%',
            boxShadow:'0 32px 100px rgba(27,78,216,0.18), 0 8px 40px rgba(15,23,42,0.08)',
          }}
        >
          <div
            className="rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
            style={{
              background:'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter:'blur(32px) saturate(200%)',
              WebkitBackdropFilter:'blur(32px) saturate(200%)',
            }}
          >
            {/* Live consultation counter pill */}
            <motion.div
              initial={{ opacity:0, y:-12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.3, duration:0.5, ease }}
              className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full"
              style={{
                background:'rgba(34,197,94,0.1)',
                border:'1px solid rgba(34,197,94,0.25)',
              }}
            >
              <span className="relative flex w-2 h-2">
                <motion.span
                  animate={{ scale:[1, 2.3, 1], opacity:[0.7, 0, 0.7] }}
                  transition={{ duration:1.6, repeat:Infinity, ease:'easeOut' }}
                  className="absolute inset-0 rounded-full"
                  style={{ background:'#22C55E' }}
                />
                <span className="relative w-2 h-2 rounded-full" style={{ background:'#22C55E' }}/>
              </span>
              <span className="text-xs font-bold" style={{ color:'#16A34A' }}>
                <MiniCounter target={47} suffix="" /> orang konsultasi minggu ini
              </span>
            </motion.div>

            <motion.span
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.4, duration:0.5, ease }}
              className="glass-sm inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
              style={{ color:'#1B4ED8' }}
            >
              <Sparkles size={11} strokeWidth={2.4}/>
              Mulai Sekarang
            </motion.span>

            <motion.h2
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.5, duration:0.7, ease }}
              className="font-bold mb-4"
              style={{
                fontSize:'clamp(1.8rem,4vw,3rem)', letterSpacing:'-0.025em',
                fontFamily:'Urbanist,sans-serif', lineHeight:1.1, color:'#0F172A',
              }}
            >
              Siap Meningkatkan Sistem<br />
              <span style={{
                background:'linear-gradient(125deg,#1B4ED8,#3B82F6,#6366F1)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>dan Kepatuhan Bisnis Anda?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.6, duration:0.5, ease }}
              className="text-sm leading-loose mb-10"
              style={{ color:'#475569', maxWidth:'460px', margin:'0 auto 40px' }}
            >
              Konsultasikan kebutuhan Anda dengan tim ahli kami. Gratis, cepat, dan tanpa komitmen apapun.
            </motion.p>

            {/* CTA Buttons — premium with rich interactions */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.7, duration:0.5, ease }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <motion.a
                href={WA_LINK}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.05, y:-3 }}
                whileTap={{ scale:0.97 }}
                transition={{ duration:0.3 }}
                className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl w-full sm:w-auto justify-center group relative overflow-hidden"
                style={{
                  background:'linear-gradient(135deg,#22C55E,#16A34A)',
                  color:'#fff',
                  fontSize:'0.95rem',
                  boxShadow:'0 12px 40px rgba(34,197,94,0.45)',
                }}
              >
                {/* Shine sweep on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background:'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)' }}
                />
                <motion.div
                  animate={{ scale:[1, 1.15, 1] }}
                  transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
                  className="relative z-10"
                >
                  <MessageCircle size={19} strokeWidth={2.2}/>
                </motion.div>
                <span className="relative z-10">Konsultasi via WhatsApp</span>
                <motion.span
                  animate={{ x:[0, 4, 0] }}
                  transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
                  className="relative z-10"
                >→</motion.span>
              </motion.a>

              <motion.a
                href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
                whileHover={{ scale:1.04, y:-2 }}
                whileTap={{ scale:0.97 }}
                transition={{ duration:0.3 }}
                className="inline-flex items-center gap-2.5 font-semibold px-8 py-4 rounded-xl w-full sm:w-auto justify-center group"
                style={{
                  background:'rgba(255,255,255,0.7)',
                  backdropFilter:'blur(14px) saturate(180%)',
                  WebkitBackdropFilter:'blur(14px) saturate(180%)',
                  border:'1px solid rgba(255,255,255,0.85)',
                  color:'#0F172A',
                  fontSize:'0.95rem',
                  boxShadow:'0 4px 16px rgba(15,23,42,0.06)',
                }}
              >
                <Phone size={17}/>
                {PHONE_DISPLAY}
              </motion.a>
            </motion.div>

            {/* Trust row with staggered reveal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once:true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren:0.08, delayChildren:0.9 } }
              }}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            >
              {trust.map(t => (
                <motion.div
                  key={t}
                  variants={{
                    hidden: { opacity:0, y:8 },
                    visible: { opacity:1, y:0, transition:{ duration:0.4, ease } }
                  }}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color:'#64748B' }}
                >
                  <CheckCircle2 size={12} style={{ color:'#1B4ED8' }}/>
                  {t}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
