import Link from 'next/link'

export default function WebinarNotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm uppercase tracking-widest text-neutral-500">Webinar tidak ditemukan</p>
      <h1 className="mt-3 text-3xl font-medium">Halaman ini tidak tersedia</h1>
      <p className="mt-2 text-neutral-600 max-w-md">
        Webinar yang kamu cari mungkin sudah selesai, dipindah, atau URL-nya keliru.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm hover:bg-neutral-800 transition"
      >
        Lihat semua webinar
      </Link>
    </section>
  )
}
