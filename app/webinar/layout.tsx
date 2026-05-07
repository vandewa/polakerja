import WebinarNavbar from '@/components/webinar/WebinarNavbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: { default: 'Webinar Polakerja', template: '%s — Webinar Polakerja' },
  description: 'Webinar legalitas, sertifikasi, dan sistem manajemen dari Polakerja.',
}

export default function WebinarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebinarNavbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
