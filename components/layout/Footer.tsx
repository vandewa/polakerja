'use client'
import Image from 'next/image'
import { MessageCircle, Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const links = {
  Layanan: ['Sertifikasi ISO','Legalitas & Perizinan','SBU & SKK','Sistem Manajemen','Pendampingan'],
  Perusahaan: ['Tentang Kami','Blog','Karir','Kontak'],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
      {/* Orb */}
      <div className="absolute pointer-events-none" style={{
        width:'600px',height:'300px',borderRadius:'50%',top:'-50px',left:'50%',transform:'translateX(-50%)',
        background:'radial-gradient(circle,rgba(27,78,216,0.08) 0%,transparent 65%)',filter:'blur(40px)',
      }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b"
          style={{borderColor:'rgba(255,255,255,0.06)'}}>

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-4"><Logo variant="dark"/></div>
            <p className="text-sm leading-loose mb-6" style={{color:'rgba(255,255,255,0.35)',maxWidth:'260px'}}>
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>
            <div className="flex flex-col gap-2.5 mb-5">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="glass-sm inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl w-fit transition-all hover:scale-[1.02]"
                style={{color:'#4ADE80',borderColor:'rgba(34,197,94,0.2)'}}>
                <MessageCircle size={14}/> Chat via WhatsApp
              </a>
              <a href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
                className="glass-sm inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl w-fit transition-all hover:opacity-80"
                style={{color:'rgba(255,255,255,0.35)'}}>
                <Phone size={13}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title,items])=>(
            <div key={title} className="md:col-span-2">
              <h4 className="font-bold text-white mb-5 text-sm" style={{fontFamily:'Urbanist,sans-serif'}}>{title}</h4>
              <ul className="flex flex-col gap-3">
                {items.map(l=>(
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors" style={{color:'rgba(255,255,255,0.32)'}}
                      onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.75)')}
                      onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.32)')}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-white mb-5 text-sm" style={{fontFamily:'Urbanist,sans-serif'}}>Kontak Kami</h4>
            <ul className="flex flex-col gap-4 mb-6">
              {[
                {Icon:Phone, text:PHONE_DISPLAY, href:`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`},
                {Icon:Mail, text:'info@polakerja.id', href:'mailto:info@polakerja.id'},
                {Icon:MapPin, text:'Jl. Terusbagus No. 16, Jakarta Selatan 12560', href:'#'},
              ].map(({Icon,text,href})=>(
                <li key={text} className="flex items-start gap-3">
                  <Icon size={13} className="mt-0.5 shrink-0" style={{color:'#3B82F6'}}/>
                  <a href={href} className="text-sm leading-relaxed transition-colors" style={{color:'rgba(255,255,255,0.32)'}}
                    onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.7)')}
                    onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.32)')}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{background:'linear-gradient(135deg,#22C55E,#16A34A)',color:'#fff',boxShadow:'0 4px 20px rgba(34,197,94,0.3)'}}>
              <MessageCircle size={14}/> Konsultasi Sekarang <ArrowUpRight size={13}/>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{color:'rgba(255,255,255,0.2)'}}>
          <p>© 2024 Polakerja Consulting. All rights reserved.</p>
          <div className="flex gap-5">
            {['Kebijakan Privasi','Syarat & Ketentuan'].map(t=>(
              <a key={t} href="#" className="transition-colors hover:text-white">{t}</a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span>Part of</span>
            <div className="relative rounded overflow-hidden shrink-0" style={{width:'14px',height:'14px',background:'#1B4ED8'}}>
              <Image src="/logo-icon.png" alt="" fill className="object-cover" style={{mixBlendMode:'screen'}}/>
            </div>
            <span className="font-medium" style={{color:'rgba(255,255,255,0.4)'}}>Pola Group</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
