import { Globe, Share2, Rss } from 'lucide-react'
import Logo from '@/components/layout/Logo'

const footerLinks = {
  Layanan: ['Sertifikasi ISO', 'Legalitas & Perizinan', 'SBU & SKK', 'Sistem Manajemen', 'Pendampingan'],
  Perusahaan: ['Tentang Kami', 'Blog', 'Karir', 'Kontak'],
}

export default function Footer() {
  return (
    <footer className="text-white pt-16 pb-8" style={{ backgroundColor: '#162D4A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <div className="mb-4"><Logo variant="dark" /></div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Partner terpercaya untuk ISO, Legalitas & Perizinan, dan Sistem Manajemen bisnis Anda.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, Rss].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#1B4ED8] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-200 text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-bold text-white mb-4">Kontak Kami</h4>
            <ul className="flex flex-col gap-3 text-blue-200 text-sm">
              <li>+62 852-3456-7890</li>
              <li>info@polakerja.id</li>
              <li className="leading-relaxed">Jl. Terusbagus No. 16,<br />Jakarta Selatan, DKI Jakarta 12560</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-300 text-xs">
          <p>© 2024 Polakerja Consulting. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
          <p>Part of <span className="text-white font-semibold">Pola Group</span></p>
        </div>
      </div>
    </footer>
  )
}
