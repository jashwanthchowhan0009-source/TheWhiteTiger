const FEATURES = [
  { c: '#2d6bff', t: 'Real-time ingestion', s: 'Thousands of public sources — news, markets, filings, science — watched continuously and merged into one clean stream.' },
  { c: '#35d6a4', t: 'AI understanding', s: 'Every item resolved into entities, relationships and a living knowledge graph you can query by meaning.' },
  { c: '#7a5cff', t: 'Signals & patterns', s: 'Emerging trends, anomalies and correlations surfaced automatically — with the evidence behind each one.' },
  { c: '#f0616d', t: 'API & dashboards', s: 'Delivered where your team decides — a live dashboard, a search box, alerts, or a clean REST API.' },
];

const STEPS = [
  { n: '01', t: 'Collect', s: 'We pull in the world’s public signal in real time and normalise it into one stream.' },
  { n: '02', t: 'Understand', s: 'AI structures it into entities, links and patterns — sourced and verifiable.' },
  { n: '03', t: 'Deliver', s: 'You get the signals that matter, in your dashboard and through the API.' },
];

export function Elegance() {
  return (
    <>
      <section id="features" className="scene tinted">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">What you get</span>
            <h2 style={{ marginTop: 16 }}>Everything you need to read the <em>public world</em>.</h2>
            <p className="sec-lead">
              One platform that collects, understands and delivers public data — so your team acts on
              signal, not noise.
            </p>
          </div>
          <div className="grid-3">
            {FEATURES.map((f) => (
              <div className="card reveal tilt" key={f.t}>
                <span className="dot" style={{ background: f.c, color: f.c }} />
                <h3>{f.t}</h3>
                <p>{f.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="scene">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">How it works</span>
            <h2 style={{ marginTop: 6 }}>From raw signal to a <em>decision</em>.</h2>
          </div>
          <div className="pipe">
            {STEPS.map((s) => (
              <div className="stage reveal" key={s.t}>
                <span className="node">{s.n}</span>
                <div><h3>{s.t}</h3><p>{s.s}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
