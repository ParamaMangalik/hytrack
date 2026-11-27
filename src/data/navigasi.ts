
export type Tautan = { label: string; href: string; tombol?: boolean; eksternal?: boolean };
export type KolomFooter = { judul: string; tautan: Tautan[] };

/** Footer 4 kolom, 22 entri. Setiap href harus punya halaman. */
export const footer: KolomFooter[] = [
  {
    judul: 'Produk',
    tautan: [
      { label: 'Antrean Langsung', href: '/fitur/antrean-langsung' },
      { label: 'Dashboard Petugas', href: '/fitur/dashboard-petugas' },
      { label: 'Cari Poli & Dokter', href: '/fitur/poli-dan-dokter' },
      { label: 'Booking Kunjungan', href: '/fitur/booking' },
      { label: 'Pengingat & Waktu Berangkat', href: '/fitur/waktu-berangkat' },
      { label: 'Alur Pelayanan', href: '/fitur/alur-pelayanan' },
      { label: 'Pelacakan Obat', href: '/fitur/pelacakan-obat' },
    ],
  },
  {
    judul: 'Untuk Siapa',
    tautan: [
      { label: 'Pasien Rawat Jalan', href: '/untuk/pasien' },
      { label: 'Petugas Pendaftaran', href: '/untuk/pendaftaran' },
      { label: 'Pendamping Keluarga', href: '/untuk/keluarga' },
      { label: 'Dokter & Poliklinik', href: '/untuk/poliklinik' },
      { label: 'Petugas Farmasi', href: '/untuk/farmasi' },
      { label: 'Laboratorium', href: '/untuk/laboratorium' },
    ],
  },
  {
    judul: 'HyTrack',
    tautan: [
      { label: 'Kerja Sama Fasilitas Kesehatan', href: '/kerja-sama' },
      { label: 'Tentang HyTrack', href: '/tentang' },
      { label: 'Artikel & Panduan', href: '/artikel' },
      { label: 'Pusat Media', href: '/media' },
      { label: 'Keamanan Data', href: '/keamanan-data' },
      { label: 'Bergabung dengan Tim', href: '/bergabung' },
      { label: 'Ketentuan Penggunaan', href: '/ketentuan' },
      { label: 'Kebijakan Privasi', href: '/privasi' },
    ],
  },
  {
    judul: 'Hubungi Kami',
    tautan: [
      { label: 'Kontak & Bantuan', href: '/bantuan' },
    ],
  },
];

export const menuUtama: Tautan[] = [
  { label: 'Fitur', href: '/fitur' },
  { label: 'Untuk Siapa', href: '/untuk' },
  { label: 'Panduan', href: '/panduan' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Unduh', href: '/unduh' },
];
