const SOURCES = [
  'News & RSS', 'Government portals', 'Financial markets', 'Weather systems',
  'Scientific journals', 'Public datasets', 'Regulatory filings', 'Satellite feeds',
  'Company disclosures', 'Trade & logistics', 'Patents', 'APIs',
];

export function Elegance() {
  return (
    <>
      <section className="scene tight center">
        <div className="wrap">
          <h2 className="reveal" style={{ maxWidth: '18ch', margin: '0 auto' }}>
            Observe. Understand. <em>Act.</em>
          </h2>
          <p className="lead reveal" style={{ maxWidth: '54ch', margin: '20px auto 0' }}>
            Three motions of one engine — running continuously at the scale of the world's public
            information.
          </p>
        </div>
      </section>

      <section id="collect" className="scene tinted">
        <div className="wrap">
          <div className="feat">
            <div className="feat-copy reveal">
              <span className="eyebrow">01 — Observe</span>
              <h2 style={{ marginTop: 16 }}>We collect the world's <em>public signal</em>.</h2>
              <p className="sec-lead">
                Thousands of open sources, ingested in real time and normalised into one clean
                stream — no gaps, no noise, no single point of view.
              </p>
              <div className="chips">
                {SOURCES.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
            <div className="feat-visual reveal">
              <div className="frame">
                <div className="mock-card dark tilt">
                  <div className="mock-top"><i /><i /><i /><span className="u">live ingestion</span></div>
                  <div className="mock-vid">
                    <video autoPlay muted loop playsInline preload="none" poster="/media/console-poster.jpg">
                      <source src="/media/console.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
