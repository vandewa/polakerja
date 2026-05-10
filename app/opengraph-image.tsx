import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const alt = 'Polakerja Consulting — Konsultan ISO, Legalitas, dan Perizinan Terpercaya'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const svgBuffer = await readFile(path.join(process.cwd(), 'public/LM_White_BG.svg'))
  const logoSrc = `data:image/svg+xml;base64,${svgBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '72px 80px',
          background:
            'linear-gradient(135deg, #1B4ED8 0%, #1E40AF 50%, #0F172A 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative blob */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(96,165,250,0.40), transparent 70%)',
            filter: 'blur(60px)',
            display: 'flex',
          }}
        />

        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={72}
            height={72}
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>
              Polakerja.id
            </div>
            <div
              style={{
                fontSize: 14,
                opacity: 0.7,
                letterSpacing: 5,
                marginTop: 2,
              }}
            >
              CONSULTING
            </div>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
            marginBottom: 24,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Bangun Sistem.</span>
          <span>Pastikan Kepatuhan.</span>
          <span style={{ color: '#60A5FA' }}>Dorong Pertumbuhan.</span>
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: 24,
            opacity: 0.88,
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          Konsultan ISO, Legalitas, dan Perizinan Terpercaya untuk Bisnis Anda
        </div>

        {/* Footer pills */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            bottom: 56,
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          {['Sertifikasi ISO', 'Legalitas', 'SBU & SKK', 'Sistem Manajemen', 'Pendampingan'].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 16,
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                display: 'flex',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
