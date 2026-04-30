export const WA_NUMBER = '6285234567890'
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Halo%20Polakerja%2C%20saya%20ingin%20konsultasi`
export const PHONE_DISPLAY = '+62 852-3456-7890'

export const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Blog', href: '#blog' },
  { label: 'Kontak', href: '#kontak' },
]

export const layananData = [
  {
    id: 'iso',
    title: 'Sertifikasi ISO',
    icon: 'Shield',
    items: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 37001'],
  },
  {
    id: 'legalitas',
    title: 'Legalitas & Perizinan',
    icon: 'FileText',
    items: ['Pendirian Perusahaan', 'Perizinan Akta', 'NIB & OSS', 'NIV Online'],
  },
  {
    id: 'sbu',
    title: 'SBU & SKK',
    icon: 'Briefcase',
    items: ['SBU Konsultansi', 'SBU Non Konsultansi', 'SKK Konstruksi'],
  },
  {
    id: 'sistem',
    title: 'Sistem Manajemen',
    icon: 'Settings',
    items: ['Penyusunan Dokumen', 'Implementasi Sistem', 'Internal Audit', 'Management Review'],
  },
  {
    id: 'pendampingan',
    title: 'Pendampingan',
    icon: 'Users',
    items: ['Audit Sertifikasi', 'Audit Eksternal', 'Perbaikan (CAPA)', 'Training & Workshop'],
  },
]

export const statsData = [
  {
    value: '25', suffix: '+',
    label: 'Industri Dilayani',
    description: 'Manufaktur, konstruksi, F&B, logistik, energi, hingga jasa profesional.',
    animate: true,
  },
  {
    value: '50', suffix: '+',
    label: 'Jenis Sertifikasi',
    description: 'ISO 9001, 14001, 45001, 37001, 27001, OHSAS, HACCP, dan lainnya.',
    animate: true,
  },
  {
    value: '< 1', suffix: ' Jam',
    label: 'Response WhatsApp',
    description: 'Tim ahli kami merespons konsultasi dengan cepat di jam kerja.',
    animate: false,
  },
  {
    value: '4-6', suffix: ' Mgg',
    label: 'Avg Processing',
    description: 'Estimasi waktu rata-rata proses sertifikasi dari awal hingga terbit.',
    animate: false,
  },
]

export const prosesData = [
  { step: 1, title: 'Konsultasi Awal', icon: 'MessageCircle', description: 'Memahami kebutuhan, tujuan, dan kondisi bisnis Anda.' },
  { step: 2, title: 'Analisis & Perencanaan', icon: 'ClipboardList', description: 'Analisis gap dan merencanakan implementasi yang tepat.' },
  { step: 3, title: 'Implementasi', icon: 'Zap', description: 'Pendampingan penerapan sistem dan dokumen secara efektif.' },
  { step: 4, title: 'Audit & Evaluasi', icon: 'Search', description: 'Audit internal dan evaluasi kesiapan untuk sertifikasi.' },
  { step: 5, title: 'Sertifikasi & Perizinan', icon: 'Award', description: 'Mendampingi hingga sertifikat terbit dan diterima.' },
]

export const tentangPoints = [
  'Tim konsultan berpengalaman & bersertifikasi',
  'Metodologi praktis dan mudah diterapkan',
  'Pendampingan sampai tuntas',
  'Layanan profesional dan tepat waktu',
  'Komitmen & Integritas terjamin',
]

export const testimoniData = [
  {
    quote: 'Polakerja Consulting sangat membantu kami dalam proses sertifikasi ISO 9001. Tim mereka profesional, responsif, dan selalu siap membantu. Terima kasih!',
    name: 'Andi Pratama',
    role: 'Direktur Operasional',
    company: 'PT. Maju Bersama',
    rating: 5,
  },
  {
    quote: 'Proses SBU dan SKK kami jadi jauh lebih mudah dan terarah berkat pendampingan dari Polakerja Consulting. Highly recommended!',
    name: 'Risa Kumiwati',
    role: 'Project Manager',
    company: 'PT. Cipta Karya',
    rating: 5,
  },
  {
    quote: 'Dokumen sertifikasi yang disiapkan sangat rapi dan lengkap. Audit berjalan lancar dan kami berhasil mendapat sertifikat tanpa masalah.',
    name: 'Budi Santoso',
    role: 'Direktur Utama',
    company: 'PT. Solusi Prima',
    rating: 5,
  },
]

export const clientNames = [
  'PT. Wijaya Karya', 'PT. Adhi Karya', 'PT. Pembangunan Perumahan',
  'PT. Waskita Karya', 'PT. Hutama Karya', 'PT. Nindya Karya',
  'PT. Brantas Abipraya', 'PT. Jasa Marga', 'PT. Pelabuhan Indonesia',
  'PT. Angkasa Pura', 'PT. KAI Commuter', 'PT. Indofood Sukses',
]
