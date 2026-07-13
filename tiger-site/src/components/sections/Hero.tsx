export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="label">SherrByte · your personal information OS</span>
          <h1>The informed are <em>ungovernable</em>.</h1>
          <p className="lead">
            An information engine — clean, verified, objective truth, carved from the world's noise.
          </p>
          <div className="hero-actions">
            <a href="/download/" className="btn primary">Get SherrByte</a>
            <a href="#engine" className="btn ghost">See how it works</a>
          </div>
        </div>
        <div className="hero-art">
          <span className="aura" aria-hidden="true" />
          <img src="/tiger.png" alt="TheWhiteTiger" width="520" height="520" loading="eager" />
        </div>
      </div>
    </section>
  );
}
