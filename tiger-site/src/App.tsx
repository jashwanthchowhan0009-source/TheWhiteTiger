import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Nav } from './components/Nav';
import { Hero } from './components/sections/Hero';
import { Elegance } from './components/sections/Elegance';
import { About } from './components/sections/About';
import { Gallery } from './components/sections/Gallery';
import { Contact } from './components/sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── loader dismiss ──
    const done = () => setLoaded(true);
    const minTimer = window.setTimeout(done, reduce ? 200 : 1100);
    window.addEventListener('load', done, { once: true });

    // ── Lenis smooth scroll ──
    let lenis: Lenis | undefined;
    let rafId = 0;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
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
      nav?.classList.toggle('shrunk', h.scrollTop > 20);
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
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      targets.forEach((el) => io.observe(el));
    }

    // ── active nav-link scroll-spy ──
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.links a'));
    const linkFor = (id: string) => navLinks.find((a) => a.getAttribute('href') === `#${id}`);
    const spySections = ['geo', 'sbbs', 'how', 'pricing']
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => !!s);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove('active'));
          linkFor(e.target.id)?.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spySections.forEach((s) => spy.observe(s));

    return () => {
      window.clearTimeout(minTimer);
      window.removeEventListener('load', done);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      spy.disconnect();
    };
  }, []);

  return (
    <>
      <div className={`loader${loaded ? ' done' : ''}`} aria-hidden={loaded}>
        <div className="loader-in">
          <b>SherrByte</b>
          <div className="bar"><i /></div>
        </div>
      </div>
      <div id="progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Elegance />
        <About />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
