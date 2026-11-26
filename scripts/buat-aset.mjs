// Membuat favicon dan gambar pratinjau tautan (Open Graph) dari logo.
// Jalankan ulang setelah mengganti logo:  node scripts/buat-aset.mjs
import sharp from 'sharp';

const logo = 'src/assets/logo-hytrack.png';

await sharp(logo)
  .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('public/assets/favicon.png');

await sharp(logo)
  .resize(180, 180, { fit: 'contain', background: '#fbfaf6' })
  .png()
  .toFile('public/assets/apple-touch-icon.png');

await sharp(logo).resize(512).png().toFile('public/media/logo-hytrack-512.png');

const logoKecil =await sharp(logo).resize(300).png().toBuffer();
const teks = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#fbfaf6"/>
  <circle cx="1050" cy="120" r="320" fill="#e1efe7"/>
  <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="#086f65">HyTrack</text>
  <text x="84" y="356" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#4d625e" letter-spacing="3">TEMAN PERJALANAN BEROBAT</text>
  <text x="84" y="460" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#0b3b37">Pantau antreanmu sebelum berangkat.</text>
</svg>`);

await sharp(teks)
  .composite([{ input: logoKecil, left: 830, top: 170 }])
  .png()
  .toFile('public/assets/og-hytrack.png');

console.log('Aset dibuat: favicon.png, apple-touch-icon.png, og-hytrack.png');
