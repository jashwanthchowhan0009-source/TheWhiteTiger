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
      <div className="layer-front" style={{ marginLeft: 'auto', maxWidth: '46ch' }} data-reveal>
        <span className="num-label">02 — The Making</span>
        <h2 className="h-sec">Carved,<br />not cast.</h2>
        <p className="col-copy" style={{ maxWidth: '46ch' }}>
          No mould, no shortcut. A single block met the chisel until the predator emerged —
          the descent, the tension in the haunches, the low unbroken stare.
        </p>
        <p className="col-copy" style={{ maxWidth: '46ch', marginTop: 14 }}>
          What remains is weight and patience, made to be circled and studied from every angle.
        </p>
        <div className="stats">
          <Stat to={120} suffix="+" label="Hours of carving" />
          <Stat to={1.2} suffix="t" decimals={1} label="Tonnes of granite" />
          <Stat to={1} pad label="Apex predator" />
        </div>
      </div>
    </section>
  );
}
