/**
 * Artikel & panduan. Setiap artikel punya halaman sendiri di /artikel/<slug>.
 * Blok: { p: 'paragraf' } | { h: 'subjudul' } | { ol: [...] } | { ul: [...] } | { catatan: '...' }
 */
export type Blok = { p: string } | { h: string } | { ol: string[] } | { ul: string[] } | { catatan: string };

export type Artikel = {
  slug: string;
  judul: string;
  ringkas: string;
  kategori: 'Pasien' | 'Keluarga' | 'Petugas';
  menitBaca: number;
  terbit: string;
  isi: Blok[];
  terkait?: { label: string; href: string };
};

export const artikel: Artikel[] = [
  {
    slug: 'kapan-sebaiknya-berangkat',
    judul: 'Kapan sebaiknya berangkat ke rumah sakit?',
    ringkas: 'Cara membaca batas check-in dan jam "Berangkat sebelum" di tiket, lalu menyesuaikannya dengan perjalananmu.',
    kategori: 'Pasien',
    menitBaca: 3,
    terbit: '2026-11-26',
    isi: [
      { p: 'Nomor antrean saja belum cukup. Yang sering membuat bingung adalah kapan harus keluar rumah. Tiket HyTrack memberi dua petunjuk waktu.' },
      { h: 'Batas check-in' },
      { p: 'Check-in paling lambat 15 menit sebelum jam praktik dokter dimulai. Bila praktik mulai pukul 13.00, batasnya pukul 12.45. Check-in dilakukan dengan menunjukkan QR tiket ke petugas.' },
      { h: 'Berangkat sebelum' },
      { p: 'HyTrack menghitung mundur dari batas check-in dengan perkiraan perjalanan umum sekitar 25 menit. Dari contoh di atas, tiket menulis "Berangkat sebelum 12.20".' },
      { catatan: 'Perkiraan 25 menit tidak memakai lokasimu. Bila perjalananmu lebih lama, misalnya karena macet atau naik angkutan umum, berangkatlah lebih awal.' },
      { h: 'Setelah check-in' },
      { ul: [
        'Pantau "Sedang dilayani" dan jumlah pasien di depanmu.',
        'Perkiraan tunggu berupa rentang dan berubah mengikuti pelayanan.',
        'Tetap berada di sekitar ruang tunggu saat giliranmu tinggal beberapa nomor lagi.',
      ] },
    ],
    terkait: { label: 'Fitur: Pengingat & Waktu Berangkat', href: '/fitur/waktu-berangkat' },
  },
  {
    slug: 'memahami-status-resep',
    judul: 'Memahami status resep di farmasi',
    ringkas: 'Arti setiap status resep, nomor ambil F-xxx, dan apa yang perlu dilakukan bila resep ditinjau ulang.',
    kategori: 'Pasien',
    menitBaca: 2,
    terbit: '2026-11-26',
    isi: [
      { p: 'Setelah dokter mengirim resep, tahap Farmasi di kunjunganmu menyala. Ini arti setiap statusnya.' },
      { ol: [
        'Resep diterima: farmasi sudah menerima resep dari dokter.',
        'Obat disiapkan: apoteker sedang memverifikasi dan menyiapkan obat.',
        'Siap diambil: datang ke loket farmasi dengan nomor ambilmu, misalnya F-012.',
        'Sudah diserahkan: obat sudah diterima, tahap farmasi selesai.',
      ] },
      { h: 'Bila status "Resep ditinjau ulang dokter"' },
      { p: 'Apoteker mengembalikan resep ke dokter untuk diperiksa lagi. Kamu tidak perlu melakukan apa-apa; status kembali berjalan setelah dokter mengonfirmasi ulang. Bila ragu, tanyakan ke petugas farmasi.' },
      { catatan: 'HyTrack belum mengirim pemberitahuan obat siap lewat WhatsApp atau SMS. Buka aplikasi untuk melihat status terbaru.' },
    ],
    terkait: { label: 'Fitur: Pelacakan Obat', href: '/fitur/pelacakan-obat' },
  },
  {
    slug: 'menjadi-pendamping',
    judul: 'Menjadi pendamping keluarga yang berobat',
    ringkas: 'Cara menerima tautan pendamping, apa yang bisa dilihat, dan kapan tautan berakhir.',
    kategori: 'Keluarga',
    menitBaca: 2,
    terbit: '2026-11-26',
    isi: [
      { p: 'Tidak semua keluarga bisa ikut ke rumah sakit. Dengan tautan pendamping, kamu tetap tahu sampai mana kunjungan mereka.' },
      { ol: [
        'Minta pasien membuka tiket kunjungan dan menekan Bagikan ke pendamping.',
        'Pasien mengirim tautan itu kepadamu. Tautan hanya ditampilkan sekali di layar pasien.',
        'Buka tautan di browser. Kamu akan melihat nama singkat pasien, nomor antrean, dan tahap kunjungan.',
      ] },
      { h: 'Yang tidak ditampilkan' },
      { p: 'Catatan dokter, isi resep, dan data pribadi lengkap pasien tidak ditampilkan kepada pendamping.' },
      { h: 'Kapan tautan berakhir' },
      { ul: ['Pukul 23.59 di hari layanan.', 'Saat kunjungan selesai.', 'Saat pasien mencabutnya.'] },
    ],
    terkait: { label: 'Untuk Pendamping Keluarga', href: '/untuk/keluarga' },
  },
  {
    slug: 'qr-situs-dan-qr-tiket',
    judul: 'Dua QR yang berbeda: QR unduhan dan QR tiket',
    ringkas: 'QR di situs ini membuka halaman unduhan. QR di tiket kunjungan ditunjukkan ke petugas saat check-in. Jangan tertukar.',
    kategori: 'Pasien',
    menitBaca: 2,
    terbit: '2026-11-26',
    isi: [
      { p: 'Kamu akan bertemu dua jenis QR saat memakai HyTrack. Keduanya punya tugas yang berbeda.' },
      { h: 'QR di situs ini' },
      { p: 'QR yang tampil di layar laptop pada situs ini hanya membuka halaman unduhan di HP-mu. QR ini sama untuk semua orang dan tidak berisi data apa pun tentang dirimu.' },
      { h: 'QR di tiket kunjungan' },
      { p: 'QR check-in muncul di aplikasi setelah kamu mengambil antrean dan menekan Tampilkan QR check-in. QR ini milikmu, berlaku untuk satu kunjungan di tanggal layanannya, dan ditunjukkan ke petugas saat tiba.' },
      { catatan: 'Jangan memotret dan membagikan QR tiket ke media sosial. Bila keluarga ingin ikut memantau, gunakan tautan pendamping.' },
    ],
    terkait: { label: 'Panduan HyTrack', href: '/panduan' },
  },
  {
    slug: 'panduan-petugas-pendaftaran',
    judul: 'Hari pertama memakai HyTrack di meja check-in',
    ringkas: 'Persiapan perangkat, izin kamera, dan apa yang dilakukan bila QR pasien sulit terbaca.',
    kategori: 'Petugas',
    menitBaca: 3,
    terbit: '2026-11-26',
    isi: [
      { p: 'Panduan singkat untuk petugas yang baru mendapat akun HyTrack.' },
      { h: 'Sebelum layanan dimulai' },
      { ul: [
        'Masuk lewat halaman Masuk Petugas dengan akun yang diberikan pengelola.',
        'Buka menu Scan QR kedatangan dan izinkan kamera saat browser meminta.',
        'Pastikan alamat situs diawali https://, karena kamera tidak bisa dipakai tanpa HTTPS.',
      ] },
      { h: 'Bila QR sulit terbaca' },
      { p: 'Minta pasien menaikkan kecerahan layar. Bila tetap gagal, ketik nomor check-in HT-xxxxxx yang tertera di bawah QR tiket.' },
      { h: 'Pasien tidak muncul saat dipanggil' },
      { p: 'Gunakan Panggil ulang lebih dulu. Tombol Tidak hadir baru aktif setelah panggilan ulang.' },
    ],
    terkait: { label: 'Untuk Petugas Pendaftaran', href: '/untuk/pendaftaran' },
  },
];

export function tanggalArtikel(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
