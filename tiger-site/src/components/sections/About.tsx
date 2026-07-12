const PILLARS = [
  { c: '#6d28d9', t: 'Society & Governance', s: 'Policy, civics & public life' },
  { c: '#2563eb', t: 'Business & Economy', s: 'Markets, startups & trade' },
  { c: '#0891b2', t: 'Science & Technology', s: 'Research, computing & AI' },
  { c: '#16a34a', t: 'Arts & Culture', s: 'Film, music & heritage' },
  { c: '#ca8a04', t: 'Natural World', s: 'Climate, environment & ecology' },
  { c: '#ea580c', t: 'The Self & Wellbeing', s: 'Health, mind & growth' },
  { c: '#dc2626', t: 'Philosophy & Belief', s: 'Ideas, ethics & meaning' },
  { c: '#db2777', t: 'Society & Lifestyle', s: 'Living, food & travel' },
  { c: '#7c3aed', t: 'Sports & Gaming', s: 'Play, competition & esports' },
];

export function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <span className="label">02 — VIBGYOR</span>
        <h2>The 9-pillar <em>VIBGYOR</em> taxonomy.</h2>
        <p className="sec-lead">
          Every piece of information is classified into a colour-coded knowledge pillar spanning
          50+ micro-topics — a standardised structure no other Indian platform offers.
        </p>
        <div className="pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.t}>
              <span className="dot" style={{ background: p.c }} />
              <div>
                <div className="p-t">{p.t}</div>
                <div className="p-s">{p.s}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="stats">
          <div className="stat"><b>09</b><span>Knowledge pillars</span></div>
          <div className="stat"><b>50+</b><span>Micro-topics</span></div>
          <div className="stat"><b>24+</b><span>Verified sources</span></div>
        </div>
      </div>
    </section>
  );
}
