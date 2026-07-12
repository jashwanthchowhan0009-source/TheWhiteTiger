import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../scroll/tigerState';

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll (Lenis) + section reveals + watermark parallax. Pure 2D.
export function useScroll(ready: boolean) {
  useEffect(() => {
    if (!ready) return;

    if (prefersReducedMotion()) {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => (el.style.opacity = '1'));
      return;
    }

    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.5 });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
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
