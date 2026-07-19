const CASES = [
  { t: 'Government', s: 'Monitor infrastructure projects, schemes, tenders, disaster alerts and regional developments.' },
  { t: 'Banks', s: 'Track economic indicators, regulations, fraud signals and financial-market events.' },
  { t: 'Manufacturers', s: 'Watch suppliers, logistics, raw-material prices, weather and geopolitical risk.' },
  { t: 'Retail', s: 'Analyse consumer trends, pricing, competitor activity and regional demand.' },
  { t: 'Logistics', s: 'Monitor ports, weather, traffic, shipping routes and transportation disruptions.' },
  { t: 'Media', s: 'Discover breaking stories, monitor trends and analyse public interest.' },
];

const PRODUCTS = [
  {
    tag: 'B2C · Consumer',
    t: 'SherrByte App',
    s: 'A public-facing application that helps individuals explore news, markets, weather, sports, science and global events — one clean, AI-verified feed across nine knowledge pillars.',
  },
  {
    tag: 'B2B · Enterprise',
    t: 'SherrByte Enterprise',
    s: 'The enterprise intelligence platform: structured data, analytics, dashboards, reports and integrations delivered into the systems your organisation already runs on.',
    lead: true,
  },
  {
    tag: 'Future vision',
    t: 'Sherr-I',
    s: 'A next-generation AI reasoning engine designed to understand, connect and explain global information with transparent, evidence-based intelligence.',
  },
];

const TECH = [
  'AI-powered processing', 'Knowledge graphs', 'Natural language processing',
  'Entity resolution', 'Trend detection', 'Event detection',
  'Semantic search', 'Data pipelines', 'Cloud infrastructure',
];

export function Company() {
  return (
    <>
      <section id="usecases" className="sec">
        <div className="wrap">
          <span className="label">06 / Example use cases</span>
          <h2>What teams do with <em>SherrByte</em>.</h2>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {CASES.map((c) => (
              <div className="card" key={c.t}>
                <span className="tag">{c.t}</span>
                <p>{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="sec tinted">
        <div className="wrap">
          <span className="label">07 / Products</span>
          <h2>One platform, three <em>products</em>.</h2>
          <p className="sec-lead">
            A data-intelligence platform — with the consumer app as one product and enterprise
            intelligence as the primary business.
          </p>
          <div className="grid-3">
            {PRODUCTS.map((p) => (
              <div className={`card${p.lead ? ' amberline' : ''}`} key={p.t}>
                <span className={`tag${p.lead ? ' amber' : ''}`}>{p.tag}</span>
                <h3>{p.t}</h3>
                <p>{p.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech" className="sec">
        <div className="wrap">
          <span className="label">08 / Technology</span>
          <h2>The engineering behind the <em>engine</em>.</h2>
          <p className="sec-lead">
            A multi-provider, cloud-native stack engineered for real-time throughput, resilient
            failover and cost-efficient processing at scale.
          </p>
          <div className="chips">
            {TECH.map((x) => <span className="chip" key={x}>{x}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
