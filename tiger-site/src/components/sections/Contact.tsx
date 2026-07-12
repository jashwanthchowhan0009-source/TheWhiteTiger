const TEAM = [
  { n: 'P. Jashwanth Chowhan', r: 'Product, engineering architecture, AI pipeline & finance' },
  { n: 'P. Neethu Chowhan', r: 'Business development, investor relations & go-to-market' },
  { n: 'Dr. Prashant', r: 'Architectural oversight & IP guidance' },
  { n: 'Dr. Arun Chan', r: 'Mentorship & cohort support through RTIH' },
];

export function Contact() {
  return (
    <>
      <section id="contact" className="sec cta-sec">
        <div className="wrap center">
          <span className="label">Reclaim your time · Own your truth</span>
          <h2>The informed are <em>ungovernable</em>.</h2>
          <p className="sec-lead center-lead">
            SherrByte saves a professional 187.5 hours of searching for news every year — giving
            back ₹56,250 worth of their own time. Download the app, or partner with us.
          </p>
          <div className="hero-actions center-actions">
            <a href="/download/" className="btn primary">Download SherrByte</a>
            <a href="mailto:thewhitetigerdotin@gmail.com" className="btn ghost">thewhitetigerdotin@gmail.com</a>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label">The founders — incubated at RTIH Anantapur</span>
          <div className="grid-4 team">
            {TEAM.map((m) => (
              <div key={m.n}><h3 className="m-n">{m.n}</h3><p className="m-r">{m.r}</p></div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap foot-in">
          <span>© 2026 TheWhiteTiger · SherrByte</span>
          <nav className="fnav">
            <a href="#top">Home</a><a href="#about">VIBGYOR</a><a href="#pipeline">Pipeline</a><a href="#contact">Contact</a>
          </nav>
          <span>Anantapur, Andhra Pradesh · India</span>
        </div>
      </footer>
    </>
  );
}
