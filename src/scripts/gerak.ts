/**
 * Lapisan gerak situs HyTrack, terinspirasi rasa gulir lenis.dev:
 * gulir halus (Lenis), judul yang muncul per kata, teks yang menyala saat digulir,
 * scrollytelling lengket, gulir menyamping, kartu bertumpuk, parallax, tombol magnetis,
 * tirai pergantian halaman, dan bilah kemajuan baca.
 *
 * Aturan:
 * - Bila pengguna memilih "kurangi gerakan", semua efek gulir dimatikan dan halaman tampil statis.
 * - Konten hanya disembunyikan setelah kelas html.gerak dipasang, jadi bila skrip gagal semua teks tetap terlihat.
 * - Hanya transform dan opacity yang dianimasikan.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const root = document.documentElement;
const kurangiGerak = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointerHalus = matchMedia('(pointer: fine)').matches;
const lebar = matchMedia('(min-width: 960px)');

/* ---------- Selalu aktif: status header & bilah kemajuan ---------- */
const header = document.querySelector<HTMLElement>('.site-header');
const kemajuan = document.querySelector<HTMLElement>('.kemajuan');
function perbaruiKepala() {
  header?.classList.toggle('digulir', window.scrollY > 24);
  if (kemajuan) {
    const maks = document.documentElement.scrollHeight - window.innerHeight;
    kemajuan.style.transform = `scaleX(${maks > 0 ? Math.min(1, window.scrollY / maks) : 0})`;
  }
}
perbaruiKepala();
window.addEventListener('scroll', perbaruiKepala, { passive: true });

/* ---------- Penanda bagian (halaman teks panjang) ---------- */
pasangPenandaBagian();

if (!kurangiGerak) {
  try {
    mulaiGerak();
  } catch (e) {
    // Jangan biarkan konten tersembunyi bila ada galat.
    root.classList.remove('gerak');
    console.error(e);
  }
}

function mulaiGerak() {
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add('gerak');

  /* Gulir halus, setara pengaturan di Emergent. */
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
    anchors: { offset: -110 },
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

  aturTirai();
  aturJudulMask();
  aturReveal();
  aturNyala();
  aturParallax();
  aturMiring();
  aturMarquee(lenis);
  aturCerita();
  aturSamping(lenis);
  aturTumpuk();
  aturMagnet();
  aturWordmark();

  // Hitung ulang setelah gambar & font selesai dimuat.
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/* ---------- Tirai: menutup layar saat pindah halaman internal ---------- */
function aturTirai() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest('a');
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    try {
      sessionStorage.setItem('hytrack-tirai', '1');
    } catch {}
    root.classList.remove('tirai-masuk');
    root.classList.add('tirai-pergi');
    window.setTimeout(() => (location.href = url.href), 420);
  });
  // Kembali lewat tombol Back (bfcache): buka lagi halamannya.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) root.classList.remove('tirai-pergi', 'tirai-masuk');
  });
}

/* ---------- Judul muncul per kata dari balik mask ---------- */
function pecahKata(el: HTMLElement, kelas: string) {
  const kata: HTMLElement[] = [];
  const telusuri = (node: Node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (n.textContent || '').split(/(\s+)/).forEach((bagian) => {
          if (!bagian) return;
          if (/^\s+$/.test(bagian)) {
            frag.appendChild(document.createTextNode(bagian));
            return;
          }
          const luar = document.createElement('span');
          luar.className = kelas;
          const dalam = document.createElement('span');
          dalam.textContent = bagian;
          luar.appendChild(dalam);
          frag.appendChild(luar);
          kata.push(dalam);
        });
        n.parentNode?.replaceChild(frag, n);
      } else if (n.nodeType === Node.ELEMENT_NODE && !(n as Element).matches('svg, img, .sr-only')) {
        telusuri(n);
      }
    });
  };
  telusuri(el);
  return kata;
}

