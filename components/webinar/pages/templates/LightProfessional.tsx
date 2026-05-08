import type { WebinarPageProps } from '../registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import WebinarPitch from '@/components/webinar/blocks/WebinarPitch'
import AudienceTarget from '@/components/webinar/blocks/AudienceTarget'
import AgendaTimeline from '@/components/webinar/blocks/AgendaTimeline'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import BonusList from '@/components/webinar/blocks/BonusList'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'

export default function __TEMPLATE_NAME__({ webinar }: WebinarPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <WebinarPitch>
          <p className="text-xl leading-relaxed text-slate-600">
            {webinar.description}
          </p>
        </WebinarPitch>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Cocok Untuk</h2>
        <AudienceTarget
          items={[
            'Profesional yang sedang memulai perjalanan ini',
            'Tim/manager yang ingin meningkatkan skill',
            'Pemilik bisnis yang ingin scaling',
            'Konsultan yang butuh referensi terkini',
          ]}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Agenda</h2>
        <AgendaTimeline
          items={[
            { time: '00:00', title: 'Pembukaan' },
            { time: '00:10', title: 'Materi inti bagian 1' },
            { time: '00:40', title: 'Materi inti bagian 2' },
            { time: '01:10', title: 'Q&A interaktif' },
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

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Bonus untuk Peserta</h2>
        <BonusList
          items={[
            { icon: 'FileText', label: 'E-book ringkasan materi' },
            { icon: 'CheckSquare', label: 'Checklist actionable siap pakai' },
            { icon: 'Video', label: 'Akses rekaman 1 tahun' },
          ]}
        />
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20">
        <InvestmentBlock
          price={webinar.price}
          earlyBirdPrice={webinar.earlyBirdPrice}
          earlyBirdEndsAt={webinar.earlyBirdEndsAt}
          mayarUrl={webinar.mayarUrl}
        />
      </section>
    </div>
  )
}
