const STEPS = [
  { n: '01', t: 'Audit', s: 'We ask the AI engines about your market and capture exactly how they answer — who they name, quote and recommend.' },
  { n: '02', t: 'Optimize', s: 'We fix the content, structure and authority signals the models actually read, so the next answer includes you.' },
  { n: '03', t: 'Track', s: 'A live dashboard scores your presence across engines and competitors — so you can see the gains, week over week.' },
];

const I = {
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  spark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>,
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>,
};

const CAPS = [
  { t: 'AI visibility audit', s: 'Know precisely how ChatGPT, Claude, Gemini and Perplexity answer for your category.', icon: I.eye },
  { t: 'Content optimization', s: 'The structure, facts and citations the models reward — built into your pages.', icon: I.spark },
  { t: 'Share of voice', s: 'Benchmark your mentions against every competitor, across every engine.', icon: I.chart },
  { t: 'Real-time alerts', s: 'Know the moment an answer about you changes — and why.', icon: I.bolt },
  { t: 'Dashboard + API', s: 'One clean surface for your team, and clean data for your systems.', icon: I.grid },
  { t: 'Sourced & verifiable', s: 'Every score traceable to the exact prompt and answer behind it.', icon: I.shield },
];

export function About() {
  return (
    <>
      <section id="how" className="scene" style={{ scrollMarginTop: 80 }}>
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">How GEO works</span>
            <h2 style={{ marginTop: 18 }}>Audit. Optimize. <em>Track.</em></h2>
            <p className="sec-lead">A continuous loop that turns AI answers into a channel you can actually manage.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step reveal" key={s.t}>
                <span className="n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scene tinted">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">The platform</span>
            <h2 style={{ marginTop: 18 }}>Everything you need to <em>own the answer</em>.</h2>
          </div>
          <div className="grid-3">
            {CAPS.map((c) => (
              <div className="card reveal" key={c.t}>
                <span className="ic">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
