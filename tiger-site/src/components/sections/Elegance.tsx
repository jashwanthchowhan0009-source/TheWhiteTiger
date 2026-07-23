const SOURCES = [
  'News & RSS', 'Government portals', 'Financial markets', 'Weather systems',
  'Scientific journals', 'Public datasets', 'Regulatory filings', 'Satellite feeds',
  'Company disclosures', 'Trade & logistics', 'Patents', 'APIs',
];

const FEED = [
  { t: 'Reuters · markets', c: '#2d6bff' },
  { t: 'data.gov · tenders', c: '#10b981' },
  { t: 'arXiv · research', c: '#f5a623' },
  { t: 'NOAA · weather', c: '#5b8dff' },
  { t: 'SEC · filings', c: '#8b5cf6' },
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
              <div className="mock-card tilt">
                <div className="mock-top"><i /><i /><i /><span className="u">live ingestion</span></div>
                <div className="mock-body" style={{ display: 'grid', gap: 12 }}>
                  {FEED.map((f) => (
                    <div key={f.t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: f.c, boxShadow: `0 0 0 4px ${f.c}22` }} />
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-2)' }}>{f.t}</span>
                      <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ok)' }}>● live</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
