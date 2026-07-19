const FLOW = [
  {
    n: 'Step 01',
    t: 'Collect',
    s: 'Aggregate information from news, markets, government portals, weather, transportation, scientific publications, public datasets, financial feeds and thousands of other public sources.',
  },
  {
    n: 'Step 02',
    t: 'Process',
    s: 'Normalise, clean and enrich the data — classify it, detect entities, identify relationships, discover trends and generate structured intelligence with AI.',
  },
  {
    n: 'Step 03',
    t: 'Deliver',
    s: 'Serve business-ready intelligence through dashboards, APIs, reports, alerts, analytics and custom enterprise solutions built around your workflows.',
  },
];

export function Elegance() {
  return (
    <section id="platform" className="sec">
      <div className="wrap">
        <span className="label">01 — What we do</span>
        <h2>One engine, from raw public data to <em>decisions</em>.</h2>
        <p className="sec-lead">
          SherrByte is the infrastructure layer between the world's public information and the
          people who need to act on it — collecting at global scale, processing with AI, and
          delivering intelligence that's ready for the business.
        </p>
        <div className="flow">
          {FLOW.map((f, i) => (
            <div className="flow-step" key={f.t}>
              <div className="card flow-card">
                <span className="flow-n">{f.n}</span>
                <h3>{f.t}</h3>
                <p>{f.s}</p>
              </div>
              {i < FLOW.length - 1 && <span className="flow-arrow" aria-hidden="true">↓</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
