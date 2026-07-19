const INDUSTRIES = [
  'Government & Smart Cities', 'Banking & Financial Services', 'Insurance',
  'Media & Broadcasting', 'Logistics & Supply Chain', 'Retail & E-commerce',
  'Manufacturing', 'Healthcare', 'Automotive', 'Energy & Utilities',
  'Cybersecurity', 'Education', 'Research Organizations', 'Consulting Firms',
  'Investment & Venture Capital', 'NGOs',
];

const SOLUTIONS = [
  { c: '#2563eb', t: 'Market Intelligence', s: 'Monitor industries, competitors, regulations and emerging trends as they move.' },
  { c: '#dc2626', t: 'Risk Intelligence', s: 'Track geopolitical events, disasters, cyber threats, policy changes and supply-chain disruptions.' },
  { c: '#0891b2', t: 'Public Intelligence', s: 'Follow government announcements, tenders, schemes, regulations and public-sector updates.' },
  { c: '#16a34a', t: 'Financial Intelligence', s: 'Stocks, commodities, forex, crypto, economic indicators, company news and market movements.' },
  { c: '#db2777', t: 'Media Intelligence', s: 'Track brand mentions, sentiment, news coverage and industry discussion at scale.' },
  { c: '#7c3aed', t: 'Research Intelligence', s: 'Aggregate patents, journals, scientific publications, university research and innovation trends.' },
  { c: '#ea580c', t: 'Custom Intelligence', s: 'Organisation-specific dashboards, alerts, reports and workflows tailored to your business.' },
];

export function About() {
  return (
    <>
      <section id="industries" className="sec">
        <div className="wrap">
          <span className="label">02 — Industries we serve</span>
          <h2>Built for organisations that run on <em>information</em>.</h2>
          <p className="sec-lead">
            Any team whose decisions depend on what's happening in the world — across the public,
            private and research sectors — can build on SherrByte intelligence.
          </p>
          <div className="chips">
            {INDUSTRIES.map((x) => <span className="chip" key={x}>{x}</span>)}
          </div>
        </div>
      </section>

      <section id="solutions" className="sec">
        <div className="wrap">
          <span className="label">03 — Enterprise solutions</span>
          <h2>Intelligence, not just <em>data feeds</em>.</h2>
          <p className="sec-lead">
            We deliver outcomes, not raw APIs — packaged intelligence products your teams can act
            on from day one, or a custom build shaped around your domain.
          </p>
          <div className="grid-3">
            {SOLUTIONS.map((s) => (
              <div className="card" key={s.t}>
                <span className="dot" style={{ background: s.c }} />
                <h3>{s.t}</h3>
                <p>{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
