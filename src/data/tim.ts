/**
 * PROFIL TIM HYTRACK
 *
 * Isi hanya dengan data asli dan setelah setiap anggota setuju
 * nama, peran, dan fotonya ditampilkan di situs publik.
 *
 * - foto: simpan di folder public/tim/, misalnya '/tim/nama-depan.jpg'
 *   (persegi, minimal 400×400 px). Kosongkan bila tidak ada izin foto;
 *   situs akan menampilkan inisial.
 * - tautan: opsional, misalnya profil LinkedIn atau GitHub.
 *
 * Contoh satu entri:
 *   { nama: 'Nama Lengkap', peran: 'Pengembang Backend', foto: '', tautan: '' },
 */
export type Anggota = {
  nama: string;
  peran: string;
  foto?: string;
  tautan?: string;
};

export const tim: Anggota[] = [];

/** Kalimat pengantar tim, misalnya asal kampus/program. Kosongkan bila belum ada. */
export const pengantarTim = '';
