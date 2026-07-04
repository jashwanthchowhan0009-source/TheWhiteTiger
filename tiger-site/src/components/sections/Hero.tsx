export function Hero() {
  return (
    <section id="top" className="section h-hero">
      <div className="hero-wrap">
        {/* headline sits BEHIND the tiger (layer-back) so the sculpture overlaps it */}
        <div className="layer-back" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-head">
            Timeless Power<br /><span className="italic">and</span> Grace
          </h1>
        </div>
        {/* sub-line + CTA sit IN FRONT of the tiger */}
        <div className="layer-front" style={{ position: 'absolute', left: 0, right: 0, bottom: '18vh', textAlign: 'center' }}>
          <p className="hero-sub">A study in stone — the apex form, carved in silence.</p>
          <a href="#about" className="cta">Discover More</a>
        </div>
      </div>
      <div className="scroll-hint layer-front"><span>SCROLL</span><div className="line" /></div>
    </section>
  );
}
