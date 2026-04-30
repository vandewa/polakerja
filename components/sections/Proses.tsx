'use client'
import { motion } from 'framer-motion'
import { MessageCircle, ClipboardList, Zap, Search, Award, Sparkles, ArrowUpRight } from 'lucide-react'
import { prosesData, WA_LINK } from '@/lib/data'

const iconMap: Record<string,React.ElementType> = {
  MessageCircle, ClipboardList, Zap, Search, Award,
}

const steps = [
  { gradient:'linear-gradient(135deg,#1B4ED8,#3B82F6)', glow:'rgba(27,78,216,0.28)',  badge:'#1B4ED8', glowSoft:'rgba(59,130,246,0.10)',  borderHover:'rgba(59,130,246,0.3)' },
  { gradient:'linear-gradient(135deg,#7C3AED,#A78BFA)', glow:'rgba(124,58,237,0.28)', badge:'#7C3AED', glowSoft:'rgba(139,92,246,0.10)',  borderHover:'rgba(139,92,246,0.3)' },
  { gradient:'linear-gradient(135deg,#059669,#34D399)', glow:'rgba(5,150,105,0.28)',  badge:'#059669', glowSoft:'rgba(16,185,129,0.10)',  borderHover:'rgba(16,185,129,0.3)' },
  { gradient:'linear-gradient(135deg,#D97706,#FCD34D)', glow:'rgba(217,119,6,0.28)',  badge:'#D97706', glowSoft:'rgba(245,158,11,0.10)',  borderHover:'rgba(245,158,11,0.3)' },
  { gradient:'linear-gradient(135deg,#DC2626,#F87171)', glow:'rgba(220,38,38,0.28)',  badge:'#DC2626', glowSoft:'rgba(239,68,68,0.10)',   borderHover:'rgba(239,68,68,0.3)' },
]

const ease = [0.22, 1, 0.36, 1] as [number,number,number,number]

export default function Proses() {
  return (
    <section id="proses" className="py-28 relative overflow-hidden">
      {/* Orbs — subtle breathing */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width:'700px', height:'400px', borderRadius:'50%',
          top:'30%', left:'50%', transform:'translateX(-50%)',
          background:'radial-gradient(circle,rgba(27,78,216,0.10) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute pointer-events-none"
        style={{
          width:'500px', height:'400px', borderRadius:'50%',
          bottom:'-50px', right:'-50px',
          background:'radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 65%)',
          filter:'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — staggered entrance */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{once:true, margin:'-50px'}}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="text-center mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } }
            }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-10" style={{background:'linear-gradient(90deg, transparent, rgba(27,78,216,0.5))'}} />
            <span className="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-1.5"
              style={{color:'#1B4ED8'}}>
              <Sparkles size={11} strokeWidth={2.4}/>
              Proses Kami
            </span>
            <div className="h-px w-10" style={{background:'linear-gradient(90deg, rgba(27,78,216,0.5), transparent)'}} />
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } }
            }}
            className="font-bold mb-5"
            style={{
              fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.025em',
              fontFamily:'Urbanist,sans-serif', lineHeight:1.1, color:'#0F172A',
            }}
          >
            Pendekatan Sistematis,{' '}
            <span style={{
              background:'linear-gradient(125deg,#1B4ED8 0%, #3B82F6 50%, #6366F1 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>Hasil Optimal</span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
            }}
            className="max-w-2xl mx-auto text-sm leading-relaxed" style={{color:'#475569'}}
          >
            Setiap proyek mengikuti 5 tahap terstruktur — dari konsultasi awal hingga sertifikat terbit, kami pastikan tidak ada langkah yang terlewat.
          </motion.p>
        </motion.div>

        {/* Steps grid — choreographed entrance */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{once:true, margin:'-80px'}}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10"
        >
          {prosesData.map((item, i) => {
            const Icon = iconMap[item.icon]
            const c = steps[i]
            return (
              <motion.div
                key={item.step}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.7, ease },
                  }
                }}
                whileHover={{ y: -10, transition: { duration: 0.35, ease } }}
                className="relative rounded-2xl p-6 flex flex-col items-center text-center gap-4 group cursor-pointer overflow-hidden"
                style={{
                  background:'rgba(255,255,255,0.55)',
                  backdropFilter:'blur(22px) saturate(180%)',
                  WebkitBackdropFilter:'blur(22px) saturate(180%)',
                  border:'1px solid rgba(255,255,255,0.75)',
                  boxShadow:'0 8px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                  transition:'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = `linear-gradient(180deg, ${c.glowSoft}, rgba(255,255,255,0.55))`
                  el.style.borderColor = c.borderHover
                  el.style.boxShadow = `0 14px 36px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.95)`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.55)'
                  el.style.borderColor = 'rgba(255,255,255,0.75)'
                  el.style.boxShadow = '0 8px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)'
                }}
              >
                {/* Top accent line — subtle on hover */}
                <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                  style={{background:`linear-gradient(90deg, transparent, ${c.badge}, transparent)`}}/>

                {/* Step label */}
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 0.75, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.13 + 0.55, duration: 0.4 }}
                  className="relative z-10 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{color: c.badge}}
                >
                  Langkah {String(item.step).padStart(2,'0')}
                </motion.span>

                {/* Icon container with badge */}
                <div className="relative z-10">
                  {/* Icon — spring in on entrance, smooth scale+rotate on hover */}
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.13 + 0.25,
                      type: 'spring',
                      stiffness: 180,
                      damping: 15,
                    }}
                    className="flex items-center justify-center rounded-2xl shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      width:'72px', height:'72px',
                      background: c.gradient,
                      boxShadow:`0 10px 24px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
                    }}>
                    <Icon size={28} color="#fff" strokeWidth={2}/>
                  </motion.div>

                  {/* Step number badge — pops in after icon */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.13 + 0.65,
                      type: 'spring',
                      stiffness: 280,
                      damping: 16,
                    }}
                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white font-extrabold transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width:'28px', height:'28px',
                      background: c.badge,
                      boxShadow:`0 4px 10px ${c.glow}`,
                      border:'3px solid #FAFBFD',
                      fontSize:'0.78rem',
                      fontFamily:'Urbanist,sans-serif',
                    }}>
                    {item.step}
                  </motion.span>
                </div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.13 + 0.8, duration: 0.45, ease }}
                  className="relative z-10 font-bold"
                  style={{fontSize:'1rem',fontFamily:'Urbanist,sans-serif',color:'#0F172A'}}
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.13 + 0.9, duration: 0.45, ease }}
                  className="relative z-10 text-xs leading-relaxed"
                  style={{color:'#64748B'}}
                >
                  {item.description}
                </motion.p>

                {/* "Pelajari" link — slides in on hover */}
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 -mt-1 group-hover:gap-2"
                  style={{color: c.badge}}
                >
                  Pelajari Lebih Lanjut <ArrowUpRight size={12} strokeWidth={2.5}/>
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
