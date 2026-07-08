import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tigerState, SHOTS, prefersReducedMotion, debugPose } from '../scroll/tigerState';

gsap.registerPlugin(ScrollTrigger);

// Wires Lenis smooth-scroll to ScrollTrigger and builds the one master timeline
// that scrubs the sculpture through every section pose. Returns nothing; it just
// mutates the shared tigerState which the R3F scene reads each frame.
export function useScroll(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const reduced = prefersReducedMotion();

    // debug: freeze a single pose for framing (?pose=elegance&scale=2.6…)
    const dbg = debugPose();
    if (dbg) {
      Object.assign(tigerState, dbg);
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => (el.style.opacity = '1'));
      return;
    }

    if (reduced) {
      Object.assign(tigerState, SHOTS.hero);
      // still let native scroll work; no smoothing, no scrub
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      reveals.forEach((el) => (el.style.opacity = '1'));
      return;
    }

    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.5 });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // ── master sculpture choreography ──
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '#scroll-root', start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      });
      tl.to(tigerState, { ...SHOTS.elegance, ease: 'none', duration: 1.1 })
        .to(tigerState, { ...SHOTS.about, ease: 'none', duration: 0.9 })
        .to(tigerState, { ...SHOTS.gallery, ease: 'none', duration: 1.1 })
        .to(tigerState, { ...SHOTS.contact, ease: 'none', duration: 0.9 });

      // ── section copy reveals ──
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.9,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });

      // ── giant background words: gentle parallax drift ──
      gsap.utils.toArray<HTMLElement>('[data-giant]').forEach((el) => {
        gsap.fromTo(
          el, { xPercent: -4 }, { xPercent: 4, ease: 'none',
            scrollTrigger: { trigger: el.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: true } }
        );
      });
    });

    ScrollTrigger.refresh();
    return () => { ctx.revert(); gsap.ticker.remove(raf); lenis.destroy(); };
  }, [ready]);
}
