export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-lines" aria-hidden="true" />
      <div className="wrap">
        <span className="hero-pill reveal">SherrByte Pvt. Ltd. · <b>Public data intelligence platform</b></span>
        <h1 className="reveal">Turn public data into <span className="glass-word">decisions</span></h1>
        <p className="lead reveal">
          SherrByte watches thousands of public sources, understands them with AI, and delivers the
          signals that matter — as a live dashboard and an API your team can build on.
        </p>
        <div className="hero-actions reveal">
          <a href="#pricing" className="btn primary">Start free</a>
          <a href="#contact" className="btn ghost">Book a demo</a>
        </div>
        <div className="hero-proof reveal">
          <span><b>1000s</b> of sources</span>
          <span><b>Real-time</b> signals</span>
          <span><b>API</b> + dashboard</span>
        </div>
      </div>
    </section>
  );
}
