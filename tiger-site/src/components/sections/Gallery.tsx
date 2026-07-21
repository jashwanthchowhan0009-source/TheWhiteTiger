type Out = { t: string; s: string; icon: JSX.Element };

const I = {
  api: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3m0-8V5a2 2 0 0 0-2-2h-3M9 9l6 6m0-6l-6 6" strokeLinecap="round"/></svg>,
  dash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="3" y="16" width="8" height="5" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" strokeLinecap="round"/></svg>,
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" strokeLinecap="round"/></svg>,
  report: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" strokeLinejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h6" strokeLinecap="round"/></svg>,
  ent: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M6 21V8l6-4 6 4v13M10 12h4M10 16h4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const OUTS: Out[] = [
  { t: 'Intelligence API', s: 'Structured, classified, real-time streams your systems can build on.', icon: I.api },
  { t: 'Dashboards', s: 'Live command views across markets, risk, public and financial intelligence.', icon: I.dash },
  { t: 'Semantic search', s: 'Query by meaning across the entire graph — sub-millisecond, sourced.', icon: I.search },
  { t: 'Alerts', s: 'The moment something changes in your world, you know — with evidence.', icon: I.alert },
  { t: 'Reports', s: 'Auto-synthesised briefings, watermarked and traceable to every source.', icon: I.report },
  { t: 'Enterprise systems', s: 'Delivered into the SAP, data and workflow stack you already run.', icon: I.ent },
];

export function Gallery() {
  return (
    <section id="deliver" className="scene">
      <img className="scene-watermark" src="/tiger.png" alt="" aria-hidden="true" style={{ left: '-3vw', top: '10%' }} />
      <div className="wrap">
        <div className="s-head reveal">
          <span className="eyebrow">03 — Act</span>
          <h2>Intelligence, delivered where you <em>decide</em>.</h2>
          <p className="sec-lead">
            One engine, many surfaces. The same structured intelligence reaches your teams as an API,
            a dashboard, a search box, an alert, a report — or straight into your enterprise stack.
          </p>
        </div>
        <div className="deliver">
          {OUTS.map((o) => (
            <div className="out reveal" key={o.t}>
              <span className="ic">{o.icon}</span>
              <h3>{o.t}</h3>
              <p>{o.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
