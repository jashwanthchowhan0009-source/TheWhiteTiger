import { useEffect } from 'react';
import Lenis from 'lenis';
import { Nav } from './components/Nav';
import { Hero } from './components/sections/Hero';
import { Elegance } from './components/sections/Elegance';
import { About } from './components/sections/About';
import { Gallery } from './components/sections/Gallery';
import { Company } from './components/sections/Company';
import { Contact } from './components/sections/Contact';

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Lenis smooth scroll ──
    let lenis: Lenis | undefined;
    let rafId = 0;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const raf = (t: number) => { lenis!.raf(t); rafId = requestAnimationFrame(raf); };
      rafId = requestAnimationFrame(raf);
    }

    // ── progress bar + nav condense ──
    const bar = document.getElementById('progress');
    const nav = document.querySelector('.nav');
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.transform = `scaleX(${p})`;
      nav?.classList.toggle('shrunk', h.scrollTop > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── reveal on scroll (staggered) ──
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (reduce) {
      targets.forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const sibs = Array.from(el.parentElement?.querySelectorAll<HTMLElement>(':scope > .reveal') || []);
            el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 6) * 70}ms`;
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      targets.forEach((el) => io.observe(el));
    }

    // ── live "sources streaming" counter ──
    const counter = document.getElementById('live-count');
    let ci = 0;
    const tick = window.setInterval(() => {
      if (!counter) return;
      const base = 12904 + Math.floor(Math.sin(ci / 6) * 40) + ci;
      ci = (ci + 1) % 240;
      counter.textContent = base.toLocaleString();
    }, 1400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(tick);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden="true"><i className="a1" /><i className="a2" /><i className="a3" /></div>
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
