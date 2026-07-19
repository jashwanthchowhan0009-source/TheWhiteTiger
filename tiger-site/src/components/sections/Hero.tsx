export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-media" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <span className="pill">SherrByte // AI data-intelligence infrastructure</span>
          <h1>Transforming the world's public data into <em>actionable intelligence</em>.</h1>
          <p className="lead">
            SherrByte builds AI-powered data infrastructure that continuously collects, processes
            and organises information from thousands of public sources — delivering real-time
            intelligence for enterprises, governments, researchers and digital platforms.
          </p>
          <div className="hero-actions">
            <a href="#platform" className="btn primary">Explore the platform</a>
            <a href="#contact" className="btn ghost">Contact sales</a>
          </div>
          <div className="hero-proof">
            <span><b>1000s</b> Public sources</span>
            <span><b>9</b> Intelligence domains</span>
            <span><b>Real-time</b> Delivery</span>
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">Scroll</div>
    </section>
  );
}
