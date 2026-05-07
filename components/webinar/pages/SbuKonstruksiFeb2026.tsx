import type { WebinarPageProps } from './registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function SbuKonstruksiFeb2026({ webinar }: WebinarPageProps) {
  return (
    <div className="bg-amber-50">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        durationMinutes={webinar.durationMinutes}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        className="bg-gradient-to-br from-amber-100 via-amber-50 to-white"
      />
      <LearningOutcomes
        variant="list"
        items={[
          'Aturan SBU Konstruksi 2026 yang berubah',
          'Persiapan dokumen tanpa calo',
          'Estimasi biaya & waktu realistis',
          'Strategi naik kualifikasi',
        ]}
      />
      <SpeakerCard speakers={webinar.speakers.map((s) => ({ ...s, bio: 'Konsultan SBU dengan portofolio 100+ perusahaan konstruksi.' }))} />
      <InvestmentBlock price={webinar.price} mayarUrl={webinar.mayarUrl} />
      <WebinarFAQ
        items={[
          { q: 'Saya pemula, apakah cocok?', a: 'Cocok. Materi disusun dari nol.' },
          { q: 'Recording?', a: 'Ya, dikirim H+1.' },
        ]}
      />
    </div>
  )
}
