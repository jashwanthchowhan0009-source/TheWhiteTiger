const INDUSTRIES = [
  'Government & Smart Cities', 'Banking & Financial Services', 'Insurance', 'Media & Broadcasting',
  'Logistics & Supply Chain', 'Retail & E-commerce', 'Manufacturing', 'Healthcare', 'Automotive',
  'Energy & Utilities', 'Cybersecurity', 'Education', 'Research', 'Investment & VC', 'Consulting', 'NGOs',
];

const SOLUTIONS = [
  { c: '#5b9dff', t: 'Market Intelligence', s: 'Industries, competitors, regulations and emerging trends as they move.' },
  { c: '#f0616d', t: 'Risk Intelligence', s: 'Geopolitics, disasters, cyber threats, policy shifts and supply-chain shocks.' },
  { c: '#37e0ff', t: 'Public Intelligence', s: 'Government announcements, tenders, schemes and public-sector updates.' },
  { c: '#35d6a4', t: 'Financial Intelligence', s: 'Equities, commodities, forex, crypto and macro indicators.' },
  { c: '#7a5cff', t: 'Media Intelligence', s: 'Brand mentions, sentiment and narrative movement at scale.' },
  { c: '#8fa2ff', t: 'Research Intelligence', s: 'Patents, journals and innovation trends across the sciences.' },
];

const PRODUCTS = [
  { idx: '/ 01', tag: 'B2C · Consumer', name: 'SherrByte', s: 'One clean, AI-verified feed across nine knowledge domains — news, markets, science and more, for every individual.' },
  { idx: '/ 02', tag: 'B2B · Enterprise', name: 'Enterprise', s: 'Structured data, analytics, dashboards, reports and APIs delivered into the systems your organisation already runs on.' },
  { idx: '/ 03', tag: 'Services', name: <>SAP <em>Consulting</em></>, s: 'A dedicated SAP practice — advisory, implementation, S/4HANA migration and integration, wiring SherrByte intelligence into your SAP landscape.' },
  { idx: '/ 04', tag: 'Future', name: 'Sherr-I', s: 'A next-generation AI reasoning engine that understands, connects and explains global information with transparent, evidence-based intelligence.' },
];

const TECH = [
  'Knowledge graphs', 'NLP', 'Entity resolution', 'Trend detection', 'Event detection',
  'Semantic search', 'RAG-consensus', 'Vector search', 'Streaming pipelines', 'Cloud-native',
];

const WHY = [
  'Real-time aggregation', 'AI-powered enrichment', 'Structured knowledge graphs', 'Multi-source verification',
  'Cross-domain reasoning', 'Custom enterprise delivery', 'Scalable cloud architecture', 'Flexible integrations',
];

export function Company() {
  return (
    <>
      <section id="industries" className="scene">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">Who we serve</span>
            <h2>Built for organisations that run on <em>information</em>.</h2>
          </div>
          <div className="chips">
            {INDUSTRIES.map((x) => <span className="chip reveal" key={x}>{x}</span>)}
          </div>
        </div>
      </section>

      <section id="solutions" className="scene tinted">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">Enterprise solutions</span>
            <h2>Intelligence, not raw <em>data feeds</em>.</h2>
          </div>
          <div className="grid-3">
            {SOLUTIONS.map((s) => (
              <div className="card reveal tilt" key={s.t}>
                <span className="dot" style={{ background: s.c, color: s.c }} />
                <h3>{s.t}</h3>
                <p>{s.s}</p>
              </div>
            ))}
          </div>
          <div className="why">
            {WHY.map((w) => <div className="cmp reveal" key={w}><span>+</span>{w}</div>)}
          </div>
        </div>
      </section>

      <section id="products" className="scene">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">Our software & services</span>
            <h2>One platform. Four ways to <em>deploy it</em>.</h2>
          </div>
          <div className="software">
            {PRODUCTS.map((p, i) => (
              <div className="soft-row reveal" key={i}>
                <div>
                  <span className="soft-tag">{p.tag}</span>
                  <div className="soft-name">{p.name}</div>
                  <p className="soft-desc">{p.s}</p>
                </div>
                <span className="soft-idx">{p.idx}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech" className="scene tight tinted">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">Technology</span>
            <h2>The engineering behind the <em>engine</em>.</h2>
          </div>
          <div className="chips">
            {TECH.map((x) => <span className="chip reveal" key={x}>{x}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
