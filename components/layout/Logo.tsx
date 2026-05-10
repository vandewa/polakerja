import Image from 'next/image'

interface LogoProps {
  variant?: 'light' | 'dark'
}

export default function Logo({ variant = 'light' }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <div className="flex items-center gap-2.5">
      {/* P icon — gradient BG SVG (sama untuk light & dark) */}
      <div
        className="relative shrink-0 rounded-lg overflow-hidden"
        style={{ width: '38px', height: '38px' }}
      >
        <Image
          src="/LM_White_BG.svg"
          alt="Polakerja icon"
          fill
          sizes="38px"
          className="object-cover"
          priority
        />
      </div>

      {/* Text stack */}
      <div className="flex flex-col leading-none">
        <span
          className="font-extrabold tracking-tight"
          style={{
            fontSize: '1.1rem',
            color: isLight ? '#1E3A5F' : '#ffffff',
            lineHeight: 1.1,
          }}
        >
          Polakerja
          <span style={{ color: isLight ? '#1B4ED8' : '#93C5FD', fontWeight: 700 }}>.id</span>
        </span>
        <span
          className="uppercase"
          style={{
            fontSize: '0.52rem',
            letterSpacing: '0.32em',
            color: isLight ? '#9CA3AF' : '#93C5FD',
            marginTop: '4px',
            fontWeight: 600,
          }}
        >
          consulting
        </span>
      </div>
    </div>
  )
}
