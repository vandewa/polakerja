import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Polakerja Consulting — ISO, Legalitas & Perizinan Terpercaya',
  description: 'Kami membantu perusahaan membangun sistem manajemen yang efektif, memenuhi standar, dan siap bersaing di tingkat global.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased" style={{ background: '#05091A', color: '#fff' }}>
        {/* Fixed atmospheric background — blue orbs that show through all glass elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div style={{
            position: 'absolute', borderRadius: '50%',
            width: '900px', height: '900px',
            background: 'radial-gradient(circle, rgba(27,78,216,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '-200px', left: '-200px',
          }} />
          <div style={{
            position: 'absolute', borderRadius: '50%',
            width: '700px', height: '700px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '40%', right: '-150px',
          }} />
          <div style={{
            position: 'absolute', borderRadius: '50%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            bottom: '10%', left: '35%',
          }} />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
