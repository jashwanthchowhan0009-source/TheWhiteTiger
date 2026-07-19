import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/sections/Hero';
import { Elegance } from './components/sections/Elegance';
import { About } from './components/sections/About';
import { Gallery } from './components/sections/Gallery';
import { Company } from './components/sections/Company';
import { Contact } from './components/sections/Contact';

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── scroll progress bar + nav condense ──
    const bar = document.getElementById('progress');
    const nav = document.querySelector('.nav');
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.transform = `scaleX(${p})`;
      nav?.classList.toggle('shrunk', h.scrollTop > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── reveal-on-scroll (staggered) — pure IntersectionObserver, no libs ──
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-r], .sec .wrap > *, .hero-grid > *, .card, .pillar, .phase, .stat, .cmp')
    );
    if (reduce) {
      targets.forEach((el) => el.classList.add('in'));
    } else {
      targets.forEach((el) => el.setAttribute('data-r', ''));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
              el.classList.add('in');
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      targets.forEach((el) => io.observe(el));
    }

    // ── count-up stats ──
    document.querySelectorAll<HTMLElement>('.stat b[data-to]').forEach((el) => {
      const to = parseFloat(el.dataset.to || '0');
      const suffix = el.dataset.suffix || '';
      const pad = el.dataset.pad === '1';
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          if (reduce) { el.textContent = (pad && to < 10 ? '0' + to : to) + suffix; return; }
          const t0 = performance.now();
          const step = (t: number) => {
            const k = Math.min(1, (t - t0) / 1200);
            const v = Math.round((1 - Math.pow(1 - k, 3)) * to);
            el.textContent = (pad && v < 10 ? '0' + v : v) + suffix;
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.6 });
      io.observe(el);
    });

    // ── cursor spotlight (desktop, fine pointer only) — smooth, rAF-throttled ──
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let cleanupPointer = () => {};
    if (fine && !reduce) {
      let mx = 0, my = 0, queued = false;
      const apply = () => {
        queued = false;
        root.style.setProperty('--mx', mx + 'px');
        root.style.setProperty('--my', my + 'px');
      };
      const onMove = (e: PointerEvent) => {
        mx = e.clientX; my = e.clientY;
        if (!queued) { queued = true; requestAnimationFrame(apply); }
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      cleanupPointer = () => window.removeEventListener('pointermove', onMove);
    }

    return () => { window.removeEventListener('scroll', onScroll); cleanupPointer(); };
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <div id="progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Elegance />
        <About />
        <Gallery />
        <Company />
        <Contact />
      </main>
    </>
  );
}
