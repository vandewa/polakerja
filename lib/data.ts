export const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Kontak', href: '#kontak' },
]

export const whatsappConsultUrl =
  'https://wa.me/6281513050035?text=' +
  encodeURIComponent('halo Polakerja Consulting, saya ingin konsultasi ISO/Legalitas/Perizinan')

export type LayananDetail = {
  tagline: string
  description: string
  benefits: string[]
  itemDetails: { name: string; desc: string }[]
  idealFor: string[]
}

export type Layanan = {
  id: string
  title: string
  icon: string
  items: string[]
  detail: LayananDetail
}

export const layananData: Layanan[] = [
  {
    id: 'iso',
    title: 'Sertifikasi ISO',
    icon: 'Shield',
    items: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 37001'],
    detail: {
      tagline: 'Standar internasional yang membuka pintu pasar global.',
      description:
        'Tingkatkan kredibilitas dan daya saing bisnis Anda dengan sertifikasi standar internasional. Kami mendampingi proses dari gap analysis, penyusunan dokumen, implementasi, hingga audit sertifikasi oleh badan terakreditasi.',
      benefits: [
        'Meningkatkan kepercayaan klien & mitra bisnis',
        'Membuka akses ke tender dan pasar global',
        'Standarisasi proses operasional yang terukur',
        'Bukti komitmen pada kualitas dan kepatuhan',
      ],
      itemDetails: [
        { name: 'ISO 9001 — Sistem Manajemen Mutu', desc: 'Pendampingan end-to-end: gap analysis, penyusunan manual mutu & SOP, training tim, hingga audit sertifikasi oleh badan terakreditasi KAN.' },
        { name: 'ISO 14001 — Sistem Manajemen Lingkungan', desc: 'Identifikasi aspek & dampak lingkungan, penyusunan dokumen IPL/UKL-UPL pendukung, monitoring compliance regulasi, hingga sertifikat terbit.' },
        { name: 'ISO 45001 — Sistem Manajemen K3', desc: 'Risk assessment HIRADC, dokumen K3 selaras PP 50/2012, training & sosialisasi karyawan, hingga lulus audit sertifikasi tanpa temuan major.' },
        { name: 'ISO 37001 — Anti Penyuapan', desc: 'Kebijakan anti-suap, due diligence mitra, sistem whistleblowing, dan audit kepatuhan — siap menghadapi tender pemerintah & BUMN.' },
      ],
      idealFor: ['Manufaktur & Industri', 'Perusahaan Konstruksi', 'Industri Jasa & F&B', 'UMKM Naik Kelas'],
    },
  },
  {
    id: 'legalitas',
    title: 'Legalitas & Perizinan',
    icon: 'FileText',
    items: ['Pendirian Perusahaan', 'Perizinan Akta', 'NIB & OSS', 'NIV Online'],
    detail: {
      tagline: 'Fondasi hukum bisnis yang sah, lengkap, dan tepat waktu.',
      description:
        'Solusi lengkap membangun fondasi hukum bisnis Anda. Dari pendirian PT, akta notaris, hingga NIB dan izin operasional — semua kami urus sampai siap pakai dengan transparan dan tepat waktu.',
      benefits: [
        'Bisnis legal & sah secara hukum sejak awal',
        'Akses ke layanan perbankan dan kontrak resmi',
        'Aman dari sanksi administratif maupun pidana',
        'Reputasi profesional di mata klien & investor',
      ],
      itemDetails: [
        { name: 'Pendirian Perusahaan', desc: 'Pendirian PT, CV, atau Firma — termasuk akta notaris dan SK Kemenkumham.' },
        { name: 'Perizinan Akta', desc: 'Pembuatan dan perubahan akta untuk kepemilikan, modal, atau struktur perusahaan.' },
        { name: 'NIB & OSS', desc: 'Nomor Induk Berusaha terintegrasi via sistem Online Single Submission.' },
        { name: 'NIV Online', desc: 'Pengurusan Nomor Induk Vendor untuk kebutuhan kerja sama lembaga & korporat.' },
      ],
      idealFor: ['Startup & UMKM Baru', 'Pendirian PT / CV', 'PMA / Investor Asing', 'Bisnis Naik Status'],
    },
  },
  {
    id: 'sbu',
    title: 'SBU & SKK',
    icon: 'Briefcase',
    items: ['SBU Konsultansi', 'SBU Non Konsultansi', 'SKK Konstruksi'],
    detail: {
      tagline: 'Kunci kompetisi tender konstruksi pemerintah & swasta.',
      description:
        'Sertifikasi wajib bagi penyedia jasa konstruksi dan konsultan untuk legalitas berkompetisi di proyek pemerintah maupun swasta. Kami berpengalaman mendampingi ratusan badan usaha lulus klasifikasi LPJK.',
      benefits: [
        'Syarat utama mengikuti tender konstruksi',
        'Bukti kompetensi badan usaha & tenaga kerja',
        'Klasifikasi kualifikasi resmi dari LPJK',
        'Proses cepat dengan dokumen yang dipersiapkan tim ahli',
      ],
      itemDetails: [
        { name: 'SBU Konsultansi', desc: 'Sertifikat Badan Usaha untuk perencanaan, pengawasan, dan manajemen proyek konstruksi.' },
        { name: 'SBU Non Konsultansi', desc: 'Sertifikat Badan Usaha untuk pelaksana konstruksi: bangunan, jalan, jembatan, dan instalasi.' },
        { name: 'SKK Konstruksi', desc: 'Sertifikat Kompetensi Kerja untuk tenaga ahli (insinyur, arsitek) dan terampil (mandor, tukang).' },
      ],
      idealFor: ['Kontraktor Konstruksi', 'Konsultan Perencana', 'Tenaga Ahli & Terampil', 'Peserta Tender Pemerintah'],
    },
  },
  {
    id: 'sistem',
    title: 'Sistem Manajemen',
    icon: 'Settings',
    items: ['Penyusunan Dokumen', 'Implementasi Sistem', 'Internal Audit', 'Management Review'],
    detail: {
      tagline: 'Operasional terstruktur, terdokumentasi, dan siap diaudit.',
      description:
        'Pengembangan dan implementasi sistem manajemen yang terstruktur, terdokumentasi, dan siap diaudit. Cocok untuk persiapan sertifikasi maupun perbaikan operasional internal perusahaan Anda.',
      benefits: [
        'Operasional bisnis lebih terstandar dan efisien',
        'Mudah dilacak dan diukur kinerjanya',
        'Meminimalkan risiko ketidaksesuaian dan komplain',
        'Siap menghadapi audit internal & eksternal',
      ],
      itemDetails: [
        { name: 'Penyusunan Dokumen', desc: 'Pembuatan manual mutu, prosedur kerja, instruksi kerja, dan formulir pendukung.' },
        { name: 'Implementasi Sistem', desc: 'Sosialisasi, pelatihan, dan pendampingan penerapan sistem di lapangan.' },
        { name: 'Internal Audit', desc: 'Audit internal berkala untuk memastikan sistem berjalan sesuai dokumen.' },
        { name: 'Management Review', desc: 'Tinjauan manajemen untuk evaluasi efektivitas sistem dan rencana perbaikan.' },
      ],
      idealFor: ['Persiapan Sertifikasi ISO', 'Multi-Departemen', 'BUMN / BUMD', 'Korporasi Berkembang'],
    },
  },
  {
    id: 'pendampingan',
    title: 'Pendampingan',
    icon: 'Users',
    items: ['Audit Sertifikasi', 'Audit Eksternal', 'Perbaikan (CAPA)', 'Training & Workshop'],
    detail: {
      tagline: 'Tim ahli mendampingi setiap langkah audit Anda.',
      description:
        'Dukungan profesional dari tim ahli kami sepanjang siklus audit — dari persiapan, pendampingan saat audit, penanganan temuan, hingga peningkatan kapabilitas tim Anda agar siap mandiri.',
      benefits: [
        'Audit lulus dengan persiapan matang',
        'Penanganan temuan cepat & tepat sasaran',
        'Tim Anda lebih percaya diri menghadapi audit',
        'Berbagi pengalaman dari ratusan kasus klien',
      ],
      itemDetails: [
        { name: 'Audit Sertifikasi', desc: 'Pendampingan menghadapi audit oleh badan sertifikasi resmi terakreditasi.' },
        { name: 'Audit Eksternal', desc: 'Persiapan dan pendampingan audit dari pihak luar (klien, regulator, mitra).' },
        { name: 'Perbaikan (CAPA)', desc: 'Penanganan Corrective & Preventive Action atas temuan audit.' },
        { name: 'Training & Workshop', desc: 'Pelatihan tim Anda — internal audit, awareness standar, hingga implementasi.' },
      ],
      idealFor: ['Audit Sertifikasi', 'Tim Internal Pemula', 'Korporasi Multi-Site', 'Pasca-Sertifikasi'],
    },
  },
]

