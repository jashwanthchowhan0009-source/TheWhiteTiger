const STEPS = [
  { n: '01', t: 'Ingest', s: 'Real-time crawl of 24+ verified RSS sources' },
  { n: '02', t: 'Deduplicate', s: 'Custom engine removes duplicates & noise' },
  { n: '03', t: 'Summarise', s: 'Gemini→Groq cascade · WWWW synthesis' },
  { n: '04', t: 'Embed', s: 'Local MiniLM 384-dim vectors, near-zero cost' },
  { n: '05', t: 'Classify', s: '9-pillar VIBGYOR & ~50 micro-topics' },
  { n: '06', t: 'Rank & Serve', s: 'EMA profiles + MMR re-ranker, diverse feed' },
];

export function Gallery() {
  return (
    <section id="pipeline" className="sec">
      <div className="wrap">
        <span className="label">03 — The Pipeline</span>
        <h2>From raw noise to verified <em>truth</em>.</h2>
        <p className="sec-lead">
          A rigorous six-stage AI pipeline runs over 24+ verified global and Indian sources,
          every minute — with RAG-consensus hallucination control on every summary.
        </p>
        <div className="grid-3">
          {STEPS.map((s) => (
            <div className="card step" key={s.n}>
              <span className="step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
