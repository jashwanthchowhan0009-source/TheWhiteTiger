const TEAM = [
  { n: 'P. Jashwanth Chowhan', i: 'JC', r: 'Product, engineering architecture, AI pipeline & finance' },
  { n: 'P. Neethu Chowhan', i: 'NC', r: 'Business development, investor relations & go-to-market' },
  { n: 'Dr. Prashant', i: 'DP', r: 'Architectural oversight & IP guidance' },
  { n: 'Dr. Arun Chan', i: 'AC', r: 'Mentorship & cohort support through RTIH' },
];

const WAYS = ['Book a demo', 'Talk to sales', 'Enterprise inquiry', 'Partner with us', 'Careers'];
const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

export function Contact() {
  return (
    <>
      <section id="contact" className="scene cta">
        <div className="wrap">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Talk to us</span>
          <h2 className="reveal" style={{ marginTop: 18, maxWidth: '20ch', marginInline: 'auto' }}>
            Start turning data into <em>decisions</em>.
          </h2>
          <p className="lead reveal" style={{ margin: '20px auto 0', maxWidth: '54ch' }}>
            Spin up a free workspace in minutes, or book a demo and we’ll show you SherrByte on your
            own use case.
          </p>
          <div className="hero-actions reveal" style={{ marginTop: 34 }}>
            <a href="#pricing" className="btn primary">Start free</a>
            <a href={MAIL} className="btn ghost">Book a demo</a>
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
              <h5>Product</h5>
              <a href="#features">Features</a><a href="#how">How it works</a>
              <a href="#product">Platform</a><a href="#pricing">Pricing</a>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <a href="#contact">Contact</a><a href={MAIL}>Careers</a>
              <a href={MAIL}>Partners</a><a href={MAIL}>Enterprise</a>
            </div>
            <div className="foot-col">
              <h5>Get started</h5>
              <a href="#pricing">Start free</a><a href={MAIL}>Book a demo</a>
              <a href={MAIL}>Talk to sales</a>
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