export const statsData = [
  { value: 150, suffix: '+', label: 'Proyek Selesai', description: 'Berbagai industri telah mempercayakan proyek dan legalitasnya.' },
  { value: 100, suffix: '+', label: 'Klien Puas', description: 'Kepuasan klien selalu kami prioritaskan di setiap langkah.' },
  { value: 100, suffix: '%', label: 'Tingkat Keberhasilan', description: 'Proses sertifikasi & perizinan berhasil hingga tahap akhir.' },
  { value: 15, suffix: '+', label: 'Tahun Pengalaman', description: 'Tim kami berpengalaman melayani klien dari berbagai sektor.' },
]

export const prosesData = [
  { step: 1, title: 'Konsultasi Awal', icon: 'MessageCircle', description: 'Memahami kebutuhan, tujuan, dan kondisi bisnis Anda.' },
  { step: 2, title: 'Analisis & Perencanaan', icon: 'ClipboardList', description: 'Analisis gap dan merencanakan implementasi yang tepat.' },
  { step: 3, title: 'Implementasi', icon: 'Zap', description: 'Pendampingan penerapan sistem dan dokumen secara efektif.' },
  { step: 4, title: 'Audit & Evaluasi', icon: 'Search', description: 'Audit internal dan evaluasi kesiapan untuk sertifikasi.' },
  { step: 5, title: 'Sertifikasi & Perizinan', icon: 'Award', description: 'Mendampingi hingga terbit dan diterbitkan.' },
]

