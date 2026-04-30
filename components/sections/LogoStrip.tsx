import { clientNames } from '@/lib/data'

const repeated = [...clientNames, ...clientNames]

export default function LogoStrip() {
  return (
    <div style={{ background: '#080F1E', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 mb-1">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Dipercaya oleh lebih dari 100 perusahaan di Indonesia
        </p>
      </div>
      <div className="overflow-hidden pb-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex gap-10 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {repeated.map((name, i) => (
            <span
              key={i}
              className="text-sm font-semibold shrink-0"
              style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.03em' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
