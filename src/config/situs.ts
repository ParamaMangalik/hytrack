/**
 * ============================================================
 *  KONFIGURASI SITUS HYTRACK — satu-satunya file yang perlu
 *  diubah untuk APK, trailer, kontak, dan media sosial.
 * ============================================================
 *
 * Aturan: biarkan string kosong ('') bila datanya belum ada.
 * Situs otomatis menampilkan keterangan "segera tersedia" atau
 * menyembunyikan bagian itu. Jangan isi dengan data karangan.
 */

export const situs = {
  nama: 'HyTrack',
  slogan: 'Teman Perjalanan Berobat',

  /** Aplikasi yang sudah berjalan (pasien). */
  aplikasi: {
    web: 'https://hytrack-psas.vercel.app/',
    masukPasien: 'https://hytrack-psas.vercel.app/masuk',
    bantuan: 'https://hytrack-psas.vercel.app/bantuan',
  },

  /**
   * RILIS APK ANDROID
   * - url: tautan langsung ke file .apk rilis resmi, misalnya
   *   'https://github.com/<akun>/<repo>/releases/download/v1.0.0/hytrack-1.0.0.apk'
   *   atau file di folder public, misalnya '/apk/hytrack-1.0.0.apk'.
   * - versi: misalnya '1.0.0'
   * - ukuran: misalnya '12,4 MB'
   * - tanggal: tanggal rilis, format 'YYYY-MM-DD', misalnya '2026-12-01'
   * - androidMinimal: misalnya 'Android 8.0' (opsional)
   * Selama url kosong, situs menampilkan "APK Android segera tersedia".
   */
  apk: {
    url: '',
    versi: '',
    ukuran: '',
    tanggal: '',
    androidMinimal: '',
  },

  /**
   * TRAILER
   * - video: file di folder public, misalnya '/media/trailer-hytrack.mp4',
   *   atau URL .mp4 langsung.
   * - poster: gambar sampul, misalnya '/media/trailer-poster.jpg'.
   * - teks: file takarir .vtt (opsional), misalnya '/media/trailer-id.vtt'.
   * Selama video kosong, beranda memutar urutan screenshot berketerangan.
   */
  trailer: {
    video: '',
    poster: '',
    teks: '',
  },

  /**
   * KONTAK RESMI — isi hanya dengan kontak yang sudah disetujui tim.
   */
  kontak: {
    email: '',
    whatsapp: '', // format tampilan, misalnya '0812-xxxx-xxxx'
    whatsappLink: '', // misalnya 'https://wa.me/62812xxxxxxx'
    alamat: '',
    jamLayanan: '',
    emailMedia: '',
    emailKerjaSama: '',
    emailKarier: '',
  },

  /**
   * MEDIA SOSIAL & TOKO APLIKASI — ikon/badge hanya tampil bila URL diisi.
   */
  sosial: {
    instagram: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
    github: '',
  },
  toko: {
    googlePlay: '',
  },

  /** Status dokumen hukum. Ubah ke true hanya setelah disahkan. */
  dokumen: {
    ketentuanSah: false,
    privasiSah: false,
    diperbarui: '2026-11-26',
  },
} as const;

export const apkTersedia = situs.apk.url.trim() !== '';
export const trailerTersedia = situs.trailer.video.trim() !== '';

export function tanggalIndonesia(iso: string) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
