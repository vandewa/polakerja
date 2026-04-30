'use client'
import { MessageCircle } from 'lucide-react'
import { WA_LINK } from '@/lib/data'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {hovered && (
        <div
          className="rounded-lg px-3 py-2 text-white text-sm font-semibold whitespace-nowrap shadow-xl"
          style={{ background: '#075E54', boxShadow: '0 4px 20px rgba(7,94,84,0.4)' }}
        >
          Chat via WhatsApp
        </div>
      )}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="pulse-wa flex items-center justify-center rounded-full transition-transform hover:scale-110"
        style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 32px rgba(37,211,102,0.45)',
        }}
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={26} color="#fff" strokeWidth={2} />
      </a>
    </div>
  )
}
