import { NodeField } from '../NodeField';

const SOURCES = [
  'News & RSS', 'Government portals', 'Financial markets', 'Weather systems',
  'Scientific journals', 'Public datasets', 'Regulatory filings', 'Satellite feeds',
  'Company disclosures', 'Trade & logistics', 'Patents', 'APIs',
];

export function Elegance() {
  return (
    <>
      {/* Scene 2 — Manifesto */}
      <section className="scene manifesto">
        <div className="wrap">
          <div className="words">
            <b className="reveal">Observe.</b>
            <b className="reveal">Understand.</b>
            <b className="reveal">Act.</b>
          </div>
          <p className="reveal" style={{ marginTop: 40 }}>
            Three motions of a single engine — running continuously, at the scale of the world's
            public information.
          </p>
        </div>
      </section>

      {/* Scene 3 — Collect */}
      <section id="collect" className="scene">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">01 — Observe</span>
            <h2>We collect the world's <em>public signal</em>.</h2>
            <p className="sec-lead">
              Thousands of open sources, ingested in real time and normalised into one clean stream —
              no gaps, no noise, no single point of view.
            </p>
          </div>
          <div className="collect-grid">
            <div className="sources reveal">
              {SOURCES.map((s) => <span className="source" key={s}><i />{s}</span>)}
            </div>
            <div className="core-viz reveal"><NodeField mode="core" density={1.1} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
