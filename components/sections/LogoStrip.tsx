import { clientNames } from '@/lib/data'

const repeated = [...clientNames, ...clientNames]

export default function LogoStrip() {
  return (
    <div className="glass-sm" style={{ borderTop:'1px solid rgba(255,255,255,0.85)', borderBottom:'1px solid rgba(255,255,255,0.85)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] mb-3"
          style={{ color:'#64748B' }}>
          Dipercaya lebih dari 100 perusahaan di Indonesia
        </p>
      </div>
      <div className="overflow-hidden pb-5"
        style={{ maskImage:'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
        <div className="flex gap-12 animate-marquee whitespace-nowrap" style={{width:'max-content'}}>
          {repeated.map((name,i) => (
            <span key={i} className="text-xs font-semibold shrink-0"
              style={{ color:'#94A3B8', letterSpacing:'0.04em' }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
