export type Tanya = { q: string; a: string; href?: string; hrefLabel?: string };

export const faq: Tanya[] = [
  {
    q: 'Apakah saya harus memasang aplikasi Android?',
    a: 'Tidak. Semua fitur pasien bisa dipakai dari browser lewat HyTrack Web. Aplikasi Android hanya memudahkan membukanya dari layar utama HP.',
    href: '/unduh',
    hrefLabel: 'Pilihan unduhan',
  },
  {
    q: 'Saya memakai iPhone. Bisa pakai HyTrack?',
    a: 'Bisa, lewat HyTrack Web di Safari. Aplikasi iOS belum tersedia.',
  },
  {
    q: 'Bagaimana cara mendaftar?',
    a: 'Isi nama lengkap, nomor HP, dan kata sandi di halaman daftar, lalu ketik kode verifikasi 6 digit yang dikirim lewat WhatsApp. Kode berlaku 5 menit.',
    href: '/panduan/antrean-pertama',
    hrefLabel: 'Panduan antrean pertama',
  },
  {
    q: 'Kapan saya harus check-in?',
    a: 'Paling lambat 15 menit sebelum jam praktik dokter dimulai. Tunjukkan QR di tiket kunjunganmu ke petugas check-in.',
    href: '/fitur/waktu-berangkat',
    hrefLabel: 'Waktu berangkat',
  },
  {
    q: 'Apakah perkiraan waktu tunggu pasti?',
    a: 'Tidak. Perkiraan dihitung dari rata-rata lama pemeriksaan dokter hari itu dan diperbarui sekitar setiap 15 detik, jadi bisa bergeser.',
  },
  {
    q: 'Apakah HyTrack terhubung dengan BPJS atau sistem rumah sakit?',
    a: 'Belum. HyTrack menjalankan antreannya sendiri dan belum terhubung ke BPJS maupun SIMRS.',
  },
  {
    q: 'Bisakah Hya memberi saran medis?',
    a: 'Tidak. Hya hanya membantu pertanyaan seputar antrean dan kunjungan. Untuk keluhan kesehatan, tanyakan ke dokter atau petugas.',
  },
  {
    q: 'Keluarga saya ingin ikut memantau. Caranya?',
    a: 'Dari tiket kunjungan, tekan Bagikan ke pendamping lalu kirim tautannya. Keluarga dapat memantau tanpa membuat akun.',
    href: '/untuk/keluarga',
    hrefLabel: 'Untuk pendamping',
  },
];
