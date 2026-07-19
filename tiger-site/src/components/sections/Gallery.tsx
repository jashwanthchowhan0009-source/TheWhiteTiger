const PIPE = [
  { t: 'Public data sources', s: 'News, markets, government, weather, science, transport & more' },
  { t: 'Global data collection', s: 'Continuous, real-time ingestion at scale' },
  { t: 'AI processing engine', s: 'Clean · enrich · classify · detect entities & events' },
  { t: 'Knowledge graph', s: 'Entities and relationships, connected across domains' },
  { t: 'Enterprise intelligence', s: 'Structured, verified, business-ready signals' },
  { t: 'Dashboards · reports · alerts · integrations', s: 'Delivered into your existing workflows' },
];

const WHY = [
  'Real-time information aggregation',
  'AI-powered data enrichment',
  'Structured knowledge graphs',
  'Multi-source verification',
  'Cross-domain intelligence',
  'Custom enterprise dashboards',
  'Scalable cloud architecture',
  'Flexible integrations',
];

export function Gallery() {
  return (
    <>
      <section id="how" className="sec">
        <div className="wrap">
          <span className="label">04 — How it works</span>
          <h2>From public noise to verified <em>signal</em>.</h2>
          <p className="sec-lead">
            A single pipeline turns the open, chaotic web of public information into structured
            intelligence — every stage verifiable, every claim traceable to its source.
          </p>
          <div className="pipe">
            {PIPE.map((p, i) => (
              <div className="pipe-row" key={p.t}>
                <div className="pipe-node">
                  <span className="pipe-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="pipe-t">{p.t}</div>
                    <div className="pipe-s">{p.s}</div>
                  </div>
                </div>
                {i < PIPE.length - 1 && <span className="pipe-arrow" aria-hidden="true">↓</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label">05 — Why SherrByte</span>
          <h2>Infrastructure built for <em>scale and trust</em>.</h2>
          <div className="comply why">
            {WHY.map((c) => <div className="cmp" key={c}><span>✓</span>{c}</div>)}
          </div>
        </div>
      </section>
    </>
  );
}
