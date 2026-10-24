export function About() {
  return (
    <section id="product" className="scene tinted">
      <div className="wrap">
        <div className="feat rev">
          <div className="feat-copy reveal">
            <span className="eyebrow">The knowledge graph</span>
            <h2 style={{ marginTop: 6 }}>Everything, <em>connected</em>.</h2>
            <p className="sec-lead">
              Millions of entities and relationships, fused across every domain into one living
              structure — queryable by meaning, not keywords. It’s the engine behind every signal
              SherrByte delivers.
            </p>
            <div className="hero-proof" style={{ justifyContent: 'flex-start', marginTop: 28 }}>
              <span><b>50M+</b> entities</span><span><b>&lt;1ms</b> query</span><span><b>Live</b> graph</span>
            </div>
          </div>
          <div className="feat-visual reveal">
            <div className="frame">
              <div className="mock-card dark tilt">
                <div className="mock-top"><i /><i /><i /><span className="u">graph · explore</span></div>
                <div className="mock-vid">
                  <video autoPlay muted loop playsInline preload="none" poster="/media/neural-poster.jpg">
                    <source src="/media/neural.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
