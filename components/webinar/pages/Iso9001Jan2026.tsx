import type { WebinarPageProps } from './registry'
import WebinarHero from '@/components/webinar/blocks/WebinarHero'
import WebinarPitch from '@/components/webinar/blocks/WebinarPitch'
import LearningOutcomes from '@/components/webinar/blocks/LearningOutcomes'
import AgendaTimeline from '@/components/webinar/blocks/AgendaTimeline'
import SpeakerCard from '@/components/webinar/blocks/SpeakerCard'
import AudienceTarget from '@/components/webinar/blocks/AudienceTarget'
import BonusList from '@/components/webinar/blocks/BonusList'
import InvestmentBlock from '@/components/webinar/blocks/InvestmentBlock'
import TestimonialQuotes from '@/components/webinar/blocks/TestimonialQuotes'
import WebinarFAQ from '@/components/webinar/blocks/WebinarFAQ'

export default function Iso9001Jan2026({ webinar }: WebinarPageProps) {
  return (
    <>
      <WebinarHero
        title={webinar.title}
        subtitle={webinar.subtitle}
        startsAt={webinar.startsAt}
        durationMinutes={webinar.durationMinutes}
        format={webinar.format}
        mayarUrl={webinar.mayarUrl}
        bgImage="/webinar/iso-9001-bg.jpg"
        className="bg-neutral-900 text-white"
      />

      <WebinarPitch>
        <p>
          ISO 9001 sering kelihatan rumit dan mahal — padahal untuk UMKM, prosesnya bisa diselesaikan
          dalam 60 hari kalau tahu urutan langkahnya.
        </p>
        <p>
          Di webinar ini kita akan bahas roadmap praktis dari nol sampai siap audit, plus template dokumen
          yang bisa langsung dipakai.
        </p>
      </WebinarPitch>

      <LearningOutcomes
        items={[
          'Memahami struktur klausa ISO 9001:2015 dan fokus auditor',
          'Menyusun manual mutu, prosedur, dan formulir wajib dengan template siap pakai',
          'Menjalankan internal audit & management review dalam 1 hari',
          'Memilih badan sertifikasi yang sesuai budget',
          'Strategi 60-hari dari kick-off sampai sertifikat di tangan',
          'Bonus: tips memanfaatkan ISO untuk tender pemerintah',
        ]}
      />

      <AgendaTimeline
        items={[
          { time: '19:00 – 19:15 WIB', title: 'Pengantar & Studi Kasus UMKM' },
          { time: '19:15 – 19:45 WIB', title: 'Roadmap 60 Hari', description: 'Breakdown per minggu — apa yang harus selesai kapan' },
          { time: '19:45 – 20:15 WIB', title: 'Live Demo: Menyusun Manual Mutu' },
          { time: '20:15 – 20:30 WIB', title: 'Q&A + Bonus Template' },
        ]}
      />

      <SpeakerCard speakers={webinar.speakers.map((s) => ({ ...s, bio: 'Praktisi ISO dengan 10+ tahun pengalaman audit ke 200+ perusahaan UMKM dan korporasi.', credentials: ['IRCA Lead Auditor', 'CQI Member'] }))} />

      <AudienceTarget
        items={[
          'Pemilik UMKM yang ingin tender pemerintah atau ekspor',
          'Manager mutu/operasional yang baru ditugaskan implementasi ISO',
          'Konsultan independen yang ingin memperluas layanan',
          'Mahasiswa teknik industri / manajemen mutu',
        ]}
      />

      <BonusList
        items={[
          { icon: 'FileText', label: 'Template Manual Mutu', description: '50+ halaman, siap edit' },
          { icon: 'Award', label: 'E-sertifikat Kehadiran' },
          { icon: 'Video', label: 'Recording 1 tahun' },
          { icon: 'MessagesSquare', label: 'Grup WA peserta' },
          { icon: 'Headphones', label: 'Konsultasi 15 menit gratis' },
        ]}
      />

      <InvestmentBlock
        price={webinar.price}
        earlyBirdPrice={webinar.earlyBirdPrice}
        earlyBirdEndsAt={webinar.earlyBirdEndsAt}
        mayarUrl={webinar.mayarUrl}
      />

      <TestimonialQuotes
        items={[
          { quote: 'Materi sangat aplikatif. Setelah webinar saya langsung punya checklist yang jelas.', name: 'Rina S.', role: 'Owner UMKM Tekstil' },
          { quote: 'Templatenya yang paling juara — hemat berbulan-bulan kerja dokumentasi.', name: 'Budi P.', role: 'QA Manager' },
        ]}
      />

      <WebinarFAQ
        items={[
          { q: 'Apakah ada recording kalau saya tidak bisa hadir live?', a: 'Ya, recording dikirim H+1 dan bisa diakses 1 tahun.' },
          { q: 'Apakah saya dapat sertifikat?', a: 'Ya, e-sertifikat kehadiran dikirim H+2 setelah webinar.' },
          { q: 'Bagaimana kalau saya sudah bayar tapi tidak bisa hadir?', a: 'Refund full sampai 24 jam sebelum acara. Setelahnya tetap dapat akses recording.' },
          { q: 'Bisa minta invoice?', a: 'Bisa. Hubungi tim kami via WhatsApp setelah pembayaran.' },
        ]}
      />
    </>
  )
}