export const tentangPoints = [
  'Tim konsultan berpengalaman & bersertifikasi',
  'Metodologi praktis dan mudah diterapkan',
  'Pendampingan sampai tuntas',
  'Layanan profesional dan tepat waktu',
  'Komitmen & Integritas terjamin',
]

export const tentangPillars = [
  {
    icon: 'UserCheck',
    title: 'Profesional',
    desc: 'Didukung tim ahli di bidang ISO, legalitas & sistem manajemen.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Terpercaya',
    desc: 'Integritas dan kepercayaan adalah prioritas kami.',
  },
  {
    icon: 'Leaf',
    title: 'Berkelanjutan',
    desc: 'Solusi jangka panjang untuk pertumbuhan bisnis Anda.',
  },
]

export const testimoniData = [
  {
    quote: 'Dokumen sertifikasi yang disiapkan sangat rapi dan lengkap. Audit berjalan lancar dan kami berhasil mendapat sertifikat tanpa masalah.',
    name: 'Koko',
    role: 'Owner Restaurant',
    company: 'PT Putra Tanjung Komat',
    rating: 5,
  },
  {
    quote: 'Proses SBU dan SKK kami jadi jauh lebih mudah dan terarah berkat pendampingan dari Polakerja Consulting. Highly recommended!',
    name: 'Claudika Ega',
    role: 'Project Manager',
    company: 'PT Zekon Indonesia',
    rating: 5,
  },
  {
    quote: 'Polakerja Consulting sangat membantu kami dalam proses sertifikasi ISO 9001. Tim mereka profesional, responsif, dan selalu siap membantu. Terima kasih!',
    name: 'Sutrisno',
    role: 'Managing Partner',
    company: 'PT Esdea Assistance Management',
    rating: 5,
  },
]
