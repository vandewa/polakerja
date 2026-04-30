'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { navLinks, PHONE_DISPLAY, WA_LINK } from '@/lib/data'
import Logo from '@/components/layout/Logo'

const sectionIds = ['beranda','layanan','tentang','proses','testimoni']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0)

      // Active section detection
      let current = 'beranda'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id
            break
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.85)',
        boxShadow: scrolled ? '0 4px 32px rgba(15,23,42,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover scale */}
          <motion.a
            href="#beranda"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <Logo variant="light" />
          </motion.a>

          {/* Nav links with active indicator + animated underline */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const id = link.href.replace('#','')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium py-1.5 group transition-colors"
                  style={{ color: isActive ? '#1B4ED8' : '#475569' }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    style={{ background: 'linear-gradient(90deg, #1B4ED8, #3B82F6)' }}
                  />
                </a>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* Phone with live "online" indicator */}
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s|-/g,'')}`}
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: '#94A3B8' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >
              {/* Pulsing online dot */}
              <span className="relative flex w-2 h-2">
                <motion.span
                  animate={{ scale:[1, 2.2, 1], opacity:[0.6, 0, 0.6] }}
                  transition={{ duration:1.8, repeat:Infinity, ease:'easeOut' }}
                  className="absolute inset-0 rounded-full"
                  style={{ background:'#22C55E' }}
                />
                <span className="relative w-2 h-2 rounded-full" style={{ background:'#22C55E' }}/>
              </span>
              <Phone size={13}/>
              {PHONE_DISPLAY}
            </a>

            {/* WA button — premium with icon + hover effects */}
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl group relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1B4ED8 0%, #3B82F6 100%)',
                boxShadow: '0 6px 24px rgba(27,78,216,0.35)',
              }}
            >
              {/* Shine sweep on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
              />
              <MessageCircle size={14} strokeWidth={2.4} className="relative z-10"/>
              <span className="relative z-10">Konsultasi Sekarang</span>
              <motion.span
                animate={{ x:[0, 3, 0] }}
                transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
                className="relative z-10"
              >→</motion.span>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#475569' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'x' : 'menu'}
                initial={{ rotate:-90, opacity:0 }}
                animate={{ rotate:0, opacity:1 }}
                exit={{ rotate:90, opacity:0 }}
                transition={{ duration:0.2 }}
                className="block"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Scroll progress bar at bottom of navbar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-150"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #1B4ED8, #3B82F6, #6366F1)',
          boxShadow: scrollProgress > 0 ? '0 1px 8px rgba(27,78,216,0.4)' : 'none',
        }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:'auto' }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(24px) saturate(180%)',
              borderColor: 'rgba(255,255,255,0.85)',
            }}
          >
            <div className="px-4 py-5 flex flex-col gap-4">
              {navLinks.map((link, i) => {
                const id = link.href.replace('#','')
                const isActive = activeSection === id
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity:0, x:-12 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i*0.05, duration:0.3 }}
                    className="text-sm font-medium py-1 transition-colors"
                    style={{ color: isActive ? '#1B4ED8' : '#334155' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                )
              })}
              <motion.a
                href={WA_LINK}
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.3 }}
                className="inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-xl"
                style={{ background:'linear-gradient(135deg, #1B4ED8, #3B82F6)' }}
              >
                <MessageCircle size={14}/>
                Konsultasi Sekarang →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
