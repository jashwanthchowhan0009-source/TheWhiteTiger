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
          <div className="s-head reveal">
            <span className="eyebrow">01 — Observe</span>
            <h2 style={{ marginTop: 16 }}>We collect the world's <em>public signal</em>.</h2>
            <p className="sec-lead">
              Thousands of open sources, ingested in real time and normalised into one clean
              stream — no gaps, no noise, no single point of view.
            </p>
          </div>
          <div className="chips">
            {SOURCES.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
