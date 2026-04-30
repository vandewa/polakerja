'use client'
import Image from 'next/image'
import { MessageCircle, Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { WA_LINK, PHONE_DISPLAY } from '@/lib/data'

const footerLinks = {
  Layanan: ['Sertifikasi ISO', 'Legalitas & Perizinan', 'SBU & SKK', 'Sistem Manajemen', 'Pendampingan'],
  Perusahaan: ['Tentang Kami', 'Blog', 'Karir', 'Kontak'],
}

export default function Footer() {
  return (
    <footer style={{ background: '#050912' }}>
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)' }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-5">
              <Logo variant="dark" />
            </div>
            <p className="text-sm leading-loose mb-6" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '260px' }}>
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg w-fit transition-all hover:opacity-80"
                style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.18)', color: '#4ADE80' }}
              >
                <MessageCircle size={14} />
                Chat via WhatsApp
              </a>
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}`}
                className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg w-fit transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}
              >
                <Phone size={13} />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4
                className="font-semibold text-white mb-5 text-sm"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-4">
            <h4
              className="font-semibold text-white mb-5 text-sm"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}
            >
              Kontak Kami
            </h4>
            <ul className="flex flex-col gap-4 mb-6">
              {[
                { Icon: Phone, text: PHONE_DISPLAY, href: `tel:${PHONE_DISPLAY.replace(/\s|-/g, '')}` },
                { Icon: Mail, text: 'info@polakerja.id', href: 'mailto:info@polakerja.id' },
                { Icon: MapPin, text: 'Jl. Terusbagus No. 16, Jakarta Selatan 12560', href: '#' },
              ].map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={13} className="mt-0.5 shrink-0" style={{ color: '#3B82F6' }} />
                  <a
                    href={href}
                    className="text-sm leading-relaxed transition-colors"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: '#fff', boxShadow: '0 4px 20px rgba(34,197,94,0.25)' }}
            >
              <MessageCircle size={14} />
              Konsultasi Sekarang
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <p>© 2024 Polakerja Consulting. All rights reserved.</p>
          <div className="flex gap-5">
            {['Kebijakan Privasi', 'Syarat & Ketentuan'].map(t => (
              <a key={t} href="#" className="transition-colors hover:text-white">{t}</a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span>Part of</span>
            <div className="relative overflow-hidden rounded shrink-0" style={{ width: '14px', height: '14px', background: '#1B4ED8' }}>
              <Image src="/logo-icon.png" alt="" fill className="object-cover" style={{ mixBlendMode: 'screen' }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.45)' }} className="font-medium">Pola Group</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
