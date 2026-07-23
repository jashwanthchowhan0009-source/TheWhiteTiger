import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Nav } from './components/Nav';
import { Band } from './components/Band';
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

    // ── active nav-link scroll-spy ──
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.links a'));
    const linkFor = (id: string) => navLinks.find((a) => a.getAttribute('href') === `#${id}`);
    const spySections = ['collect', 'process', 'deliver', 'products']
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

    // ── framed video (knowledge graph): fade in + autoplay ──
    document.querySelectorAll<HTMLVideoElement>('.mock-vid video').forEach((v) => {
      const show = () => v.classList.add('ready');
      if (v.readyState >= 2) show(); else v.addEventListener('loadeddata', show, { once: true });
      v.play?.().catch(() => {});
    });

    // ── cinematic bands: reveal the fixed video only while the band is in view ──
    const bands = Array.from(document.querySelectorAll<HTMLElement>('.band'));
    const bandIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const fx = e.target.querySelector<HTMLElement>('.band-fx');
        const v = fx?.querySelector('video');
        if (e.isIntersecting) { fx?.classList.add('show'); v?.play?.().catch(() => {}); }
        else { fx?.classList.remove('show'); v?.pause?.(); }
      });
    }, { threshold: 0.12 });
    bands.forEach((b) => bandIO.observe(b));

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

    // ── 3D tilt on glass panels & cards (desktop only) ──
    if (fine && !reduce) {
      const tilts = Array.from(document.querySelectorAll<HTMLElement>('.tilt'));
      tilts.forEach((el) => {
        const MAX = 5;
        const enter = () => el.classList.add('tilting');
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty('--ry', `${(px * MAX * 2).toFixed(2)}deg`);
          el.style.setProperty('--rx', `${(-py * MAX * 2).toFixed(2)}deg`);
          el.style.setProperty('--tz', `-4px`);
        };
        const leave = () => {
          el.classList.remove('tilting');
          el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--tz', '0px');
        };
        el.addEventListener('pointerenter', enter);
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => {
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
      spy.disconnect();
      bandIO.disconnect();
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
      <div className="aurora" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div id="progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Elegance />
        <Band src="/media/city.mp4" poster="/media/city-poster.jpg"
          eyebrow="The world's public data"
          title={<>Everything happening, <em>in real time</em>.</>}
          lead="News, markets, governments, science, weather — thousands of open sources, watched continuously and turned into one clean signal." />
        <About />
        <Gallery />
        <Company />
        <Band src="/media/tiger.mp4" poster="/media/tiger-poster.jpg"
          eyebrow="The SherrByte ethos"
          title={<>Clarity is a form of <em>power</em>.</>}
          lead="Access to sourced, verifiable truth changes who gets to decide. We build the infrastructure that puts it within reach." />
        <Contact />
      </main>
    </>
  );
}
