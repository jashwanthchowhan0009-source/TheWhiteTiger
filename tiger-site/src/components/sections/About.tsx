const STAGES = [
  { n: '01', t: 'Entity recognition', s: 'Every article resolved into people, places, organisations and instruments.' },
  { n: '02', t: 'Relationship detection', s: 'Connections inferred between entities — who, what, where, and how they relate.' },
  { n: '03', t: 'Knowledge graph', s: 'Entities and relationships fused into one continuously-updated structure.' },
  { n: '04', t: 'Trend detection', s: 'Emerging patterns and anomalies surfaced across domains as they form.' },
  { n: '05', t: 'Reasoning', s: 'RAG-consensus synthesis with hallucination control — traceable to every source.' },
  { n: '06', t: 'Prediction', s: 'Forward signals and scenarios, scored by confidence and evidence.' },
];

export function About() {
  return (
    <>
      <section id="process" className="scene">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">02 — Understand</span>
            <h2 style={{ marginTop: 6 }}>AI turns signal into <em>structure</em>.</h2>
            <p className="sec-lead">
              A six-stage intelligence pipeline runs on every item — from raw text to reasoned,
              evidence-backed prediction.
            </p>
          </div>
          <div className="pipe">
            {STAGES.map((s) => (
              <div className="stage reveal" key={s.t}>
                <span className="node">{s.n}</span>
                <div><h3>{s.t}</h3><p>{s.s}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
