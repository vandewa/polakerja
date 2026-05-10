import type { WebinarPageProps } from '../registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import TestimonialQuotes from '@/components/webinar/blocks/TestimonialQuotes'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function __TEMPLATE_NAME__({ webinar }: WebinarPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-fuchsia-600 to-violet-700 text-white">
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        durationMinutes={webinar.durationMinutes}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        className="bg-transparent"
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-5xl font-black">Apa yang Kamu Dapat</h2>
        <LearningOutcomes
          variant="list"
          items={[
            'Insight terbaru dari praktisi langsung',
            'Framework yang langsung bisa diterapkan',
            'Network dengan peserta sefrekuensi',
            'Bonus material eksklusif',
          ]}
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SpeakerCard speakers={webinar.speakers} />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-5xl font-black">Apa Kata Mereka</h2>
        <TestimonialQuotes
          items={[
            { quote: 'Webinar yang sangat aplikatif, langsung bisa dipraktikkan.', name: 'Sari', role: 'Founder UMKM' },
            { quote: 'Materi padat, pembicaranya berpengalaman.', name: 'Rizki', role: 'Manager' },
            { quote: 'Worth banget, harganya tidak sebanding ilmunya.', name: 'Dian', role: 'Konsultan' },
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

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-5xl font-black">FAQ</h2>
        <WebinarFAQ
          items={[
            { q: 'Akan ada rekaman?', a: 'Ya, peserta dapat akses rekaman setelah event.' },
            { q: 'Bagaimana cara dapat link Zoom/Meet?', a: 'Setelah pembayaran, link otomatis dikirim ke email.' },
            { q: 'Refund?', a: 'Refund sebelum H-3, bisa diganti voucher webinar lain.' },
          ]}
        />
      </section>
    </div>
  )
}
