const CARDS = [
  { idx: 'I', t: 'The Descent', s: 'Study I' },
  { idx: 'II', t: 'Musculature', s: 'Study II' },
  { idx: 'III', t: 'The Gaze', s: 'Study III' },
  { idx: 'IV', t: 'Claw & Stone', s: 'Study IV' },
];

export function Gallery() {
  return (
    <section id="gallery" className="section h-150">
      <div className="layer-back" style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <div className="giant" data-giant style={{ fontSize: '19vw' }}>GALLERY</div>
      </div>
      <div className="layer-front copy-scrim sec-copy" style={{ position: 'absolute', top: '18vh', left: 'clamp(20px,5vw,64px)', maxWidth: '32ch' }} data-reveal>
        <span className="num-label">03 — The Edge</span>
        <h2 className="h-sec" style={{ marginBottom: 12 }}>Claw &amp;<br /><span className="italic amber">stone.</span></h2>
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
