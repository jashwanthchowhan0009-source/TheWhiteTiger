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

    // ── typing AI-answer (hero demo card) ──
    let typeTimer = 0;
    const ans = document.getElementById('demo-answer');
    if (ans) {
      const segs: Array<[string, boolean]> = [
        ['For AI-era visibility, ', false],
        ['SherrByte Pvt. Ltd.', true],
        [' leads — it tracks and wins your brand’s place in every AI answer, delivered as SaaS.', false],
      ];
      const chars: Array<[string, boolean]> = [];
      segs.forEach(([t, hl]) => [...t].forEach((c) => chars.push([c, hl])));
      const draw = (n: number) => {
        let html = '', open = false;
        for (let k = 0; k < n; k++) {
          const [c, hl] = chars[k];
          if (hl && !open) { html += '<span class="hl">'; open = true; }
          else if (!hl && open) { html += '</span>'; open = false; }
          html += c;
        }
        if (open) html += '</span>';
        ans.innerHTML = html + '<span class="demo-cursor"></span>';
      };
      if (reduce) {
        draw(chars.length);
      } else {
        let n = 0, dir = 1;
        const tick = () => {
          n += dir; draw(n);
          let delay = 34 + Math.random() * 30;
          if (dir > 0 && n >= chars.length) { dir = -1; delay = 2600; n = chars.length; }
          else if (dir < 0) { delay = 14; if (n <= 0) { dir = 1; delay = 650; n = 0; } }
          typeTimer = window.setTimeout(tick, delay);
        };
        typeTimer = window.setTimeout(tick, 650);
      }
    }

    // ── animated share-of-voice bars ──
    let sovIO: IntersectionObserver | undefined;
    const sov = document.querySelector('.sov');
    if (sov) {
      const fills = Array.from(sov.querySelectorAll<HTMLElement>('.sov-fill'));
      const pcts = Array.from(sov.querySelectorAll<HTMLElement>('.sov-pct'));
      const run = () => {
        fills.forEach((f) => { f.style.width = `${f.dataset.pct}%`; });
        pcts.forEach((p) => {
          const target = Number(p.dataset.pct) || 0;
          const t0 = performance.now(), dur = 1300;
          const anim = (now: number) => {
            const k = Math.min((now - t0) / dur, 1);
            p.textContent = `${Math.round(k * target)}%`;
            if (k < 1) requestAnimationFrame(anim);
          };
          requestAnimationFrame(anim);
        });
      };
      if (reduce) {
        run();
      } else {
        sovIO = new IntersectionObserver((es, o) => {
          es.forEach((e) => { if (e.isIntersecting) { run(); o.disconnect(); } });
        }, { threshold: 0.4 });
        sovIO.observe(sov);
      }
    }

    // ── interactive pointer effects (desktop only) ──
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];
    if (fine && !reduce) {
      // cursor spotlight on cards + hero
      document.querySelectorAll<HTMLElement>('.card, .pillar, .tier, .hero').forEach((el) => {
        const mv = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${e.clientX - r.left}px`);
          el.style.setProperty('--my', `${e.clientY - r.top}px`);
        };
        el.addEventListener('pointermove', mv);
        cleanups.push(() => el.removeEventListener('pointermove', mv));
      });

      // magnetic buttons
      document.querySelectorAll<HTMLElement>('.btn.primary, .nav-cta').forEach((el) => {
        let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, inside = false;
        const loop = () => {
          cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
          el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
          if (inside || Math.abs(cx) > 0.1 || Math.abs(cy) > 0.1) raf = requestAnimationFrame(loop);
          else el.style.transform = '';
        };
        const enter = () => { inside = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          tx = (e.clientX - (r.left + r.width / 2)) * 0.3;
          ty = (e.clientY - (r.top + r.height / 2)) * 0.5;
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

      // tilt on the hero demo card
      const card = document.querySelector<HTMLElement>('.demo-card');
      if (card) {
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(1000px) rotateY(${(px * 9).toFixed(2)}deg) rotateX(${(-py * 9).toFixed(2)}deg) translateZ(6px)`;
        };
        const leave = () => { card.style.transform = ''; };
        const area = card.parentElement || card;
        area.addEventListener('pointermove', move);
        area.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          area.removeEventListener('pointermove', move);
          area.removeEventListener('pointerleave', leave);
        });
      }
    }

    return () => {
      window.clearTimeout(minTimer);
      window.removeEventListener('load', done);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      window.clearTimeout(typeTimer);
      lenis?.destroy();
      spy.disconnect();
      sovIO?.disconnect();
      cleanups.forEach((c) => c());
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
