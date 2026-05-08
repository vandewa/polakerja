import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { whatsappConsultUrl } from '@/lib/data'

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Layanan: [
    { label: 'Sertifikasi ISO', href: '#layanan' },
    { label: 'Legalitas & Perizinan', href: '#layanan' },
    { label: 'SBU & SKK', href: '#layanan' },
    { label: 'Sistem Manajemen', href: '#layanan' },
    { label: 'Pendampingan', href: '#layanan' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Karir', href: '#' },
    { label: 'Kontak', href: '#kontak' },
  ],
}

const WhatsAppGlyph = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.05 4.91A10.05 10.05 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.44 1.34 4.95L2 22l5.2-1.36A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.68-1.04-5.2-2.95-7.09Zm-7.05 15.4c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.07.8.82-3-.2-.31A8.2 8.2 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4a8.18 8.18 0 0 1 2.4 5.8c0 4.52-3.68 8.3-8.2 8.3Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.79.97-.15.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.24a7.6 7.6 0 0 1-1.41-1.74c-.15-.25-.02-.39.11-.51.12-.12.25-.29.38-.43.13-.15.16-.25.25-.43.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.84-.2-.48-.4-.42-.55-.42l-.47-.01a.9.9 0 0 0-.66.31c-.23.25-.86.84-.86 2.04 0 1.21.88 2.37 1 2.54.13.16 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.18 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.12-.23-.18-.48-.31Z"/>
  </svg>
)

const InstagramGlyph = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="text-white pt-12 sm:pt-16 pb-8" style={{ backgroundColor: '#162D4A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <div className="mb-4"><Logo variant="dark" /></div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-blue-200 text-sm hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div id="kontak" className="scroll-mt-24">
            <h4 className="font-bold text-white mb-4">Kontak Kami</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0" style={{ color: '#60A5FA' }}>
                  <WhatsAppGlyph size={14} />
                </span>
                <a
                  href={whatsappConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  +62 815-1305-0035
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: '#60A5FA' }} />
                <a
                  href="mailto:info@polakerja.id"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  info@polakerja.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0" style={{ color: '#60A5FA' }}>
                  <InstagramGlyph size={14} />
                </span>
                <a
                  href="https://www.instagram.com/polakerja.id?igsh=MTg0amxvMzFsajE1dA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  @polakerja.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#60A5FA' }} />
                <span className="text-blue-200 leading-relaxed">
                  Jl. Dirgantara Raya. Arcadia Residence No. B8,<br />Jatiasih, Bekasi 17426
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-300 text-xs">
          <p>© 2026 Polakerja Consulting. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Part of</span>
            <div
              className="relative rounded overflow-hidden shrink-0"
              style={{ width: 14, height: 14, background: '#1B4ED8' }}
            >
              <Image
                src="/logo-icon.png"
                alt=""
                fill
                className="object-cover"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <span className="text-white font-semibold">Pola Group</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
