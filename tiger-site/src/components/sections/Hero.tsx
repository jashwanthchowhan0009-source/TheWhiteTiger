const FEED = [
  { c: '#2563eb', t: 'Semiconductor input costs ease 6% QoQ across suppliers', s: 'Market Intelligence · high confidence', v: true },
  { c: '#dc2626', t: 'Port congestion rising on a key APAC shipping lane', s: 'Risk Intelligence · 4 corroborating sources', v: true },
  { c: '#0891b2', t: 'New infrastructure tender published — ₹2,400 Cr', s: 'Public Intelligence · government portal', v: true },
  { c: '#16a34a', t: 'Central bank holds rate; guidance turns data-dependent', s: 'Financial Intelligence · 6 sources', v: true },
];

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill">SherrByte · AI data-intelligence infrastructure</span>
          <h1>Transforming the world's public data into <em>actionable intelligence</em>.</h1>
          <p className="lead">
            SherrByte builds AI-powered data infrastructure that continuously collects, processes
            and organises information from thousands of public sources — delivering real-time
            intelligence for enterprises, governments, researchers and digital platforms.
          </p>
          <div className="hero-actions">
            <a href="#platform" className="btn primary">Explore the platform</a>
            <a href="#contact" className="btn ghost">Contact sales →</a>
          </div>
          <div className="hero-proof">
            <span><b>1000s</b> of public sources</span>
            <span><b>9</b> intelligence domains</span>
            <span><b>Real-time</b> delivery</span>
          </div>
        </div>

        {/* Enterprise intelligence console — pure CSS, no images */}
        <div className="mock" aria-hidden="true">
          <div className="mock-bar">
            <i /><i /><i /><span className="mock-url">console.sherrbyte.ai</span>
          </div>
          <div className="mock-body">
            <div className="mock-search">Query any entity, sector or event…</div>
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
    </section>
  );
}
