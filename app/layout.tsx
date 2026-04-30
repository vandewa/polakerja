import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Polakerja Consulting — ISO, Legalitas & Perizinan Terpercaya',
  description: 'Kami membantu perusahaan membangun sistem manajemen yang efektif, memenuhi standar, dan siap bersaing di tingkat global.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  )
}
