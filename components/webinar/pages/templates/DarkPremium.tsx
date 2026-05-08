import type { WebinarPageProps } from '../registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import WebinarPitch from '@/components/webinar/blocks/WebinarPitch'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import AgendaTimeline from '@/components/webinar/blocks/AgendaTimeline'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function __TEMPLATE_NAME__({ webinar }: WebinarPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        bgImage={webinar.thumbnail}
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <WebinarPitch>
          <p className="text-xl leading-relaxed text-slate-300">
            {webinar.description}
          </p>
        </WebinarPitch>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Yang Akan Kamu Pelajari</h2>
        <LearningOutcomes
          variant="grid"
          items={[
            'Pelajari konsep inti webinar ini step-by-step',
            'Praktikkan langsung lewat studi kasus nyata',
            'Dapatkan template + checklist siap pakai',
            'Tanya-jawab langsung dengan pembicara',
          ]}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Agenda</h2>
        <AgendaTimeline
          items={[
            { time: '00:00', title: 'Pembukaan & perkenalan' },
            { time: '00:10', title: 'Konsep dasar' },
            { time: '00:30', title: 'Studi kasus' },
            { time: '01:00', title: 'Q&A interaktif' },
          ]}
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Pembicara</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {webinar.speakers.map((s) => (
            <SpeakerCard key={s.name} name={s.name} role={s.role} photo={s.photo} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20">
        <InvestmentBlock
          price={webinar.price}
          earlyBirdPrice={webinar.earlyBirdPrice}
          earlyBirdEndsAt={webinar.earlyBirdEndsAt}
          mayarUrl={webinar.mayarUrl}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">FAQ</h2>
        <WebinarFAQ
          items={[
            { q: 'Akan ada rekaman?', a: 'Ya, peserta dapat akses rekaman setelah event.' },
            { q: 'Bagaimana cara dapat link Zoom?', a: 'Setelah pembayaran, link otomatis dikirim ke email.' },
            { q: 'Bisa bayar pakai apa saja?', a: 'Bank transfer, e-wallet, kartu kredit lewat Mayar.' },
          ]}
        />
      </section>
    </div>
  )
}
