const FEED = [
  { c: '#2563eb', t: 'RBI holds repo rate; signals data-dependent path', s: 'Business & Economy · 4 sources', v: true },
  { c: '#0891b2', t: 'New MiniLM variant cuts embedding cost 40%', s: 'Science & Technology · 6 sources', v: true },
  { c: '#16a34a', t: 'Restored 1940s classic premieres at festival', s: 'Arts & Culture · 3 sources', v: true },
  { c: '#ca8a04', t: 'Monsoon onset advances over the peninsula', s: 'Natural World · 5 sources', v: true },
];

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill">SherrByte · your personal information OS</span>
          <h1>The informed are <em>ungovernable</em>.</h1>
          <p className="lead">
            One clean, AI-verified feed across nine knowledge pillars — no outrage, no bias, no
            AI slop. Just objective truth, sourced and traceable.
          </p>
          <div className="hero-actions">
            <a href="/download/" className="btn primary">Get SherrByte — free</a>
            <a href="#engine" className="btn ghost">See how it works →</a>
          </div>
          <div className="hero-proof">
            <span><b>24+</b> verified sources</span>
            <span><b>9</b> VIBGYOR pillars</span>
            <span><b>100%</b> traceable claims</span>
          </div>
        </div>

        {/* SherrByte app mockup — pure CSS, no images */}
        <div className="mock" aria-hidden="true">
          <div className="mock-bar">
            <i /><i /><i /><span className="mock-url">sherrbyte.app</span>
          </div>
          <div className="mock-body">
            <div className="mock-search">Ask in plain language…</div>
            <div className="mock-tabs">
              <span className="on">For you</span><span>VIBGYOR</span><span>Trending</span>
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
