/**
 * SCREENSHOT APLIKASI
 * Diambil dari mode prototipe (https://hytrack-psas.vercel.app/prototipe/masuk)
 * yang berisi data contoh. Nomor telepon diburamkan, QR tiket tidak diambil.
 *
 * Untuk mengganti: timpa file dengan nama yang sama di
 * src/assets/screenshots/ (PNG/JPG, potret 390×844 atau kelipatannya).
 */
import beranda from '../assets/screenshots/beranda.png';
import pilihPoli from '../assets/screenshots/pilih-poli.png';
import jadwalDokter from '../assets/screenshots/jadwal-dokter.png';
import tiket from '../assets/screenshots/tiket.png';
import pantauAntrean from '../assets/screenshots/pantau-antrean.png';
import dashboardPetugas from '../assets/screenshots/dashboard-petugas.png';

export const screenshots = {
  beranda: { src: beranda, alt: 'Beranda pasien HyTrack dengan tombol Ambil antrean (data contoh)' },
  pilihPoli: { src: pilihPoli, alt: 'Daftar poliklinik dengan jumlah dokter praktik dan perkiraan tunggu (data contoh)' },
  jadwalDokter: { src: jadwalDokter, alt: 'Pilihan tanggal, dokter, jadwal praktik, dan sisa kuota (data contoh)' },
  tiket: { src: tiket, alt: 'Tiket kunjungan B-014 dengan pesan Berangkat sebelum 12.20 (data contoh)' },
  pantauAntrean: { src: pantauAntrean, alt: 'Status antrean: pasien menunggu, perkiraan tunggu, dan nomor yang sedang dilayani (data contoh)' },
  dashboardPetugas: { src: dashboardPetugas, alt: 'Dashboard petugas poli: daftar antrean, pasien yang sedang diperiksa, dan tombol panggil (data contoh)' },
} as const;

export type KunciScreenshot = keyof typeof screenshots;
