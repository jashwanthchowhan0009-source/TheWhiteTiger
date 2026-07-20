const FLOW = [
  {
    n: 'Step 01 / Collect',
    t: 'Collect',
    s: 'Aggregate information from news, markets, government portals, weather, transportation, scientific publications, public datasets, financial feeds and thousands of other public sources.',
  },
  {
    n: 'Step 02 / Process',
    t: 'Process',
    s: 'Normalise, clean and enrich the data — classify it, detect entities, identify relationships, discover trends and generate structured intelligence with AI.',
  },
  {
    n: 'Step 03 / Deliver',
    t: 'Deliver',
    s: 'Serve business-ready intelligence through dashboards, APIs, reports, alerts, analytics and custom enterprise solutions built around your workflows.',
  },
];

const FEED = [
  { c: '#5b9dff', t: 'Semiconductor input costs ease 6% QoQ across suppliers', s: 'Market Intelligence · high confidence', v: true },
  { c: '#f0616d', t: 'Port congestion rising on a key APAC shipping lane', s: 'Risk Intelligence · 4 corroborating sources', v: true },
  { c: '#4cc2e0', t: 'New infrastructure tender published — ₹2,400 Cr', s: 'Public Intelligence · government portal', v: true },
  { c: '#3fb950', t: 'Central bank holds rate; guidance turns data-dependent', s: 'Financial Intelligence · 6 sources', v: true },
];

export function Elegance() {
  return (
    <>
      <section className="statement">
        <div className="wrap">
          <p>
            We turn the world's public data into <em>real-time, verifiable intelligence</em>
            {' '}— <span className="dim">for enterprises, governments, and everyone who must decide.</span>
          </p>
        </div>
      </section>

    <section id="platform" className="sec">
      <div className="wrap">
        <span className="label">01 / What we do</span>
        <h2>One engine, from raw public data to <em>decisions</em>.</h2>
        <p className="sec-lead">
          SherrByte is the infrastructure layer between the world's public information and the
          people who need to act on it — collecting at global scale, processing with AI, and
          delivering intelligence that's ready for the business.
        </p>

        <div className="flow">
          {FLOW.map((f) => (
            <div className="flow-step" key={f.t}>
              <div className="flow-card">
                <span className="flow-n">{f.n}</span>
                <h3>{f.t}</h3>
                <p>{f.s}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise console — pure CSS, no images */}
        <div className="console-frame" aria-hidden="true">
          <div className="mock">
            <div className="mock-bar">
              <i /><i /><i /><span className="mock-url">console.sherrbyte.ai</span>
            </div>
            <div className="mock-body">
              <div className="mock-search">query any entity, sector or event…</div>
              <div className="mock-tabs">
                <span className="on">Signals</span><span>Markets</span><span>Risk</span>
              </div>
              {FEED.map((f) => (
                <div className="feed" key={f.t}>
                  <span className="feed-dot" style={{ background: f.c }} />
                  <div className="feed-main">
                    <div className="feed-t">{f.t}</div>
                    <div className="feed-s">{f.s}{f.v && <span className="verified">✓ verified</span>}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
