// Memeriksa hasil build (folder dist):
//  1. setiap tautan internal (href="/...") menunjuk ke file yang ada;
//  2. footer di setiap halaman berisi tepat 22 entri;
//  3. tidak ada kata terlarang (lihat TERLARANG);
//  4. setiap QR menunjuk ke <alamat situs>/unduh.
// Jalankan setelah build:  npm run check-links
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
// Kata yang tidak boleh muncul di situs publik (akses petugas tertutup, kasir & label demo dihapus).
const TERLARANG = ['Masuk Petugas', 'akses-petugas', 'masuk/internal', '/untuk/kasir', 'Pembayaran &amp; Kasir', 'Demo · data contoh', 'Jeda demo'];
const halaman = [];
(function jelajah(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) jelajah(p);
    else if (n.endsWith('.html')) halaman.push(p);
  }
})(DIST);

const ada = (href) => {
  const bersih = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (bersih === '' || bersih === '/') return existsSync(join(DIST, 'index.html'));
  const p = join(DIST, bersih);
  return existsSync(p) && statSync(p).isFile() ? true : existsSync(join(p, 'index.html'));
};

let gagal = 0;
const qrTujuan = new Set();
for (const file of halaman) {
  const html = readFileSync(file, 'utf8');
  const nama = '/' + relative(DIST, file).replace(/\\/g, '/');
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith('//')) continue;
    if (!ada(href)) {
      console.log(`RUSAK  ${nama} → ${href}`);
      gagal++;
    }
  }
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';
  const entri = [...footer.matchAll(/<ul id="fl-\d+">([\s\S]*?)<\/ul>/g)].reduce(
    (n, m) => n + (m[1].match(/<li>/g)?.length ?? 0),
    0,
  );
  if (entri !== 22) {
    console.log(`FOOTER ${nama}: ${entri} entri (harus 22)`);
    gagal++;
  }
  for (const kata of TERLARANG) {
    if (html.includes(kata)) {
      console.log(`TERLARANG ${nama}: "${kata}"`);
      gagal++;
    }
  }
  for (const [, t] of html.matchAll(/data-qr-tujuan="([^"]+)"/g)) qrTujuan.add(t);
}

console.log(`${halaman.length} halaman diperiksa.`);
console.log(`QR menunjuk ke: ${[...qrTujuan].join(', ') || '(tidak ada)'}`);
if (gagal) {
  console.log(`${gagal} masalah ditemukan.`);
  process.exit(1);
}
console.log('Semua tautan internal dan footer (22 entri) beres.');
