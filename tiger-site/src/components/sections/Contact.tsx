const TEAM = [
  { n: 'P. Jashwanth Chowhan', i: 'JC', r: 'Product, engineering architecture, AI pipeline & finance' },
  { n: 'P. Neethu Chowhan', i: 'NC', r: 'Business development, investor relations & go-to-market' },
  { n: 'Dr. Prashant', i: 'DP', r: 'Architectural oversight & IP guidance' },
  { n: 'Dr. Arun Chan', i: 'AC', r: 'Mentorship & cohort support through RTIH' },
];

const WAYS = ['Schedule a demo', 'Talk to sales', 'Partner with us', 'Enterprise inquiry', 'Government solutions', 'Careers'];
const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

export function Contact() {
  return (
    <>
      <section className="scene center">
        <div className="wrap">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>The SherrByte ethos</span>
          <h2 className="reveal" style={{ marginTop: 8, maxWidth: '16ch', marginInline: 'auto' }}>
            Clarity is a form of <em>power</em>.
          </h2>
          <div className="reveal" style={{ maxWidth: 780, margin: '48px auto 0' }}>
            <div className="frame">
              <div className="mock-card dark tilt">
                <div className="mock-top"><i /><i /><i /><span className="u">the-white-tiger</span></div>
                <div className="mock-vid">
                  <video autoPlay muted loop playsInline preload="none" poster="/media/tiger-poster.jpg">
                    <source src="/media/tiger.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scene cta">
        <div className="wrap">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Talk to us</span>
          <h2 className="reveal" style={{ marginTop: 18, maxWidth: '20ch', marginInline: 'auto' }}>
            Turn public data into <em>decisive advantage</em>.
          </h2>
          <p className="lead reveal" style={{ margin: '20px auto 0', maxWidth: '58ch' }}>
            SherrByte Pvt. Ltd. is building the infrastructure that turns the world's public
            information into decisive advantage. Let's find what it can do for your organisation.
          </p>
          <div className="hero-actions reveal" style={{ marginTop: 34 }}>
            <a href={MAIL} className="btn primary">Schedule a demo</a>
            <a href={MAIL} className="btn ghost">Talk to sales</a>
          </div>
          <div className="ways reveal">
            {WAYS.map((w) => <a href={MAIL} className="way" key={w}>{w}</a>)}
          </div>
        </div>
      </section>

      <section className="scene tinted">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">The team</span>
            <h2 style={{ marginTop: 6 }}>Incubated at <em>RTIH Anantapur</em>.</h2>
          </div>
          <div className="team">
            {TEAM.map((m) => (
              <div className="glass reveal tilt" key={m.n}>
                <div className="av">{m.i}</div>
                <div className="m-n">{m.n}</div>
                <div className="m-r">{m.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="#top" className="brand">
                <span className="brand-name"><b>SHERRBYTE</b><span>PVT · LTD</span></span>
              </a>
              <p>AI infrastructure that turns the world's public data into real-time, decision-ready intelligence.</p>
            </div>
            <div className="foot-col">
              <h5>Platform</h5>
              <a href="#collect">Collect</a><a href="#process">Process</a>
              <a href="#deliver">Deliver</a><a href="#products">Products</a>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <a href="#industries">Industries</a><a href="#solutions">Solutions</a>
              <a href="#tech">Technology</a><a href="#contact">Contact</a>
            </div>
            <div className="foot-col">
              <h5>Get in touch</h5>
              <a href={MAIL}>Schedule a demo</a><a href={MAIL}>Talk to sales</a>
              <a href={MAIL}>Enterprise inquiry</a><a href={MAIL}>Careers</a>
            </div>
          </div>
          <div className="foot-note">
            <span>© 2026 SherrByte Pvt. Ltd. · All rights reserved.</span>
            <span>Anantapur, Andhra Pradesh · India</span>
          </div>
          <div className="foot-word" aria-hidden="true">SHERRBYTE</div>
        </div>
      </footer>
    </>
  );
}
