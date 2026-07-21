const TEAM = [
  { n: 'P. Jashwanth Chowhan', r: 'Product, engineering architecture, AI pipeline & finance' },
  { n: 'P. Neethu Chowhan', r: 'Business development, investor relations & go-to-market' },
  { n: 'Dr. Prashant', r: 'Architectural oversight & IP guidance' },
  { n: 'Dr. Arun Chan', r: 'Mentorship & cohort support through RTIH' },
];

const WAYS = ['Schedule a demo', 'Talk to sales', 'Partner with us', 'Enterprise inquiry', 'Government solutions', 'Careers'];
const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

export function Contact() {
  return (
    <>
      <section id="contact" className="scene cta">
        <div className="cta-media" aria-hidden="true" style={{ backgroundImage: 'url(/media/tiger-poster.jpg)' }}>
          <video autoPlay muted loop playsInline preload="none" poster="/media/tiger-poster.jpg">
            <source src="/media/tiger.mp4" type="video/mp4" />
          </video>
        </div>
        <span className="glow" aria-hidden="true" />
        <div className="wrap" style={{ textAlign: 'center' }}>
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Talk to us</span>
          <h2 className="reveal" style={{ marginTop: 18 }}>The informed are <em>ungovernable</em>.</h2>
          <p className="sec-lead reveal" style={{ margin: '18px auto 0' }}>
            SherrByte Pvt. Ltd. is building the infrastructure that turns the world's public
            information into decisive advantage. Let's find what it can do for your organisation.
          </p>
          <div className="hero-actions reveal" style={{ justifyContent: 'center', marginTop: 34 }}>
            <a href={MAIL} className="btn primary">Schedule a demo</a>
            <a href={MAIL} className="btn ghost">Talk to sales</a>
          </div>
          <div className="ways reveal">
            {WAYS.map((w) => <a href={MAIL} className="way" key={w}>{w}</a>)}
          </div>
        </div>
      </section>

      <section className="scene tight">
        <div className="wrap">
          <span className="eyebrow reveal">The team — incubated at RTIH Anantapur</span>
          <div className="team">
            {TEAM.map((m) => (
              <div className="glass reveal" key={m.n}>
                <div className="m-n">{m.n}</div>
                <div className="m-r">{m.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap foot-in">
          <a href="#top" className="brand" aria-label="SherrByte Pvt. Ltd.">
            <img className="brand-mark" src="/tiger.png" alt="" width={22} height={22} />
            <span className="brand-name"><b>SHERRBYTE</b><span>PVT · LTD</span></span>
          </a>
          <nav className="fnav">
            <a href="#top">Home</a><a href="#collect">Collect</a><a href="#process">Process</a>
            <a href="#deliver">Deliver</a><a href="#contact">Contact</a>
          </nav>
          <span>© 2026 SherrByte Pvt. Ltd. · Anantapur, India</span>
        </div>
      </footer>
    </>
  );
}
