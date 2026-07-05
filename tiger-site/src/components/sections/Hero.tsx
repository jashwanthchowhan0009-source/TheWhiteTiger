export function Hero() {
  return (
    <section id="top" className="section h-hero">
      {/* text sits in the negative space to the LEFT of the sculpture */}
      <div className="hero-copy layer-front" data-reveal>
        <span className="mono-label" style={{ color: 'var(--amber)', letterSpacing: '0.22em' }}>
          SherrByte · your personal information OS
        </span>
        <h1 className="hero-head" style={{ marginTop: 22 }}>
          The informed<br />are <span className="italic amber">ungovernable</span>.
        </h1>
        <p className="hero-sub" style={{ marginLeft: 0, textAlign: 'left' }}>
          An information engine — clean, verified, objective truth, carved from the world's noise.
        </p>
        <a href="/download/" className="cta">Get SherrByte</a>
      </div>
      <div className="scroll-hint layer-front"><span>SCROLL</span><div className="line" /></div>
    </section>
  );
}
