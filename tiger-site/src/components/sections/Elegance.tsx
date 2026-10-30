const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

const SOV = [
  { lbl: 'Your brand, with GEO', pct: 72, me: true },
  { lbl: 'Competitor A', pct: 41, me: false },
  { lbl: 'Competitor B', pct: 23, me: false },
];

export function Elegance() {
  return (
    <section className="scene tinted">
      <div className="wrap">
        <div className="s-head reveal">
          <span className="eyebrow">What we do</span>
          <h2 style={{ marginTop: 18 }}>Two ways SherrByte makes you <em>impossible to ignore</em>.</h2>
        </div>

        <div className="pillars">
          <div id="geo" className="pillar lead-pillar reveal" style={{ scrollMarginTop: 90 }}>
            <span className="p-tag">Flagship · SaaS</span>
            <div className="p-name">GEO<small>Generative Engine Optimization</small></div>
            <p>
              Search is moving from ten blue links to one AI answer. GEO gets your brand named,
              quoted and recommended inside that answer — measured, tracked and improved every week.
            </p>
            <ul className="p-feats">
              <li>See exactly how AI engines describe you today</li>
              <li>Fix the content and signals that shape those answers</li>
              <li>Track your share of voice against competitors</li>
              <li>Live dashboard + API, updated continuously</li>
            </ul>
            <a href="#how" className="p-link">How GEO works <span className="arr">→</span></a>
          </div>

          <div id="sbbs" className="pillar reveal" style={{ scrollMarginTop: 90 }}>
            <span className="p-tag">The company</span>
            <div className="p-name">SBBS<small>SherrByte Businesses</small></div>
            <p>
              The team and services arm behind the platform. SBBS partners with organisations to put
              AI-era visibility, data and intelligence to work — end to end.
            </p>
            <ul className="p-feats">
              <li>GEO strategy and managed campaigns</li>
              <li>AI & data intelligence consulting</li>
              <li>Enterprise integrations, including SAP</li>
              <li>Custom builds on the SherrByte platform</li>
            </ul>
            <a href={MAIL} className="p-link">Work with SBBS <span className="arr">→</span></a>
          </div>
        </div>

        <div className="s-head reveal" style={{ marginTop: 'clamp(70px, 9vw, 120px)' }}>
          <span className="eyebrow">Why it matters</span>
          <h2 style={{ marginTop: 18 }}>Win a bigger share of the <em>answer</em>.</h2>
          <p className="sec-lead">
            When buyers ask AI instead of Google, the brand it names wins. GEO moves you up that list —
            and we show you exactly how far.
          </p>
        </div>
        <div className="sov reveal">
          {SOV.map((r) => (
            <div className={`sov-row${r.me ? ' me' : ''}`} key={r.lbl}>
              <span className="lbl">{r.lbl}</span>
              <div className="sov-track"><div className="sov-fill" data-pct={r.pct} /></div>
              <span className="sov-pct" data-pct={r.pct}>0%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
