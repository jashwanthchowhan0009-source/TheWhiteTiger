const I = {
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" strokeLinecap="round"/></svg>,
};
const BARS = [42, 58, 30, 72, 96, 48, 64, 88];

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-lines" aria-hidden="true" />
      <div className="wrap">
        <span className="hero-pill reveal">SherrByte Pvt. Ltd. · <b>AI intelligence infrastructure</b></span>
        <h1 className="reveal">The informed are <span className="glass-word">ungovernable</span></h1>
        <p className="lead reveal">
          SherrByte builds the AI infrastructure that observes the world's public data, understands
          it, and delivers it as real-time intelligence — for enterprises, governments and everyone
          who must decide.
        </p>
        <div className="hero-actions reveal">
          <a href="#platform" className="btn primary">Explore the platform</a>
          <a href="#contact" className="btn ghost">Contact sales</a>
        </div>
        <div className="hero-proof reveal">
          <span><b>1000s</b> of public sources</span>
          <span><b>9</b> intelligence domains</span>
          <span><b>Real-time</b> delivery</span>
        </div>

        {/* Dashboard mockup — Apple-style container */}
        <div className="mockup reveal">
          <div className="mock-card tilt">
            <div className="mock-top">
              <i /><i /><i /><span className="u">console.sherrbyte.ai</span>
            </div>
            <div className="mock-body">
              <div className="mock-label">Signal overview</div>
              <div className="stat-row">
                <div className="stat-tile"><span className="ic">{I.eye}</span><div><b>12,904</b><span>Sources</span></div></div>
                <div className="stat-tile"><span className="ic">{I.layers}</span><div><b>9</b><span>Domains</span></div></div>
                <div className="stat-tile"><span className="ic">{I.zap}</span><div><b>50M+</b><span>Entities</span></div></div>
                <div className="stat-tile"><span className="ic">{I.clock}</span><div><b>&lt;1ms</b><span>Query</span></div></div>
              </div>
              <div className="mock-label" style={{ marginBottom: 6 }}>Signal volume · last 8h</div>
              <div className="chart">
                {BARS.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
