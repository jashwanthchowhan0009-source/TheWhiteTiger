const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

const TEAM = [
  { n: 'P. Jashwanth Chowhan', i: 'JC', r: 'Product, engineering & AI platform' },
  { n: 'P. Neethu Chowhan', i: 'NC', r: 'Business development & go-to-market' },
  { n: 'Dr. Prashant', i: 'DP', r: 'Architecture & IP guidance' },
  { n: 'Dr. Arun Chan', i: 'AC', r: 'Mentorship & cohort support' },
];

const WAYS = ['Book a demo', 'Talk to sales', 'Managed GEO', 'Partner with SBBS', 'Careers'];

export function Contact() {
  return (
    <>
      <section id="contact" className="scene tinted cta" style={{ scrollMarginTop: 80 }}>
        <div className="wrap">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Get started</span>
          <h2 className="reveal">Own the answer AI gives about <em>you</em>.</h2>
          <p className="lead reveal">
            Start a free audit in minutes, or book a demo and we’ll show you SherrByte on your own
            brand and competitors.
          </p>
          <div className="hero-actions reveal" style={{ marginTop: 36 }}>
            <a href="#pricing" className="btn primary">Start free <span className="arr">→</span></a>
            <a href={MAIL} className="btn ghost">Book a demo</a>
          </div>
          <div className="ways reveal">
            {WAYS.map((w) => <a href={MAIL} className="way" key={w}>{w}</a>)}
          </div>
        </div>
      </section>

      <section className="scene tight">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">The team</span>
            <h2 style={{ marginTop: 18 }}>Built by SBBS, incubated at <em>RTIH Anantapur</em>.</h2>
          </div>
          <div className="team">
            {TEAM.map((m) => (
              <div className="member reveal" key={m.n}>
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
              <a href="#top" className="brand">SherrByte<span className="sb">SBBS</span></a>
              <p>Generative Engine Optimization as SaaS — making brands the answer AI gives.</p>
            </div>
            <div className="foot-col">
              <h5>Platform</h5>
              <a href="#geo">GEO</a><a href="#how">How it works</a><a href="#pricing">Pricing</a>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <a href="#sbbs">SBBS</a><a href="#contact">Contact</a><a href={MAIL}>Careers</a>
            </div>
            <div className="foot-col">
              <h5>Get started</h5>
              <a href="#pricing">Start free</a><a href={MAIL}>Book a demo</a><a href={MAIL}>Managed GEO</a>
            </div>
          </div>
          <div className="foot-note">
            <span>© 2026 SherrByte Businesses (SBBS)</span>
            <span>Anantapur, Andhra Pradesh · India</span>
          </div>
        </div>
      </footer>
    </>
  );
}
