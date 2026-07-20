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
    idx: '/ 01',
    tag: 'B2C · Consumer',
    t: 'SherrByte',
    s: 'A public-facing application that helps individuals explore news, markets, weather, sports, science and global events — one clean, AI-verified feed across nine knowledge pillars.',
  },
  {
    idx: '/ 02',
    tag: 'B2B · Enterprise',
    t: 'Enterprise',
    s: 'The enterprise intelligence platform: structured data, analytics, dashboards, reports and integrations delivered into the systems your organisation already runs on.',
  },
  {
    idx: '/ 03',
    tag: 'Services',
    t: 'SAP Consulting',
    s: 'A dedicated SAP practice: advisory, implementation, S/4HANA migration and integration — connecting SherrByte intelligence into the SAP landscape your business runs on.',
  },
  {
    idx: '/ 04',
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

      <section id="products" className="sec">
        <div className="wrap">
          <span className="label">07 / Our software &amp; services</span>
          <h2>One platform. Four ways to <em>deploy it</em>.</h2>
          <div className="software">
            {PRODUCTS.map((p) => (
              <div className="soft-row" key={p.t}>
                <div className="soft-main">
                  <span className="soft-tag">{p.tag}</span>
                  <div className="soft-name">{p.t}</div>
                  <p className="soft-desc">{p.s}</p>
                </div>
                <span className="soft-idx">{p.idx}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-label="The informed are ungovernable">
        <div className="band-media" style={{ backgroundImage: 'url(/media/engine-poster.jpg)' }} aria-hidden="true" />
        <div className="wrap">
          <span className="label">Our conviction</span>
          <h2>The informed are <em>ungovernable</em>.</h2>
          <p className="sec-lead">
            Access to sourced, verifiable truth changes who gets to decide. We build the
            infrastructure that puts it in reach — at the scale of an institution.
          </p>
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
