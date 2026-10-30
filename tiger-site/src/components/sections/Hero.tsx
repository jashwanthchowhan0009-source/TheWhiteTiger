const ENGINES = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Copilot', 'Grok', 'Meta AI'];

export function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-dots" aria-hidden="true" />
        <div className="hero-spot" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-pill reveal">SherrByte&nbsp;Pvt.&nbsp;Ltd. · <b>SBBS</b></span>
            <h1 className="reveal">Be the answer <em>AI</em> gives.</h1>
            <p className="lead reveal">
              SherrByte helps your brand show up — and win — inside ChatGPT, Claude, Gemini and
              Perplexity. Generative Engine Optimization, delivered as a SaaS platform.
            </p>
            <div className="hero-actions reveal">
              <a href="#pricing" className="btn primary">Start free <span className="arr">→</span></a>
              <a href="#contact" className="btn ghost">Book a demo</a>
            </div>
            <div className="hero-proof reveal">
              <span><b>GEO</b> AI search visibility</span>
              <span><b>SBBS</b> business solutions</span>
              <span><b>SaaS</b> dashboard + API</span>
            </div>
          </div>

          <div className="demo reveal" aria-hidden="true">
            <div className="demo-card">
              <div className="demo-top"><i /><i /><i /><span className="u">AI answer</span></div>
              <div className="demo-body">
                <span className="demo-q">Best GEO platform for brands?</span>
                <div className="demo-a" id="demo-answer"></div>
                <div className="demo-src">
                  Sources
                  <b className="me">sherrbyte.com</b><b>g2.com</b><b>techcrunch</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-in">
          {[0, 1].map((k) => ENGINES.map((e) => <span key={`${k}-${e}`}>{e}</span>))}
        </div>
      </div>
    </>
  );
}
