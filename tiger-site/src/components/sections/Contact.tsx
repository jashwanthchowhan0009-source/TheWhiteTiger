const TEAM = [
  { n: 'P. Jashwanth Chowhan', r: 'Product, engineering architecture, AI pipeline & finance' },
  { n: 'P. Neethu Chowhan', r: 'Business development, investor relations & go-to-market' },
  { n: 'Dr. Prashant', r: 'Architectural oversight & IP guidance' },
  { n: 'Dr. Arun Chan', r: 'Mentorship & cohort support through RTIH' },
];

const WAYS = [
  'Schedule a demo', 'Talk to sales', 'Partner with us',
  'Enterprise inquiry', 'Government solutions', 'Careers',
];

const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

export function Contact() {
  return (
    <>
      <section id="contact" className="sec cta-sec">
        <div className="wrap center">
          <span className="label">Talk to us</span>
          <h2>Turn the world's public data into your <em>advantage</em>.</h2>
          <p className="sec-lead center-lead">
            SherrByte is building the infrastructure that transforms the world's publicly
            available information into intelligent, actionable insight — for businesses,
            governments and professionals. Let's find what it can do for your organisation.
          </p>
          <div className="hero-actions center-actions">
            <a href={MAIL} className="btn primary">Schedule a demo</a>
            <a href={MAIL} className="btn ghost">Talk to sales →</a>
          </div>
          <div className="ways">
            {WAYS.map((w) => <a href={MAIL} className="way" key={w}>{w}</a>)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label">The team — incubated at RTIH Anantapur</span>
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
            <a href="#top">Home</a><a href="#platform">Platform</a><a href="#solutions">Solutions</a>
            <a href="#products">Products</a><a href="#contact">Contact</a>
          </nav>
          <span>Anantapur, Andhra Pradesh · India</span>
        </div>
      </footer>
    </>
  );
}
