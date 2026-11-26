# HyTrack — website publik

Situs informasi HyTrack, "Teman Perjalanan Berobat": tempat pasien mengunduh aplikasi Android, menonton trailer, belajar memakai aplikasi, dan mengenal tim.

Situs ini **tidak** menangani login, daftar, atau booking. Semua itu ada di aplikasi yang sudah berjalan di <https://hytrack-psas.vercel.app/>; situs ini hanya mengarahkan ke sana.

- Dibangun dengan [Astro](https://astro.build) sebagai situs statis. Setiap halaman menjadi file HTML sendiri, jadi bisa dibuka lewat URL langsung dan tetap terbuka setelah di-refresh.
- Tanpa formulir, cookie pelacak, atau analitik.
- Isi fitur dicocokkan dengan kode aplikasi `hytrack-laravel` per 26 November 2026. Fitur yang belum ada diberi label **Dalam pengembangan**.

## Menjalankan di komputer sendiri

Butuh Node.js 22.12 atau lebih baru. Jalankan satu per satu di PowerShell:

```powershell
cd D:\laragon\www\hytrack
```

```powershell
npm install
```

```powershell
npm run dev
```

Buka <http://localhost:4321>. Tekan `Ctrl + C` untuk berhenti.

Untuk mencoba hasil build seperti di Vercel:

```powershell
npm run build
```

```powershell
npm run check-links
```

```powershell
npm run preview
```

`npm run check-links` memeriksa semua tautan internal, memastikan footer berisi 24 entri di setiap halaman, dan menampilkan alamat yang dibuka QR.

## Deploy ke Vercel

Deploy hanya setelah tim setuju. Cara termudah lewat GitHub:

1. Buat repo kosong bernama `hytrack` di akun GitHub tujuan.
2. Hubungkan folder ini ke repo itu, lalu kirim (ganti `AKUN`):

```powershell
git add .
```

```powershell
git commit -m "Website publik HyTrack"
```

```powershell
git remote add origin https://github.com/AKUN/hytrack.git
```

```powershell
git push -u origin main
```

3. Di <https://vercel.com/new>, pilih repo `hytrack`, lalu tekan **Deploy**. Pengaturan sudah ada di `vercel.json`; tidak ada variabel lingkungan yang wajib diisi.

Atau lewat Vercel CLI tanpa GitHub:

```powershell
npx vercel
```

```powershell
npx vercel --prod
```

**QR mengikuti alamat situs secara otomatis.** Di Vercel, QR dibuat dari domain produksi proyek (`VERCEL_PROJECT_PRODUCTION_URL`). Bila memakai domain sendiri, isi variabel lingkungan `PUBLIC_SITE_URL` (contoh di `.env.example`) di pengaturan proyek Vercel, lalu deploy ulang.

## File yang perlu diganti

| Yang diganti | File persis | Keterangan |
| --- | --- | --- |
| APK Android (URL, versi, ukuran, tanggal) | `src/config/situs.ts` → bagian `apk` | Satu-satunya tempat data APK. Selama `url` kosong, situs menampilkan "APK Android segera tersedia". File APK boleh ditaruh di `public/apk/` lalu ditulis `'/apk/nama-file.apk'`. |
| Trailer video | `src/config/situs.ts` → bagian `trailer`, file video di `public/media/` | Contoh: `video: '/media/trailer-hytrack.mp4'`, `poster: '/media/trailer-poster.jpg'`. Selama kosong, beranda memutar urutan screenshot. |
| Screenshot aplikasi | `src/assets/screenshots/` (`beranda.png`, `pilih-poli.png`, `jadwal-dokter.png`, `tiket.png`, `pantau-antrean.png`, `dashboard-petugas.png`) | Timpa dengan nama yang sama. Teks alternatif ada di `src/data/screenshots.ts`. |
| Kontak resmi | `src/config/situs.ts` → bagian `kontak` | Email, WhatsApp, alamat, jam layanan, email media/kerja sama/karier. |
| Media sosial & Google Play | `src/config/situs.ts` → bagian `sosial` dan `toko` | Tautan dan badge hanya tampil bila URL diisi. |
| Profil tim | `src/data/tim.ts`, foto di `public/tim/` | Isi hanya setelah setiap anggota setuju. |
| Status ketentuan & privasi | `src/config/situs.ts` → bagian `dokumen`; teks di `src/pages/ketentuan.astro` dan `src/pages/privasi.astro` | Ubah `ketentuanSah`/`privasiSah` ke `true` hanya setelah disahkan. |
| Logo | `src/assets/logo-hytrack.png`, lalu jalankan `node scripts/buat-aset.mjs` | Membuat ulang favicon, gambar pratinjau tautan, dan logo unduhan di Pusat Media. |
| Isi halaman fitur & pengguna | `src/data/halaman.ts` | Satu objek per halaman `/fitur/...` dan `/untuk/...`. |
| Artikel | `src/data/artikel.ts` | Artikel baru otomatis mendapat halaman `/artikel/<slug>`. |
| Pertanyaan umum | `src/data/faq.ts` | Dipakai di beranda dan `/bantuan`. |
| Menu & footer | `src/data/navigasi.ts` | Footer harus tetap 24 entri (diperiksa `npm run check-links`). |

## Data yang masih ditunggu

Bagian berikut sengaja dikosongkan dan ditandai jelas di situs; jangan diisi dengan data karangan:

- Data tim (nama, peran, foto, izin tampil).
- URL APK rilis resmi, versi, ukuran, tanggal rilis.
- File trailer.
- Kontak resmi dan akun media sosial.
- Teks ketentuan yang sah dan bagian privasi bertanda "Perlu dikonfirmasi".
- Izin memakai screenshot (diambil dari mode prototipe dengan data contoh).

## Struktur

```text
src/config/situs.ts       Konfigurasi: tautan aplikasi, APK, trailer, kontak, sosial
src/data/                 Isi halaman fitur/pengguna, artikel, FAQ, tim, navigasi, screenshot
src/assets/               Logo dan screenshot (dioptimalkan otomatis saat build)
src/components/           Tombol unduh, QR, bingkai HP, trailer, status, templat halaman
src/layouts/Base.astro    Header, footer 4 kolom (akordeon di HP), deteksi perangkat
src/pages/                Setiap file = satu halaman
scripts/                  buat-aset.mjs (favicon, OG), cek-tautan.mjs (pemeriksa build)
public/                   File apa adanya: favicon, logo media, apk/, tim/
```

**Tombol per perangkat:** skrip kecil di `Base.astro` menandai perangkat (Android, iPhone, desktop). Bila APK tersedia, Android dan desktop mengutamakan **Unduh untuk Android**, iPhone mengutamakan **Buka HyTrack Web**. Selama APK belum ada, **Buka HyTrack Web** diutamakan di semua perangkat. Untuk menguji, tambahkan `?perangkat=android`, `?perangkat=ios`, atau `?perangkat=desktop` di URL.
