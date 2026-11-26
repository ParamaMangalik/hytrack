/**
 * Isi halaman fitur (/fitur/...) dan pengguna (/untuk/...).
 *
 * Setiap klaim dicocokkan dengan kode aplikasi hytrack-laravel
 * (README "Status fitur", config/hytrack.php, app/Enums, app/Support/VisitView.php,
 * resources/js/features/). Status:
 *   - 'berfungsi'    : sudah ada di aplikasi.
 *   - 'sebagian'     : ada, dengan batasan yang ditulis di statusCatatan.
 *   - 'pengembangan' : belum ada di aplikasi (ditandai "Dalam pengembangan").
 */
import type { KunciScreenshot } from './screenshots';

export type Status = 'berfungsi' | 'sebagian' | 'pengembangan';

export type Tahap = { label: string; keadaan: 'selesai' | 'aktif' | 'nanti'; catatan?: string };

export type Visual =
  | { jenis: 'gambar'; kunci: KunciScreenshot; keterangan: string }
  | { jenis: 'tahapan'; judul: string; tahap: Tahap[]; keterangan: string; sorot?: { label: string; nilai: string } }
  | { jenis: 'kosong'; keterangan: string };

export type Halaman = {
  slug: string;
  kelompok: 'fitur' | 'untuk';
  label: string;
  pertanyaan: string;
  ringkas: string;
  status: Status;
  statusCatatan?: string;
  alur: { judul: string; langkah: string[] };
  visual: Visual;
  perluDiketahui: string[];
  lanjut: { label: string; href: string; teks: string; eksternal?: boolean };
  terkait: string[];
};

const APP = 'https://hytrack-psas.vercel.app';

