'use client'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, CheckCircle2 } from 'lucide-react'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const trust = ['Konsultasi GRATIS','Respons < 1 Jam','Tanpa Komitmen','10+ Tahun Pengalaman']

export default function CTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Strong centered orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{position:'absolute',width:'900px',height:'500px',borderRadius:'50%',
          top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          background:'radial-gradient(circle,rgba(27,78,216,0.18) 0%,transparent 65%)',
          filter:'blur(60px)'}}/>
        <div style={{position:'absolute',width:'600px',height:'400px',borderRadius:'50%',
          top:'30%',left:'20%',
          background:'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 65%)',
          filter:'blur(60px)'}}/>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
          className="glass-strong rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
          style={{boxShadow:'0 32px 100px rgba(27,78,216,0.18), 0 8px 40px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.95)'}}
        >
          {/* Top gradient line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
            style={{background:'linear-gradient(90deg,transparent,rgba(27,78,216,0.5),transparent)'}}/>

          <span className="glass-sm inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
            style={{color:'#1B4ED8'}}>
            Mulai Sekarang
          </span>

          <h2 className="font-bold mb-4" style={{
            fontSize:'clamp(1.8rem,4vw,3rem)',letterSpacing:'-0.025em',
            fontFamily:'Urbanist,sans-serif',lineHeight:1.1, color:'#0F172A',
          }}>
            Siap Meningkatkan Sistem<br />
            <span style={{
              background:'linear-gradient(125deg,#1B4ED8,#3B82F6)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            }}>dan Kepatuhan Bisnis Anda?</span>
          </h2>

          <p className="text-sm leading-loose mb-10" style={{color:'#475569',maxWidth:'460px',margin:'0 auto 40px'}}>
            Konsultasikan kebutuhan Anda dengan tim ahli kami. Gratis, cepat, dan tanpa komitmen apapun.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.03] w-full sm:w-auto justify-center"
              style={{background:'linear-gradient(135deg,#22C55E,#16A34A)',color:'#fff',
                fontSize:'0.95rem',boxShadow:'0 10px 40px rgba(34,197,94,0.4)'}}>
              <MessageCircle size={19} strokeWidth={2} />
              Konsultasi via WhatsApp
            </a>
            <a href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
              className="glass inline-flex items-center gap-2.5 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] w-full sm:w-auto justify-center"
              style={{color:'#0F172A',fontSize:'0.95rem'}}>
              <Phone size={17} />
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {trust.map(t=>(
              <div key={t} className="flex items-center gap-1.5 text-xs" style={{color:'#64748B'}}>
                <CheckCircle2 size={12} style={{color:'#1B4ED8'}}/>
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
