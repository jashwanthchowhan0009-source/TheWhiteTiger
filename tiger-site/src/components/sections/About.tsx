import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Stat({ to, suffix, label, decimals = 0, pad = false }: { to: number; suffix?: string; label: string; decimals?: number; pad?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const fmt = (v: number) => {
    const s = decimals ? v.toFixed(decimals) : Math.round(v).toString();
    return (pad && v < 10 && !decimals ? '0' + s : s) + (suffix || '');
  };
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        const dur = 1500, start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          el.textContent = fmt((1 - Math.pow(1 - p, 3)) * to);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
    });
    return () => st.kill();
  }, [to, suffix, decimals, pad]);
  return (
    <div className="stat">
      <b ref={ref}>{fmt(0)}</b>
      <span>{label}</span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section h-100" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="layer-front copy-scrim r sec-copy" style={{ marginLeft: 'auto', maxWidth: '50ch' }} data-reveal>
        <span className="num-label">02 — VIBGYOR</span>
        <h2 className="h-sec">Your feed. Your data.<br />Your <span className="italic amber">call</span>.</h2>
        <p className="col-copy" style={{ maxWidth: '46ch' }}>
          Personalised news, a searchable history and a personal data layer you can see, export
          or delete — anytime.
        </p>
        <p className="col-copy" style={{ maxWidth: '46ch', marginTop: 14 }}>
          Nine pillars organise the world's information into a spectrum you can actually navigate.
        </p>
        <div className="stats">
          <Stat to={24} suffix="+" label="Verified sources" />
          <Stat to={9} pad label="VIBGYOR pillars" />
          <Stat to={100} suffix="%" label="Traceable claims" />
        </div>
      </div>
    </section>
  );
}
