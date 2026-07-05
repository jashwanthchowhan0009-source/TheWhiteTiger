const CARDS = [
  { idx: 'I', t: 'Ingest', s: 'Real-time sources' },
  { idx: 'II', t: 'Structure', s: 'VIBGYOR taxonomy' },
  { idx: 'III', t: 'Verify', s: 'Consensus checks' },
  { idx: 'IV', t: 'Deliver', s: 'Your feed, sourced' },
];

export function Gallery() {
  return (
    <section id="gallery" className="section h-150">
      <div className="layer-back" style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <div className="giant" data-giant style={{ fontSize: '19vw' }}>TRUTH</div>
      </div>
      <div className="layer-front copy-scrim sec-copy" style={{ position: 'absolute', top: '18vh', left: 'clamp(20px,5vw,64px)', maxWidth: '34ch' }} data-reveal>
        <span className="num-label">03 — The Standard</span>
        <h2 className="h-sec" style={{ marginBottom: 12 }}>Built for signal,<br />not <span className="italic amber">spectacle</span>.</h2>
      </div>
      <div className="layer-front" style={{ position: 'absolute', bottom: '12vh', left: 0, right: 0, padding: '0 clamp(20px,5vw,64px)' }} data-reveal>
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