export const halamanFitur: Halaman[] = [
  {
    slug: 'antrean-langsung',
    kelompok: 'fitur',
    label: 'Antrean Langsung',
    pertanyaan: 'Berapa pasien lagi sebelum giliran saya?',
    ringkas:
      'Layar kunjungan menampilkan nomor antreanmu, nomor yang sedang dilayani, jumlah pasien yang menunggu, dan perkiraan waktu tunggu. Angkanya diperbarui otomatis.',
    status: 'berfungsi',
    statusCatatan: 'Diperbarui setiap 15 detik (polling), bukan notifikasi push.',
    alur: {
      judul: 'Contoh: menunggu di ruang tunggu Poli Penyakit Dalam',
      langkah: [
        'Kamu sudah check-in dan memegang nomor A-027.',
        'Layar menunjukkan "Sedang dilayani A-024" dan 3 pasien di depanmu.',
        'Perkiraan tunggu tertulis 15–25 menit, dihitung dari rata-rata lama pemeriksaan dokter hari itu.',
        'Setiap pasien selesai, angka di layarmu ikut berubah tanpa perlu memuat ulang.',
      ],
    },
    visual: {
      jenis: 'gambar',
      kunci: 'pantauAntrean',
      keterangan: 'Bagian status antrean di tiket kunjungan, sebelum check-in (mode prototipe, data contoh).',
    },
    perluDiketahui: [
      'Perkiraan tunggu ditampilkan sebagai rentang, misalnya 15–25 menit, karena lama pemeriksaan tiap pasien berbeda.',
      'Bila koneksi terputus, layar menandai status Offline dan waktu sinkron terakhir.',
      'HyTrack belum terhubung ke sistem informasi rumah sakit (SIMRS); antrean dijalankan dari HyTrack sendiri.',
    ],
    lanjut: {
      label: 'Panduan: mengambil antrean pertama',
      href: '/panduan/antrean-pertama',
      teks: 'Ikuti langkahnya dari memilih poli sampai memantau giliran.',
    },
    terkait: ['waktu-berangkat', 'booking', 'pasien'],
  },
  {
    slug: 'dashboard-petugas',
    kelompok: 'fitur',
    label: 'Dashboard Petugas',
    pertanyaan: 'Bagaimana petugas menjalankan antrean poli dari satu layar?',
    ringkas:
      'Petugas melihat pasien yang menunggu, yang sedang diperiksa, dan yang belum datang. Dari layar yang sama petugas mengonfirmasi kedatangan, memanggil, memanggil ulang, atau menandai tidak hadir.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: satu sesi praktik dr. Rina',
      langkah: [
        'Petugas memilih poli dan dokter; ringkasan Menunggu, Selesai, dan Belum check-in muncul di atas.',
        'Pasien datang menunjukkan QR tiket; petugas memindainya dengan kamera atau mengetik nomor check-in HT-xxxxxx.',
        'Petugas menekan Panggil pasien berikutnya. Bila pasien tidak muncul, petugas memanggil ulang lebih dulu, baru dapat menandai tidak hadir.',
        'Setelah dokter selesai, pasien diteruskan ke laboratorium atau farmasi sesuai keputusan dokter.',
      ],
    },
    visual: {
      jenis: 'gambar',
      kunci: 'dashboardPetugas',
      keterangan: 'Antrean poli di ruang petugas (mode prototipe, data contoh).',
    },
    perluDiketahui: [
      'Akses hanya untuk akun petugas dan manajemen, masuk lewat halaman Masuk Petugas.',
      'Akun internal dibuat oleh pengelola; tidak ada pendaftaran mandiri.',
      'Pemindai QR memakai kamera browser dan hanya berjalan lewat HTTPS. Bila kamera tidak tersedia, nomor check-in dapat diketik.',
      'Riwayat aktivitas menampilkan pembaruan terakhir tiap tahap, belum audit log lengkap.',
    ],
    lanjut: {
      label: 'Cara memperoleh akses petugas',
      href: '/akses-petugas',
      teks: 'Akun petugas tidak bisa dibuat sendiri. Lihat langkahnya.',
    },
    terkait: ['pendaftaran', 'alur-pelayanan', 'poliklinik'],
  },
  {
    slug: 'poli-dan-dokter',
    kelompok: 'fitur',
    label: 'Cari Poli & Dokter',
    pertanyaan: 'Poli dan dokter mana yang praktik saat saya ingin berobat?',
    ringkas:
      'HyTrack menampilkan poliklinik yang tersedia beserta jumlah dokter praktik dan perkiraan tunggunya. Setelah memilih poli, kamu melihat dokter, jam praktik, dan sisa kuota pada tanggal yang dipilih.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: mencari dokter penyakit dalam',
      langkah: [
        'Buka Ambil antrean. Daftar poli muncul, misalnya Penyakit Dalam: 2 dokter praktik, 15–25 menit.',
        'Poli yang belum punya jadwal ditandai "Jadwal belum tersedia".',
        'Pilih Penyakit Dalam, lalu pilih tanggal di baris kalender.',
        'Bandingkan dokter: jam praktik, perkiraan tunggu, dan sisa kuota.',
      ],
    },
    visual: {
      jenis: 'gambar',
      kunci: 'pilihPoli',
      keterangan: 'Daftar poliklinik dan perkiraan tunggunya (mode prototipe, data contoh).',
    },
    perluDiketahui: [
      'Daftar poli dan jadwal dokter dikelola petugas di menu Data poliklinik.',
      'Poli yang diarsipkan petugas tidak lagi muncul untuk pasien; riwayatnya tetap tersimpan.',
      'Setiap dokter punya kuota pasien per hari (bawaan 30 tiket).',
    ],
    lanjut: {
      label: 'Lanjut: cara booking kunjungan',
      href: '/fitur/booking',
      teks: 'Setelah menemukan dokter, ambil nomor antreanmu.',
    },
    terkait: ['booking', 'antrean-langsung', 'pasien'],
  },
  {
    slug: 'booking',
    kelompok: 'fitur',
    label: 'Booking Kunjungan',
    pertanyaan: 'Bagaimana cara mendapat nomor antrean sebelum datang?',
    ringkas:
      'Pilih poli, dokter, dan tanggal, lalu tekan Ambil antrean. Nomor dan tiket kunjungan langsung terbit, lengkap dengan kode check-in.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: booking untuk hari ini',
      langkah: [
        'Pilih poli → pilih tanggal → pilih dokter dan jadwal praktiknya.',
        'Tekan Ambil antrean. Nomor terbit hanya setelah tombol ini ditekan.',
        'Tiket kunjungan muncul, misalnya B-014, dengan nama dokter, jam praktik, dan batas check-in.',
        'Satu akun hanya dapat memiliki satu kunjungan aktif. Kunjungan bisa dibatalkan dari tiket.',
      ],
    },
    visual: {
      jenis: 'gambar',
      kunci: 'jadwalDokter',
      keterangan: 'Memilih tanggal, dokter, dan jadwal sebelum mengambil antrean (mode prototipe, data contoh).',
    },
    perluDiketahui: [
      'Tanggal yang bisa dipilih mengikuti jadwal dokter yang dibuka rumah sakit.',
      'Bila kuota dokter habis, jadwal itu tidak bisa dipilih.',
      'Booking belum terhubung dengan BPJS atau sistem pendaftaran rumah sakit.',
    ],
    lanjut: {
      label: 'Panduan: mengambil antrean pertama',
      href: '/panduan/antrean-pertama',
      teks: 'Langkah demi langkah, termasuk membuat akun.',
    },
    terkait: ['poli-dan-dokter', 'waktu-berangkat', 'pasien'],
  },
  {
    slug: 'waktu-berangkat',
    kelompok: 'fitur',
    label: 'Pengingat & Waktu Berangkat',
    pertanyaan: 'Jam berapa saya harus berangkat dari rumah?',
    ringkas:
      'Tiket menampilkan "Berangkat sebelum" dan batas check-in. Check-in paling lambat 15 menit sebelum praktik dimulai; jam berangkat dihitung mundur dari batas itu.',
    status: 'sebagian',
    statusCatatan:
      'Waktu perjalanan memakai perkiraan tetap ±25 menit, belum memakai lokasimu. Pengingat hanya muncul di dalam aplikasi (lonceng notifikasi); belum ada SMS, WhatsApp, email, atau push.',
    alur: {
      judul: 'Contoh: praktik dr. Budi mulai pukul 13.00',
      langkah: [
        'Batas check-in: 12.45 (15 menit sebelum praktik).',
        'Perkiraan perjalanan ±25 menit, jadi tiket menulis "Berangkat sebelum 12.20".',
        'Bila rumahmu lebih jauh, berangkatlah lebih awal dari jam itu.',
        'Pemberitahuan baru tampil di ikon lonceng saat kamu membuka aplikasi.',
      ],
    },
    visual: {
      jenis: 'gambar',
      kunci: 'tiket',
      keterangan: 'Kotak kuning "Berangkat sebelum" pada tiket kunjungan (mode prototipe, data contoh).',
    },
    perluDiketahui: [
      'Pengingat di luar aplikasi (WhatsApp/SMS/push): Dalam pengembangan.',
      'Perhitungan memakai lokasi dan kondisi jalan: Dalam pengembangan.',
      'Zona waktu layanan mengikuti WIB.',
    ],
    lanjut: {
      label: 'Artikel: kapan sebaiknya berangkat?',
      href: '/artikel/kapan-sebaiknya-berangkat',
      teks: 'Tips membaca batas check-in dan menyesuaikan perjalanan.',
    },
    terkait: ['antrean-langsung', 'booking', 'keluarga'],
  },
  {
    slug: 'alur-pelayanan',
    kelompok: 'fitur',
    label: 'Alur Pelayanan',
    pertanyaan: 'Setelah diperiksa dokter, saya harus ke mana?',
    ringkas:
      'Kunjunganmu dibagi menjadi empat tahap: check-in kedatangan, pemeriksaan dokter, pemeriksaan laboratorium, dan farmasi. HyTrack menandai tahap yang sedang berjalan dan menulis ruangan berikutnya.',
    status: 'berfungsi',
    statusCatatan: 'Petunjuk ruangan berupa teks, belum berupa denah atau peta.',
    alur: {
      judul: 'Contoh: dokter meminta cek darah',
      langkah: [
        'Pemeriksaan dokter selesai; dokter membuat permintaan laboratorium.',
        'Tahap aktif pindah ke Pemeriksaan laboratorium dengan lokasi "Laboratorium A-108 · Gedung A, lantai 1".',
        'Hasil dikirim petugas laboratorium ke dokter untuk ditinjau.',
        'Bila ada resep, tahap Farmasi menyala dengan lokasi loket pengambilan obat.',
      ],
    },
    visual: {
      jenis: 'tahapan',
      judul: 'Perjalanan kunjungan',
      keterangan: 'Ilustrasi empat tahap kunjungan seperti yang dilihat pasien. Lokasi ruangan adalah contoh pengaturan aplikasi.',
      tahap: [
        { label: 'Check-in kedatangan', keadaan: 'selesai', catatan: 'Meja check-in · Gedung A, lantai 2' },
        { label: 'Pemeriksaan dokter', keadaan: 'selesai', catatan: 'Ruang poli' },
        { label: 'Pemeriksaan laboratorium', keadaan: 'aktif', catatan: 'Laboratorium A-108 · Gedung A, lantai 1' },
        { label: 'Farmasi', keadaan: 'nanti', catatan: 'Farmasi Loket F2 · Gedung A, lantai 1' },
      ],
    },
    perluDiketahui: [
      'Tidak semua kunjungan melewati laboratorium atau farmasi; tahap itu muncul bila dokter memintanya.',
      'Lokasi ruangan ditulis oleh pengelola di pengaturan aplikasi.',
      'Denah interaktif dan navigasi peta: Dalam pengembangan.',
    ],
    lanjut: {
      label: 'Untuk keluarga: ikut memantau tahapan',
      href: '/untuk/keluarga',
      teks: 'Pendamping bisa melihat tahap yang sedang berjalan tanpa akun.',
    },
    terkait: ['pelacakan-obat', 'laboratorium', 'poliklinik'],
  },
  {
    slug: 'pelacakan-obat',
    kelompok: 'fitur',
    label: 'Pelacakan Obat',
    pertanyaan: 'Kapan saya bisa ambil obat?',
    ringkas:
      'Setelah dokter mengirim resep, layar kunjunganmu menampilkan status resep dan nomor ambil F-xxx. Saat status berubah menjadi Siap diambil, datang ke loket farmasi dengan nomor itu.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: menunggu obat setelah pemeriksaan',
      langkah: [
        'Resep diterima — farmasi sudah menerima resep dari dokter.',
        'Obat disiapkan — apoteker memverifikasi dan menyiapkan obat.',
        'Siap diambil — nomor ambilmu, misalnya F-012, dipanggil di Loket F2.',
        'Sudah diserahkan — obat sudah kamu terima dan kunjungan farmasi selesai.',
      ],
    },
    visual: {
      jenis: 'tahapan',
      judul: 'Status resep',
      sorot: { label: 'Nomor ambil', nilai: 'F-012' },
      keterangan: 'Ilustrasi status resep seperti yang dilihat pasien. Nomor ambil adalah contoh.',
      tahap: [
        { label: 'Resep diterima', keadaan: 'selesai' },
        { label: 'Obat disiapkan', keadaan: 'selesai' },
        { label: 'Siap diambil', keadaan: 'aktif', catatan: 'Farmasi Loket F2' },
        { label: 'Sudah diserahkan', keadaan: 'nanti' },
      ],
    },
    perluDiketahui: [
      'Bila apoteker menemukan resep yang perlu dicek, statusnya menjadi "Resep ditinjau ulang dokter" sampai dokter mengonfirmasi lagi.',
      'Isi resep tidak ditampilkan ke pendamping keluarga.',
      'Pemberitahuan obat siap lewat WhatsApp/SMS: Dalam pengembangan. Pantau status di aplikasi.',
    ],
    lanjut: {
      label: 'Artikel: memahami status resep',
      href: '/artikel/memahami-status-resep',
      teks: 'Arti setiap status dan apa yang perlu kamu lakukan.',
    },
    terkait: ['farmasi', 'alur-pelayanan', 'keluarga'],
  },
];

