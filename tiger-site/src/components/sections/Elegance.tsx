export function Elegance() {
  return (
    <section className="section h-150">
      {/* giant word behind the tiger */}
      <div className="layer-back" style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <div className="giant" data-giant style={{ fontSize: '20vw' }}>SIGNAL</div>
      </div>
      {/* left column copy in front */}
      <div className="layer-front copy-scrim sec-copy" style={{ position: 'absolute', top: '30vh', left: 'clamp(20px,5vw,64px)', maxWidth: '40ch' }} data-reveal>
        <span className="num-label">01 — The Engine</span>
        <h2 className="h-sec" style={{ marginBottom: 14 }}>Ask in plain language.<br />Get <span className="italic amber">sourced</span> intelligence.</h2>
        <p className="col-copy">
          No noise, no AI slop — every answer is consensus-checked and every claim links straight
          back to its source.
        </p>
      </div>
    </section>
  );
}
