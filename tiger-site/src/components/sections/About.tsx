import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PILLARS = [
  { c: '#6d28d9', t: 'Society & Governance', s: 'Policy, civics & public life' },
  { c: '#2563eb', t: 'Business & Economy', s: 'Markets, startups & trade' },
  { c: '#0891b2', t: 'Science & Technology', s: 'Research, computing & AI' },
  { c: '#16a34a', t: 'Arts & Culture', s: 'Film, music & heritage' },
  { c: '#ca8a04', t: 'Natural World', s: 'Climate, environment & ecology' },
  { c: '#ea580c', t: 'The Self & Wellbeing', s: 'Health, mind & growth' },
  { c: '#dc2626', t: 'Philosophy & Belief', s: 'Ideas, ethics & meaning' },
  { c: '#db2777', t: 'Society & Lifestyle', s: 'Living, food & travel' },
  { c: '#7c3aed', t: 'Sports & Gaming', s: 'Play, competition & esports' },
];

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
    <section id="about" className="section h-100" style={{ display: 'flex', alignItems: 'center', paddingTop: '12vh', paddingBottom: '12vh' }}>
      <div className="layer-front copy-scrim r sec-copy" style={{ marginLeft: 'auto', maxWidth: '56ch' }} data-reveal>
        <span className="num-label">02 — VIBGYOR</span>
        <h2 className="h-sec">The 9-pillar<br /><span className="italic amber">VIBGYOR</span> taxonomy.</h2>
        <p className="col-copy" style={{ maxWidth: '48ch' }}>
          Every piece of information is classified into a colour-coded knowledge pillar spanning
          50+ micro-topics — a standardised structure no other Indian platform offers.
        </p>
        <div className="pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.t}>
              <span className="dot" style={{ background: p.c }} />
              <div>
                <div className="p-t">{p.t}</div>
                <div className="p-s">{p.s}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="stats">
          <Stat to={9} pad label="Knowledge pillars" />
          <Stat to={50} suffix="+" label="Micro-topics" />
          <Stat to={24} suffix="+" label="Verified sources" />
        </div>
      </div>
    </section>
  );
}
