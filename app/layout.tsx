import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://polakerja.id'
const SITE_NAME = 'Polakerja Consulting'
const TITLE_DEFAULT = 'Polakerja Consulting — Konsultan ISO, Legalitas, dan Perizinan Terpercaya'
const DESCRIPTION =
  'Bangun Sistem. Pastikan Kepatuhan. Dorong Pertumbuhan. Partner terpercaya untuk Sertifikasi ISO, Legalitas & Perizinan, SBU & SKK Konstruksi, dan Sistem Manajemen — membantu bisnis Anda memenuhi standar dan tumbuh berkelanjutan.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: 'Pola Group',
  keywords: [
    'konsultan ISO',
    'sertifikasi ISO 9001',
    'sertifikasi ISO 14001',
    'sertifikasi ISO 45001',
    'sertifikasi ISO 37001',
    'legalitas perusahaan',
    'pendirian PT',
    'NIB OSS',
    'SBU konstruksi',
    'SKK konstruksi',
    'sistem manajemen mutu',
    'audit internal',
    'konsultan bisnis Indonesia',
    'Polakerja Consulting',
    'Pola Group',
  ],
  category: 'business',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    // images served by app/opengraph-image.tsx automatically
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    creator: '@polakerja.id',
    // images served by app/opengraph-image.tsx automatically
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Tambahkan saat sudah punya GSC, contoh:
    // google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B4ED8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        {/* Organization JSON-LD for richer SEO snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              alternateName: 'Polakerja.id',
              url: SITE_URL,
              logo: `${SITE_URL}/LM_Defaut.svg`,
              parentOrganization: {
                '@type': 'Organization',
                name: 'Pola Group',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+62-815-1305-0035',
                contactType: 'customer service',
                areaServed: 'ID',
                availableLanguage: ['Indonesian'],
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. Dirgantara Raya. Arcadia Residence No. B8',
                addressLocality: 'Jatiasih',
                addressRegion: 'Bekasi',
                postalCode: '17426',
                addressCountry: 'ID',
              },
              sameAs: [
                'https://www.instagram.com/polakerja.id',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
