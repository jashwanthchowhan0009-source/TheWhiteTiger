export function Elegance() {
  return (
    <section className="section h-150">
      {/* giant word behind the tiger */}
      <div className="layer-back" style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <div className="giant" data-giant style={{ fontSize: '20vw' }}>SIGNAL</div>
      </div>
      {/* left column copy in front */}
      <div className="layer-front copy-scrim sec-copy" style={{ position: 'absolute', top: '20vh', left: 'clamp(20px,5vw,64px)', maxWidth: '46ch' }} data-reveal>
        <span className="num-label">01 — The Engine</span>
        <h2 className="h-sec" style={{ marginBottom: 14 }}>One engine.<br />Two layers of <span className="italic amber">truth</span>.</h2>
        <p className="col-copy" style={{ maxWidth: '44ch' }}>
          The TheWhiteTiger Core is a high-throughput pipeline for real-time ingestion, AI
          processing, structuring and serving of the world's information at scale — exposed both
          as a consumer product and as an enterprise data service.
        </p>
        <div className="two-layer">
          <div className="lyr">
            <span className="lyr-tag">B2C · Consumer</span>
            <div className="lyr-name serif">SherrByte</div>
            <p className="lyr-copy">A single, hyper-personalised, AI-verified feed across all nine
              pillars — a Progressive Web App &amp; mobile app with a personal Knowledge Library
              auto-sorted by VIBGYOR.</p>
          </div>
          <div className="lyr">
            <span className="lyr-tag">B2B · Enterprise</span>
            <div className="lyr-name serif">Core Data Streams</div>
            <p className="lyr-copy">The same infrastructure as a clean, real-time data &amp; API
              service: classified article streams, a semantic Search API and a Trend Signal API
              across the nine pillars.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
