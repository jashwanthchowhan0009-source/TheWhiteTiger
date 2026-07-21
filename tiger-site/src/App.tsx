import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Nav } from './components/Nav';
import { Hero } from './components/sections/Hero';
import { Elegance } from './components/sections/Elegance';
import { About } from './components/sections/About';
import { Gallery } from './components/sections/Gallery';
import { Company } from './components/sections/Company';
import { Contact } from './components/sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── loader dismiss ──
    const done = () => setLoaded(true);
    const minTimer = window.setTimeout(done, reduce ? 300 : 1400);
    window.addEventListener('load', done, { once: true });

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

    // ── live counter ──
    const counter = document.getElementById('live-count');
    let ci = 0;
    const tick = window.setInterval(() => {
      if (!counter) return;
      const base = 12904 + Math.floor(Math.sin(ci / 6) * 40) + ci;
      ci = (ci + 1) % 240;
      counter.textContent = base.toLocaleString();
    }, 1400);

    // ── magnetic buttons (subtle, damped, rAF — desktop only) ──
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];
    if (fine && !reduce) {
      const mags = Array.from(document.querySelectorAll<HTMLElement>('.btn.primary, .nav-cta'));
      mags.forEach((el) => {
        let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, inside = false;
        const loop = () => {
          cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
          el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
          if (inside || Math.abs(cx) > 0.1 || Math.abs(cy) > 0.1) raf = requestAnimationFrame(loop);
          else { el.style.transform = ''; }
        };
        const enter = () => { inside = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          tx = (e.clientX - (r.left + r.width / 2)) * 0.18;
          ty = (e.clientY - (r.top + r.height / 2)) * 0.28;
        };
        const leave = () => { inside = false; tx = 0; ty = 0; };
        el.addEventListener('pointerenter', enter);
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          cancelAnimationFrame(raf);
          el.removeEventListener('pointerenter', enter);
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        });
      });
    }

    return () => {
      window.clearTimeout(minTimer);
      window.removeEventListener('load', done);
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(tick);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <>
      <div className={`loader${loaded ? ' done' : ''}`} aria-hidden={loaded}>
        <div className="loader-in">
          <img src="/tiger.png" alt="SherrByte" width={62} height={62} />
          <b>SHERRBYTE</b>
          <div className="bar"><i /></div>
        </div>
      </div>
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