export const halamanUntuk: Halaman[] = [
  {
    slug: 'pasien',
    kelompok: 'untuk',
    label: 'Pasien Rawat Jalan',
    pertanyaan: 'Apa yang bisa saya lakukan dengan HyTrack sebelum dan selama berobat?',
    ringkas:
      'Daftar dengan nomor HP, ambil antrean dari rumah, tahu kapan harus berangkat, lalu ikuti setiap tahap kunjungan sampai obat diterima.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: kunjungan pertama Bu Siti',
      langkah: [
        'Malam sebelumnya: daftar dengan nomor HP dan kode verifikasi 6 digit yang dikirim lewat WhatsApp.',
        'Pagi hari: ambil antrean Penyakit Dalam, dapat nomor dan jam "Berangkat sebelum".',
        'Di rumah sakit: tunjukkan QR tiket ke petugas check-in, lalu pantau nomor yang sedang dilayani.',
        'Setelah diperiksa: ikuti tahap laboratorium atau farmasi sampai obat diserahkan.',
      ],
    },
    visual: {
      jenis: 'gambar',
      kunci: 'beranda',
      keterangan: 'Beranda pasien sebelum mengambil antrean (mode prototipe, data contoh).',
    },
    perluDiketahui: [
      'HyTrack bisa dipakai dari browser HP tanpa memasang aplikasi.',
      'Hya, asisten chat di aplikasi, membantu soal antrean tetapi tidak memberi saran medis.',
      'Satu akun dapat memiliki satu kunjungan aktif dalam satu waktu.',
    ],
    lanjut: {
      label: 'Buka HyTrack Web',
      href: APP + '/',
      teks: 'Langsung coba dari browser HP atau laptop.',
      eksternal: true,
    },
    terkait: ['booking', 'antrean-langsung', 'waktu-berangkat'],
  },
  {
    slug: 'pendaftaran',
    kelompok: 'untuk',
    label: 'Petugas Pendaftaran',
    pertanyaan: 'Bagaimana saya memastikan pasien yang datang memang sudah terdaftar hari ini?',
    ringkas:
      'Pasien menunjukkan QR check-in dari tiketnya. Petugas memindainya di menu Scan QR kedatangan; server memeriksa tanda tangan QR dan tanggal layanannya sebelum kedatangan dikonfirmasi.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: pasien tiba di meja check-in',
      langkah: [
        'Pasien membuka tiket dan menekan Tampilkan QR check-in.',
        'Petugas membuka Scan QR kedatangan dan mengarahkan kamera ke QR.',
        'Data tiket muncul untuk dicocokkan; petugas menekan konfirmasi.',
        'Bila kamera bermasalah, petugas mengetik nomor check-in HT-xxxxxx yang tertera di bawah QR.',
      ],
    },
    visual: {
      jenis: 'tahapan',
      judul: 'Konfirmasi kedatangan',
      keterangan: 'Ilustrasi langkah di menu Scan QR kedatangan.',
      tahap: [
        { label: 'Memindai QR tiket', keadaan: 'selesai' },
        { label: 'Memeriksa tiket di server', keadaan: 'selesai', catatan: 'Tanda tangan & tanggal layanan' },
        { label: 'Menampilkan data tiket', keadaan: 'aktif' },
        { label: 'Kedatangan dikonfirmasi', keadaan: 'nanti' },
      ],
    },
    perluDiketahui: [
      'QR tiket hanya berlaku untuk kunjungan itu pada tanggal layanannya.',
      'Kamera hanya dapat dipakai lewat HTTPS dan setelah izin kamera diberikan di browser.',
      'Layar pasien ikut berubah setelah check-in (paling lama sekitar 15 detik).',
    ],
    lanjut: {
      label: 'Cara memperoleh akses petugas',
      href: '/akses-petugas',
      teks: 'Akun dibuat oleh pengelola HyTrack di fasilitasmu.',
    },
    terkait: ['dashboard-petugas', 'antrean-langsung', 'poliklinik'],
  },
  {
    slug: 'keluarga',
    kelompok: 'untuk',
    label: 'Pendamping Keluarga',
    pertanyaan: 'Bagaimana saya ikut memantau kunjungan orang tua saya tanpa membuat akun?',
    ringkas:
      'Pasien dapat membuat tautan pendamping dari tiketnya. Lewat tautan itu keluarga melihat nomor antrean dan tahap kunjungan, tanpa akun dan tanpa melihat data medis.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: anak memantau ibunya dari kantor',
      langkah: [
        'Ibu menekan Bagikan ke pendamping di tiket kunjungannya.',
        'Tautan ditampilkan sekali; ibu mengirimkannya ke anak lewat aplikasi pesan.',
        'Anak membuka tautan dan melihat nama singkat ibu, nomor antrean, dan tahap yang sedang berjalan.',
        'Tautan berakhir pukul 23.59 di hari layanan, saat kunjungan selesai, atau saat ibu mencabutnya.',
      ],
    },
    visual: {
      jenis: 'tahapan',
      judul: 'Yang dilihat pendamping',
      sorot: { label: 'Nomor antrean', nilai: 'A-027' },
      keterangan: 'Ilustrasi tampilan pendamping. Catatan dokter dan isi resep tidak ditampilkan.',
      tahap: [
        { label: 'Check-in kedatangan', keadaan: 'selesai' },
        { label: 'Pemeriksaan dokter', keadaan: 'aktif' },
        { label: 'Pemeriksaan laboratorium', keadaan: 'nanti' },
        { label: 'Farmasi', keadaan: 'nanti' },
      ],
    },
    perluDiketahui: [
      'Server hanya menyimpan sidik (hash) tautan, bukan tautannya. Tautan yang hilang tidak bisa ditampilkan ulang; buat yang baru.',
      'Pendamping juga dapat masuk dengan akun Pendamping di halaman masuk aplikasi.',
      'Pemberitahuan ke HP pendamping: Dalam pengembangan.',
    ],
    lanjut: {
      label: 'Panduan: mengambil antrean pertama',
      href: '/panduan/antrean-pertama',
      teks: 'Bantu keluargamu menyiapkan akun dan tiketnya.',
    },
    terkait: ['alur-pelayanan', 'antrean-langsung', 'pasien'],
  },
  {
    slug: 'poliklinik',
    kelompok: 'untuk',
    label: 'Dokter & Poliklinik',
    pertanyaan: 'Apa yang tercatat ketika dokter menyelesaikan pemeriksaan?',
    ringkas:
      'Dokter mengisi catatan, resep, dan bila perlu permintaan laboratorium atau radiologi, lalu mengonfirmasi. Konfirmasi itulah yang mengirim resep ke farmasi atau rujukan ke penunjang.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: dr. Rina selesai memeriksa pasien A-023',
      langkah: [
        'Dokter membuka Pemeriksaan dokter dan memilih pasien yang sedang diperiksa.',
        'Dokter menulis catatan dan daftar obat, lalu memilih Sudah diperiksa.',
        'Konfirmasi & kirim resep mengirim resep ke farmasi; Buat permintaan penunjang mengirim pasien ke laboratorium/radiologi.',
        'Hasil penunjang kembali ke dokter yang sama untuk ditinjau dan dikonfirmasi.',
      ],
    },
    visual: {
      jenis: 'tahapan',
      judul: 'Keputusan dokter',
      keterangan: 'Ilustrasi alur di layar Pemeriksaan dokter.',
      tahap: [
        { label: 'Catatan pemeriksaan', keadaan: 'selesai' },
        { label: 'Resep / permintaan penunjang', keadaan: 'selesai' },
        { label: 'Konfirmasi dokter', keadaan: 'aktif' },
        { label: 'Diteruskan ke farmasi atau penunjang', keadaan: 'nanti' },
      ],
    },
    perluDiketahui: [
      'Hanya dokter yang menangani yang dapat mengonfirmasi pemeriksaan.',
      'Petugas lain hanya melihat status, bukan catatan atau resep.',
      'Rekam medis elektronik rumah sakit tidak terhubung; catatan tersimpan di HyTrack.',
    ],
    lanjut: {
      label: 'Cara memperoleh akses petugas',
      href: '/akses-petugas',
      teks: 'Akun dokter dibuat oleh pengelola.',
    },
    terkait: ['alur-pelayanan', 'laboratorium', 'farmasi'],
  },
  {
    slug: 'farmasi',
    kelompok: 'untuk',
    label: 'Petugas Farmasi',
    pertanyaan: 'Saat status resep saya perbarui, apa yang dilihat pasien?',
    ringkas:
      'Setiap tahap yang kamu konfirmasi langsung mengubah status di layar pasien, dari Resep diterima sampai Sudah diserahkan, lengkap dengan nomor ambil F-xxx.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: memproses resep pasien A-023',
      langkah: [
        'Buka resep → centang verifikasi → Verifikasi & mulai proses. Pasien melihat "Obat disiapkan".',
        'Konfirmasi obat siap diambil. Pasien melihat "Siap diambil" dan nomor ambilnya.',
        'Panggil pasien ke loket.',
        'Konfirmasi obat diserahkan. Pasien melihat "Sudah diserahkan".',
      ],
    },
    visual: {
      jenis: 'tahapan',
      judul: 'Tindakan petugas → layar pasien',
      keterangan: 'Kiri: tindakan di layar farmasi. Kanan: status yang muncul di layar pasien.',
      tahap: [
        { label: 'Verifikasi & mulai proses', keadaan: 'selesai', catatan: 'Pasien: Obat disiapkan' },
        { label: 'Konfirmasi obat siap', keadaan: 'aktif', catatan: 'Pasien: Siap diambil · F-012' },
        { label: 'Panggil pasien', keadaan: 'nanti', catatan: 'Pasien menuju Loket F2' },
        { label: 'Konfirmasi obat diserahkan', keadaan: 'nanti', catatan: 'Pasien: Sudah diserahkan' },
      ],
    },
    perluDiketahui: [
      'Setiap tahap punya checklist wajib sebelum bisa dikonfirmasi.',
      'Resep yang tidak sesuai dapat dikembalikan ke dokter dengan alasan; pasien melihat "Resep ditinjau ulang dokter".',
      'Stok obat dan integrasi sistem farmasi rumah sakit: Dalam pengembangan.',
    ],
    lanjut: {
      label: 'Lihat sisi pasien: Pelacakan Obat',
      href: '/fitur/pelacakan-obat',
      teks: 'Bagaimana pasien membaca status yang kamu perbarui.',
    },
    terkait: ['pelacakan-obat', 'poliklinik', 'alur-pelayanan'],
  },
  {
    slug: 'laboratorium',
    kelompok: 'untuk',
    label: 'Laboratorium',
    pertanyaan: 'Bagaimana hasil pemeriksaan sampai kembali ke dokter yang meminta?',
    ringkas:
      'Permintaan dari dokter masuk ke layar Pelayanan penunjang. Petugas mengubah status, melampirkan file hasil, lalu mengonfirmasi; hasil kembali ke dokter pengirim untuk ditinjau.',
    status: 'berfungsi',
    alur: {
      judul: 'Contoh: pemeriksaan darah lengkap',
      langkah: [
        'Permintaan dari dr. Rina muncul dengan status Menunggu.',
        'Petugas mengubah status menjadi Diproses saat sampel diambil.',
        'Petugas melampirkan hasil (PDF/JPG/PNG, maksimal 5 MB) dan menekan Konfirmasi selesai & kirim hasil.',
        'Dokter pengirim meninjau hasil; pasien melihat tahap laboratorium selesai.',
      ],
    },
    visual: {
      jenis: 'tahapan',
      judul: 'Status permintaan penunjang',
      keterangan: 'Ilustrasi status di layar Pelayanan penunjang.',
      tahap: [
        { label: 'Menunggu', keadaan: 'selesai' },
        { label: 'Diproses', keadaan: 'aktif', catatan: 'Laboratorium A-108' },
        { label: 'Selesai · hasil dikirim ke dokter', keadaan: 'nanti' },
      ],
    },
    perluDiketahui: [
      'File hasil disimpan di penyimpanan privat dan hanya dapat diunduh dokter pengirim dan petugas penunjang.',
      'Pasien tidak mengunduh hasil dari HyTrack; pasien melihat tahapnya.',
      'Radiologi memakai alur yang sama. Integrasi alat/LIS laboratorium: Dalam pengembangan.',
    ],
    lanjut: {
      label: 'Lihat alur pelayanan pasien',
      href: '/fitur/alur-pelayanan',
      teks: 'Di mana tahap laboratorium berada dalam kunjungan pasien.',
    },
    terkait: ['alur-pelayanan', 'poliklinik', 'farmasi'],
  },
  {
    slug: 'kasir',
    kelompok: 'untuk',
    label: 'Pembayaran & Kasir',
    pertanyaan: 'Apakah pembayaran dan kasir sudah bisa dilacak di HyTrack?',
    ringkas:
      'Belum. HyTrack saat ini belum memiliki modul pembayaran, tagihan, atau kasir. Pembayaran tetap mengikuti prosedur rumah sakit.',
    status: 'pengembangan',
    statusCatatan: 'Modul pembayaran dan kasir belum dibangun di aplikasi HyTrack.',
    alur: {
      judul: 'Yang terjadi sekarang',
      langkah: [
        'Pasien menyelesaikan pemeriksaan dan farmasi seperti biasa di HyTrack.',
        'Pembayaran dilakukan di kasir rumah sakit di luar HyTrack.',
        'HyTrack tidak menampilkan tagihan, metode pembayaran, atau status lunas.',
      ],
    },
    visual: {
      jenis: 'kosong',
      keterangan: 'Belum ada tampilan pembayaran di aplikasi. Bagian ini akan diisi setelah modulnya dibuat.',
    },
    perluDiketahui: [
      'HyTrack tidak meminta dan tidak menyimpan data kartu atau rekening.',
      'Integrasi BPJS dan SIMRS juga belum ada.',
    ],
    lanjut: {
      label: 'Diskusikan kebutuhan fasilitasmu',
      href: '/kerja-sama',
      teks: 'Ceritakan alur kasir di tempatmu untuk pengembangan berikutnya.',
    },
    terkait: ['alur-pelayanan', 'pelacakan-obat', 'pasien'],
  },
];

export const semuaHalaman = [...halamanFitur, ...halamanUntuk];

export function cariHalaman(slug: string) {
  return semuaHalaman.find((h) => h.slug === slug);
}

export function urlHalaman(h: Halaman) {
  return `/${h.kelompok}/${h.slug}`;
}

/** Tiga manfaat utama di beranda, masing-masing ke halaman fiturnya. */
export const manfaatUtama = [
  {
    judul: 'Tahu giliranmu dari HP',
    teks: 'Lihat nomor yang sedang dilayani dan perkiraan tunggu tanpa harus duduk berjam-jam di ruang tunggu.',
    href: '/fitur/antrean-langsung',
    ikon: 'antrean',
  },
  {
    judul: 'Berangkat di waktu yang pas',
    teks: 'Tiket memberi tahu batas check-in dan jam berangkat, jadi kamu tidak datang terlalu awal atau terlambat.',
    href: '/fitur/waktu-berangkat',
    ikon: 'jam',
  },
  {
    judul: 'Jelas ke mana setelah diperiksa',
    teks: 'Ikuti tahap laboratorium dan farmasi, lengkap dengan ruangan dan nomor ambil obat.',
    href: '/fitur/alur-pelayanan',
    ikon: 'alur',
  },
] as const;
