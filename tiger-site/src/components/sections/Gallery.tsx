const CARDS = [
  { idx: '01', t: 'Ingest', s: 'Real-time crawl of 24+ verified RSS sources' },
  { idx: '02', t: 'Deduplicate', s: 'Custom engine removes duplicates & noise' },
  { idx: '03', t: 'Summarise', s: 'Gemini→Groq cascade · WWWW synthesis' },
  { idx: '04', t: 'Embed', s: 'Local MiniLM 384-dim vectors, near-zero cost' },
  { idx: '05', t: 'Classify', s: '9-pillar VIBGYOR & ~50 micro-topics' },
  { idx: '06', t: 'Rank & Serve', s: 'EMA profiles + MMR re-ranker, diverse feed' },
];

export function Gallery() {
  return (
    <section id="gallery" className="section h-150">
      <div className="layer-back" style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <div className="giant" data-giant style={{ fontSize: '19vw' }}>TRUTH</div>
      </div>
      <div className="layer-front copy-scrim sec-copy" style={{ position: 'absolute', top: '15vh', left: 'clamp(20px,5vw,64px)', maxWidth: '38ch' }} data-reveal>
        <span className="num-label">03 — The Pipeline</span>
        <h2 className="h-sec" style={{ marginBottom: 12 }}>From raw noise to<br />verified <span className="italic amber">truth</span>.</h2>
        <p className="col-copy" style={{ maxWidth: '38ch' }}>
          A rigorous six-stage AI pipeline runs over 24+ verified global and Indian sources,
          every minute — with RAG-consensus hallucination control on every summary.
        </p>
      </div>
      <div className="layer-front" style={{ position: 'absolute', bottom: '10vh', left: 0, right: 0, padding: '0 clamp(20px,5vw,64px)' }} data-reveal>
        <div className="gallery-row">
          {CARDS.map((c) => (
            <article className="card" key={c.idx}>
              <div className="idx">{c.idx}</div>
              <div className="cap"><div className="t serif">{c.t}</div><div className="s">{c.s}</div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
