import { getUpcomingWebinars, getPastWebinars } from '@/lib/webinars'
import WebinarCard from '@/components/webinar/WebinarCard'

export const metadata = {
  title: 'Webinar Polakerja',
  description: 'Webinar legalitas, sertifikasi, dan sistem manajemen dari Polakerja.',
}

export default function WebinarIndexPage() {
  const upcoming = getUpcomingWebinars()
  const past = getPastWebinars()

  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Webinar Polakerja</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-medium tracking-tight">
          Belajar legalitas & sertifikasi langsung dari ahlinya
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Webinar interaktif untuk pemilik UMKM dan tim perusahaan yang ingin naik kelas lewat sertifikasi internasional, izin usaha, dan sistem manajemen.
        </p>
      </section>

      {upcoming.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl md:text-3xl font-medium">Webinar Mendatang</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((w) => <WebinarCard key={w.slug} webinar={w} />)}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <h2 className="text-2xl md:text-3xl font-medium">Pernah Diadakan</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((w) => <WebinarCard key={w.slug} webinar={w} />)}
          </div>
        </section>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-neutral-600">Belum ada webinar terjadwal. Pantau terus halaman ini.</p>
        </section>
      )}
    </>
  )
}