function aturJudulMask() {
  const target = document.querySelectorAll<HTMLElement>('[data-mask], .page-hero h1, .section-head h2, .judul-besar');
  target.forEach((el) => {
    if (el.dataset.maskSiap) return;
    el.dataset.maskSiap = '1';
    // Pembaca layar membaca teks utuh, bukan potongan kata.
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', (el.textContent || '').replace(/\s+/g, ' ').trim());
    const kata = pecahKata(el, 'kata-mask');
    kata.forEach((k) => k.parentElement?.setAttribute('aria-hidden', 'true'));
    const diAtasLipatan = el.getBoundingClientRect().top < window.innerHeight;
    gsap.from(kata, {
      yPercent: 110,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.045,
      delay: diAtasLipatan ? 0.15 : 0,
      scrollTrigger: diAtasLipatan ? undefined : { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/* ---------- Muncul lembut saat masuk layar ---------- */
function aturReveal() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });
}

/* ---------- Teks menyala kata demi kata mengikuti gulir ---------- */
function aturNyala() {
  document.querySelectorAll<HTMLElement>('[data-nyala]').forEach((el) => {
    const kata = pecahKata(el, 'kata-nyala');
    gsap.fromTo(
      kata,
      { opacity: 0.18 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true },
      },
    );
  });
}

/* ---------- Parallax ringan ---------- */
function aturParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const kekuatan = Number(el.dataset.parallax) || 12;
    gsap.fromTo(
      el,
      { yPercent: kekuatan / 2 },
      {
        yPercent: -kekuatan / 2,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

/* ---------- HP di hero: miring 3D mengikuti kursor ---------- */
function aturMiring() {
  document.querySelectorAll<HTMLElement>('[data-miring]').forEach((area) => {
    const target = area.querySelector<HTMLElement>('[data-miring-target]');
    if (!target) return;
    gsap.from(target, { opacity: 0, y: 40, rotateX: 12, duration: 1.2, delay: 0.3, ease: 'expo.out' });
    const angkat = area.querySelector<HTMLElement>('[data-angkat]');
    if (angkat) {
      gsap.to(angkat, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: area, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
    if (!pointerHalus) return;
    const rx = gsap.quickTo(target, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const ry = gsap.quickTo(target, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    area.addEventListener('pointermove', (e) => {
      const r = area.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 18);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
    });
    area.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

/* ---------- Marquee yang ikut cepat saat digulir ---------- */
function aturMarquee(lenis: Lenis) {
  document.querySelectorAll<HTMLElement>('.marquee-track').forEach((track) => {
    track.style.animation = 'none';
    const tween = gsap.to(track, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });
    let sasaran = 1;
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      sasaran = 1 + Math.min(6, Math.abs(velocity) * 0.35);
    });
    gsap.ticker.add(() => {
      const kini = tween.timeScale();
      tween.timeScale(kini + (sasaran - kini) * 0.08);
      sasaran += (1 - sasaran) * 0.05;
    });
  });
}

/* ---------- Scrollytelling: langkah menyala, visual menempel ---------- */
function aturCerita() {
  document.querySelectorAll<HTMLElement>('[data-cerita]').forEach((wadah) => {
    const langkah = [...wadah.querySelectorAll<HTMLElement>('[data-langkah]')];
    const garis = wadah.querySelector<HTMLElement>('[data-garis]');
    const nomor = wadah.querySelector<HTMLElement>('[data-nomor-langkah]');
    const visual = wadah.querySelector<HTMLElement>('[data-cerita-visual]');
    if (!langkah.length) return;
    wadah.classList.add('cerita-aktif');
    const aktifkan = (i: number) => {
      langkah.forEach((l, j) => l.classList.toggle('aktif', j === i));
      if (nomor) nomor.textContent = `Langkah ${i + 1} dari ${langkah.length}`;
      wadah.dataset.langkahAktif = String(i);
    };
    aktifkan(0);
    langkah.forEach((l, i) => {
      ScrollTrigger.create({
        trigger: l,
        start: 'top 62%',
        end: 'bottom 62%',
        onToggle: (self) => self.isActive && aktifkan(i),
      });
    });
    if (garis) {
      gsap.fromTo(
        garis,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: langkah[0], endTrigger: langkah[langkah.length - 1], start: 'top 62%', end: 'bottom 62%', scrub: true },
        },
      );
    }
    if (visual) {
      gsap.fromTo(
        visual,
        { scale: 0.94, rotate: -1.5 },
        {
          scale: 1,
          rotate: 0,
          ease: 'none',
          scrollTrigger: { trigger: wadah, start: 'top 80%', end: 'center 50%', scrub: true },
        },
      );
    }
  });
}

/* ---------- Gulir menyamping (layar lebar saja) ---------- */
function aturSamping(lenis: Lenis) {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 960px)', () => {
    document.querySelectorAll<HTMLElement>('[data-samping]').forEach((bagian) => {
      const jalur = bagian.querySelector<HTMLElement>('[data-samping-jalur]');
      if (!jalur) return;
      const jarak = () => Math.max(0, jalur.scrollWidth - (jalur.parentElement?.clientWidth || bagian.clientWidth));
      if (jarak() < 40) return;
      bagian.classList.add('samping-aktif');
      const tween = gsap.to(jalur, {
        x: () => -jarak(),
        ease: 'none',
        scrollTrigger: {
          trigger: bagian,
          start: 'top top+=110',
          end: () => '+=' + jarak(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      // Fokus keyboard ke kartu yang tersembunyi di samping: gulir sampai kartu terlihat.
      jalur.addEventListener('focusin', (e) => {
        const st = tween.scrollTrigger;
        const kartu = (e.target as HTMLElement).closest<HTMLElement>('[data-samping-jalur] > *');
        if (!st || !kartu) return;
        const rasio = Math.min(1, kartu.offsetLeft / Math.max(1, jarak()));
        lenis.scrollTo(st.start + rasio * (st.end - st.start), { immediate: true });
      });
      return () => bagian.classList.remove('samping-aktif');
    });
  });
}

/* ---------- Kartu bertumpuk ---------- */
function aturTumpuk() {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    document.querySelectorAll<HTMLElement>('[data-tumpuk]').forEach((wadah) => {
      const kartu = [...wadah.querySelectorAll<HTMLElement>('[data-tumpuk-kartu]')];
      kartu.forEach((k, i) => {
        const berikut = kartu[i + 1];
        if (!berikut) return;
        gsap.to(k, {
          scale: 0.92,
          rotate: i % 2 ? 1.2 : -1.2,
          ease: 'none',
          scrollTrigger: { trigger: berikut, start: 'top bottom', end: 'top 30%', scrub: true },
        });
      });
    });
  });
}

/* ---------- Tombol magnetis (desktop) ---------- */
function aturMagnet() {
  if (!pointerHalus) return;
  document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.25);
      y((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => {
      x(0);
      y(0);
    });
  });
}

/* ---------- Tulisan besar di footer bergeser saat terlihat ---------- */
function aturWordmark() {
  document.querySelectorAll<HTMLElement>('[data-wordmark]').forEach((el) => {
    gsap.fromTo(
      el,
      { xPercent: -8, opacity: 0.4 },
      { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true } },
    );
  });
}

/* ---------- Penanda bagian untuk halaman teks panjang ---------- */
function pasangPenandaBagian() {
  const prosa = document.querySelector<HTMLElement>('[data-penanda] , .prose');
  if (!prosa) return;
  const judul = [...prosa.querySelectorAll<HTMLElement>('h2')];
  if (judul.length < 3) return;
  judul.forEach((h, i) => {
    if (!h.id) h.id = 'bagian-' + (i + 1);
  });
  const pil = document.createElement('div');
  pil.className = 'toc-pil';
  pil.innerHTML = `<button type="button" aria-expanded="false" aria-controls="toc-daftar"><span class="toc-no"></span><span class="toc-judul"></span><span class="sr-only">. Tampilkan daftar bagian</span></button><ol id="toc-daftar" hidden></ol>`;
  const daftar = pil.querySelector('ol')!;
  const tombol = pil.querySelector('button')!;
  judul.forEach((h, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent?.trim() || `Bagian ${i + 1}`;
    a.addEventListener('click', () => {
      daftar.hidden = true;
      tombol.setAttribute('aria-expanded', 'false');
    });
    li.appendChild(a);
    daftar.appendChild(li);
  });
  document.body.appendChild(pil);
  tombol.addEventListener('click', () => {
    const buka = daftar.hidden;
    daftar.hidden = !buka;
    tombol.setAttribute('aria-expanded', String(buka));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !daftar.hidden) {
      daftar.hidden = true;
      tombol.setAttribute('aria-expanded', 'false');
      tombol.focus();
    }
  });
  const no = pil.querySelector<HTMLElement>('.toc-no')!;
  const teks = pil.querySelector<HTMLElement>('.toc-judul')!;
  const tautan = [...daftar.querySelectorAll('a')];
  const perbarui = () => {
    const batas = window.innerHeight * 0.35;
    let aktif = -1;
    judul.forEach((h, i) => {
      if (h.getBoundingClientRect().top < batas) aktif = i;
    });
    const r = prosa.getBoundingClientRect();
    const tampil = aktif >= 0 && r.bottom > window.innerHeight * 0.5;
    pil.classList.toggle("tampil", tampil);
    pil.toggleAttribute("inert", !tampil);
    if (!tampil) {
      daftar.hidden = true;
      tombol.setAttribute('aria-expanded', 'false');
    }
    if (aktif >= 0) {
      no.textContent = String(aktif + 1);
      teks.textContent = judul[aktif].textContent?.trim() || '';
      tautan.forEach((a, i) => a.setAttribute('aria-current', String(i === aktif)));
    }
  };
  perbarui();
  window.addEventListener('scroll', perbarui, { passive: true });
}

// Lebar layar berubah: hitung ulang posisi pemicu.
lebar.addEventListener('change', () => {
  if (!kurangiGerak) ScrollTrigger.refresh();
});
