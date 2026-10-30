const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

const TIERS = [
  {
    name: 'Starter', price: 'Free', note: 'Check your AI visibility, free.',
    feats: ['1 brand', '3 AI engines', 'Weekly audit', 'Core dashboard'],
    cta: 'Start free', featured: false, badge: '',
  },
  {
    name: 'Growth', price: '₹9,999', per: '/mo', note: 'For teams actively winning the answer.',
    feats: ['5 brands & competitors', 'All AI engines', 'Daily tracking + alerts', 'Optimization playbooks', 'API access'],
    cta: 'Start Growth', featured: true, badge: 'Most popular',
  },
  {
    name: 'Business', price: '₹18,999', per: '/mo', note: 'Founding price for our first businesses.',
    feats: ['Everything in Growth', 'Managed GEO campaigns', 'SAP & systems integration', 'SSO & roles', 'Dedicated strategist'],
    cta: 'Become a founding customer', featured: false, badge: 'Founding offer',
  },
];

export function Gallery() {
  return (
    <section id="pricing" className="scene" style={{ scrollMarginTop: 80 }}>
      <div className="wrap">
        <div className="s-head reveal">
          <span className="eyebrow">Pricing</span>
          <h2 style={{ marginTop: 18 }}>Start free. Scale when it <em>moves the needle</em>.</h2>
          <p className="sec-lead">Self-serve the platform, or let SBBS run GEO for you end to end. Founding pricing for early businesses.</p>
        </div>
        <div className="pricing">
          {TIERS.map((t) => (
            <div className={`tier reveal${t.featured ? ' featured' : ''}`} key={t.name}>
              {t.badge && <span className="tier-badge">{t.badge}</span>}
              <h3>{t.name}</h3>
              <div className="tier-price"><b>{t.price}</b>{t.per && <span>{t.per}</span>}</div>
              <p className="tier-note">{t.note}</p>
              <ul className="tier-feats">
                {t.feats.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href={MAIL} className={`btn ${t.featured ? 'primary' : 'ghost'} tier-cta`}>{t.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
