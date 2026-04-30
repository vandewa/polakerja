'use client'
import Image from 'next/image'
import { MessageCircle, Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const footerLinks = {
  Layanan: ['Sertifikasi ISO', 'Legalitas & Perizinan', 'SBU & SKK', 'Sistem Manajemen', 'Pendampingan'],
  Perusahaan: ['Tentang Kami', 'Blog', 'Karir', 'Kontak'],
}

const socialLinks = [
  { label: 'WhatsApp', href: WA_LINK, Icon: MessageCircle },
  { label: 'Telepon', href: `tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`, Icon: Phone },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#060D1A', color: '#fff' }}>
      {/* Top border accent */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>

          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="mb-4">
              <Logo variant="dark" />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '260px' }}>
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>

            {/* Quick contact */}
            <div className="flex flex-col gap-2.5 mb-6">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:scale-[1.02] w-fit"
                style={{
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  color: '#4ADE80',
                }}
              >
                <MessageCircle size={15} />
                Chat via WhatsApp
              </a>
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
                className="inline-flex items-center gap-2.5 text-sm font-medium px-4 py-2.5 rounded-xl transition-all hover:bg-white/5 w-fit"
                style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <Phone size={14} />
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(27,78,216,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  aria-label={label}
                >
                  <Icon size={15} style={{ color: 'rgba(255,255,255,0.55)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="font-bold text-white mb-5 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors group inline-flex items-center gap-1"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-white mb-5 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Kontak Kami</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0" style={{ color: '#60A5FA' }} />
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
                  className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: '#60A5FA' }} />
                <a
                  href="mailto:info@polakerja.id"
                  className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  info@polakerja.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#60A5FA' }} />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Jl. Terusbagus No. 16,<br />Jakarta Selatan, DKI Jakarta 12560
                </p>
              </li>
            </ul>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                color: '#fff',
                boxShadow: '0 6px 24px rgba(34,197,94,0.3)',
              }}
            >
              <MessageCircle size={15} />
              Konsultasi Sekarang
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
          <p>© 2024 Polakerja Consulting. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-white">Kebijakan Privasi</a>
            <a href="#" className="transition-colors hover:text-white">Syarat & Ketentuan</a>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Part of</span>
            <div
              className="relative rounded shrink-0 overflow-hidden"
              style={{ width: '15px', height: '15px', background: '#1B4ED8' }}
            >
              <Image src="/logo-icon.png" alt="" fill className="object-cover" style={{ mixBlendMode: 'screen' }} />
            </div>
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Pola Group</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
