import Image from 'next/image'

interface LogoProps {
  variant?: 'light' | 'dark'
}

export default function Logo({ variant = 'light' }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <div className="flex items-center gap-2.5">
      {/* P icon — blue square bg on light, blend on dark */}
      <div
        className="relative shrink-0 rounded-lg overflow-hidden"
        style={{
          width: '38px',
          height: '38px',
          background: isLight ? '#1B4ED8' : 'transparent',
        }}
      >
        <Image
          src="/logo-icon.png"
          alt="Polakerja icon"
          fill
          className="object-cover"
          style={{ mixBlendMode: 'screen' }}
          priority
        />
      </div>

      {/* Text stack */}
      <div className="flex flex-col leading-none">
        <span
          className="font-extrabold tracking-tight"
          style={{
            fontSize: '1.05rem',
            color: isLight ? '#1E3A5F' : '#ffffff',
            lineHeight: 1.2,
          }}
        >
          Polakerja
          <span style={{ color: isLight ? '#1B4ED8' : '#93C5FD' }}>.id</span>
        </span>
        <span
          className="uppercase tracking-[0.18em]"
          style={{
            fontSize: '0.5rem',
            color: isLight ? '#9CA3AF' : '#93C5FD',
            letterSpacing: '0.18em',
          }}
        >
          consulting
        </span>
      </div>
    </div>
  )
}
