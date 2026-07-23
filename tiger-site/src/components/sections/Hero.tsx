export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-lines" aria-hidden="true" />
      <div className="wrap">
        <span className="hero-pill reveal">SherrByte Pvt. Ltd. · <b>AI intelligence infrastructure</b></span>
        <h1 className="reveal">The informed are <span className="glass-word">ungovernable</span></h1>
        <p className="lead reveal">
          SherrByte builds the AI infrastructure that observes the world's public data, understands
          it, and delivers it as real-time intelligence — for enterprises, governments and everyone
          who must decide.
        </p>
        <div className="hero-actions reveal">
          <a href="#platform" className="btn primary">Explore the platform</a>
          <a href="#contact" className="btn ghost">Contact sales</a>
        </div>
        <div className="hero-proof reveal">
          <span><b>1000s</b> of public sources</span>
          <span><b>9</b> intelligence domains</span>
          <span><b>Real-time</b> delivery</span>
        </div>

        {/* Product visual — framed city video */}
        <div className="mockup reveal">
          <div className="mock-card tilt">
            <div className="mock-top">
              <i /><i /><i /><span className="u">console.sherrbyte.ai</span>
            </div>
            <div className="mock-vid">
              <video autoPlay muted loop playsInline preload="auto" poster="/media/city-poster.jpg">
                <source src="/media/city.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
