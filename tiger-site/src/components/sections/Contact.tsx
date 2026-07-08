const TEAM = [
  { n: 'P. Jashwanth Chowhan', r: 'Product, engineering architecture, AI pipeline & finance' },
  { n: 'P. Neethu Chowhan', r: 'Business development, investor relations & go-to-market' },
  { n: 'Dr. Prashant', r: 'Architectural oversight & IP guidance' },
  { n: 'Dr. Arun Chan', r: 'Mentorship & cohort support through RTIH' },
];

export function Contact() {
  return (
    <section id="contact" className="section h-100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '10vh' }}>
      <div className="layer-front copy-scrim c" style={{ marginTop: '4vh', maxWidth: 'min(1040px, 92vw)', marginLeft: 'auto', marginRight: 'auto' }} data-reveal>
        <span className="mono-label" style={{ color: 'var(--amber)' }}>Reclaim your time · Own your truth</span>
        <h2 className="den-head" style={{ marginTop: 16 }}>The informed are<br /><span className="italic amber">ungovernable</span>.</h2>
        <p className="col-copy" style={{ margin: '20px auto 0', maxWidth: '52ch', textAlign: 'center' }}>
          SherrByte saves a professional 187.5 hours of searching for news every year — giving
          back ₹56,250 worth of their own time. Download the app, or partner with us.
        </p>
        <a href="/download/" className="den-mail">Download SherrByte →</a>
        <a href="mailto:thewhitetigerdotin@gmail.com" className="den-sub">thewhitetigerdotin@gmail.com</a>
      </div>

      <div className="layer-front team-wrap" data-reveal>
        <span className="num-label" style={{ textAlign: 'center', display: 'block' }}>The founders — incubated at RTIH Anantapur</span>
        <div className="team-row">
          {TEAM.map((m) => (
            <div className="member" key={m.n}>
              <div className="m-n serif">{m.n}</div>
              <div className="m-r">{m.r}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer layer-front" style={{ marginTop: 'auto' }}>
        <span>© 2026 TheWhiteTiger · SherrByte</span>
        <div className="fnav">
          <a href="#top">Home</a><a href="#about">VIBGYOR</a><a href="#gallery">Pipeline</a><a href="#contact">Contact</a>
        </div>
        <span>Anantapur, Andhra Pradesh · India</span>
      </footer>
    </section>
  );
}
