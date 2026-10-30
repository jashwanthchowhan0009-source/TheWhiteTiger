const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

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
      </div>
    </section>
  );
}
