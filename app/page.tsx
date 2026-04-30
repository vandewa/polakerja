import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Layanan from '@/components/sections/Layanan'
import Stats from '@/components/sections/Stats'
import Proses from '@/components/sections/Proses'
import TentangKami from '@/components/sections/TentangKami'
import Testimoni from '@/components/sections/Testimoni'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Layanan />
        <Stats />
        <Proses />
        <TentangKami />
        <Testimoni />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
