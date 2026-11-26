import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// Alamat publik situs ini. Dipakai untuk QR unduhan dan tautan kanonik.
// Urutan: PUBLIC_SITE_URL (variabel lingkungan atau file .env) → domain produksi Vercel → localhost.
const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };
const vercel = env.VERCEL_PROJECT_PRODUCTION_URL;
const site = env.PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : 'http://localhost:4321');

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
