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
    <footer className="relative overflow-hidden mt-12">
      {/* Top divider */}
      <div className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(15,23,42,0.08), transparent)' }} />

      {/* Subtle orb */}
      <div className="absolute pointer-events-none" style={{
        width:'600px',height:'300px',borderRadius:'50%',top:'-50px',left:'50%',transform:'translateX(-50%)',
        background:'radial-gradient(circle,rgba(27,78,216,0.06) 0%,transparent 65%)',filter:'blur(60px)',
      }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b"
          style={{borderColor:'rgba(15,23,42,0.08)'}}>

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-4"><Logo variant="light"/></div>
            <p className="text-sm leading-loose mb-6" style={{color:'#64748B',maxWidth:'260px'}}>
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>
            <div className="flex flex-col gap-2.5 mb-5">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="glass-sm inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl w-fit transition-all hover:scale-[1.02]"
                style={{color:'#16A34A',borderColor:'rgba(34,197,94,0.25)',background:'rgba(34,197,94,0.08)'}}>
                <MessageCircle size={14}/> Chat via WhatsApp
              </a>
              <a href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
                className="glass-sm inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl w-fit transition-all hover:opacity-80"
                style={{color:'#475569'}}>
                <Phone size={13}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title,items])=>(
            <div key={title} className="md:col-span-2">
              <h4 className="font-bold mb-5 text-sm" style={{fontFamily:'Urbanist,sans-serif',color:'#0F172A'}}>{title}</h4>
              <ul className="flex flex-col gap-3">
                {items.map(l=>(
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors" style={{color:'#64748B'}}
                      onMouseEnter={e=>(e.currentTarget.style.color='#1B4ED8')}
                      onMouseLeave={e=>(e.currentTarget.style.color='#64748B')}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-bold mb-5 text-sm" style={{fontFamily:'Urbanist,sans-serif',color:'#0F172A'}}>Kontak Kami</h4>
            <ul className="flex flex-col gap-4 mb-6">
              {[
                {Icon:Phone, text:PHONE_DISPLAY, href:`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`},
                {Icon:Mail, text:'info@polakerja.id', href:'mailto:info@polakerja.id'},
                {Icon:MapPin, text:'Jl. Terusbagus No. 16, Jakarta Selatan 12560', href:'#'},
              ].map(({Icon,text,href})=>(
                <li key={text} className="flex items-start gap-3">
                  <Icon size={13} className="mt-0.5 shrink-0" style={{color:'#1B4ED8'}}/>
                  <a href={href} className="text-sm leading-relaxed transition-colors" style={{color:'#475569'}}
                    onMouseEnter={e=>(e.currentTarget.style.color='#0F172A')}
                    onMouseLeave={e=>(e.currentTarget.style.color='#475569')}>
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
          style={{color:'#94A3B8'}}>
          <p>© 2024 Polakerja Consulting. All rights reserved.</p>
          <div className="flex gap-5">
            {['Kebijakan Privasi','Syarat & Ketentuan'].map(t=>(
              <a key={t} href="#" className="transition-colors"
                onMouseEnter={e=>(e.currentTarget.style.color='#0F172A')}
                onMouseLeave={e=>(e.currentTarget.style.color='#94A3B8')}>{t}</a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span>Part of</span>
            <div className="relative rounded overflow-hidden shrink-0" style={{width:'14px',height:'14px',background:'#1B4ED8'}}>
              <Image src="/logo-icon.png" alt="" fill className="object-cover" style={{mixBlendMode:'screen'}}/>
            </div>
            <span className="font-medium" style={{color:'#475569'}}>Pola Group</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
