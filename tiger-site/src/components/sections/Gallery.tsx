const MAIL = 'mailto:thewhitetigerdotin@gmail.com';

const TIERS = [
  {
    name: 'Starter', price: 'Free', note: 'For individuals exploring the signal.',
    feats: ['1 workspace', '10 tracked sources', 'Daily digest', 'Community support'],
    cta: 'Start free', featured: false,
  },
  {
    name: 'Pro', price: '$49', per: '/mo', note: 'For teams that act on real-time signal.',
    feats: ['Unlimited sources', 'Live signals & alerts', 'Dashboards + search', 'REST API access', 'Email support'],
    cta: 'Start Pro', featured: true,
  },
  {
    name: 'Enterprise', price: 'Custom', note: 'For organisations running on data.',
    feats: ['SSO & roles', 'Dedicated infrastructure', 'SAP & systems integration', 'Custom domains & SLAs', 'Priority support'],
    cta: 'Contact sales', featured: false,
  },
];

export function Gallery() {
  return (
    <section id="pricing" className="scene">
      <div className="wrap">
        <div className="s-head reveal">
          <span className="eyebrow">Pricing</span>
          <h2>Simple plans that scale with <em>you</em>.</h2>
          <p className="sec-lead">Start free. Upgrade when the signal becomes part of how you decide.</p>
        </div>
        <div className="pricing">
          {TIERS.map((t) => (
            <div className={`tier reveal tilt${t.featured ? ' featured' : ''}`} key={t.name}>
              {t.featured && <span className="tier-badge">Most popular</span>}
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
