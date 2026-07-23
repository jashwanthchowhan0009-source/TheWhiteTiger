const STAGES = [
  { n: '01', t: 'Entity recognition', s: 'Every article resolved into people, places, organisations and instruments.' },
  { n: '02', t: 'Relationship detection', s: 'Connections inferred between entities — who, what, where, and how they relate.' },
  { n: '03', t: 'Knowledge graph', s: 'Entities and relationships fused into one continuously-updated structure.' },
  { n: '04', t: 'Trend detection', s: 'Emerging patterns and anomalies surfaced across domains as they form.' },
  { n: '05', t: 'Reasoning', s: 'RAG-consensus synthesis with hallucination control — traceable to every source.' },
  { n: '06', t: 'Prediction', s: 'Forward signals and scenarios, scored by confidence and evidence.' },
];

// static graph nodes (light, on-brand)
const NODES = [
  [130, 60], [230, 40], [300, 120], [200, 130], [90, 150], [260, 200], [150, 220], [330, 190],
];
const EDGES: [number, number][] = [[0, 1], [0, 3], [1, 2], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [5, 7], [2, 7], [1, 3], [6, 5]];

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

      <section className="scene tinted">
        <div className="wrap">
          <div className="feat rev">
            <div className="feat-copy reveal">
              <span className="eyebrow">The knowledge graph</span>
              <h2 style={{ marginTop: 6 }}>Everything, <em>connected</em>.</h2>
              <p className="sec-lead">
                Millions of entities and relationships, fused across nine intelligence domains into
                one living structure — queryable by meaning, not keywords.
              </p>
              <div className="hero-proof" style={{ justifyContent: 'flex-start', marginTop: 28 }}>
                <span><b>9</b> domains</span><span><b>50M+</b> entities</span><span><b>&lt;1ms</b> query</span>
              </div>
            </div>
            <div className="feat-visual reveal">
              <div className="mock-card tilt">
                <div className="mock-top"><i /><i /><i /><span className="u">graph · explore</span></div>
                <div className="mock-body">
                  <svg viewBox="0 0 400 260" width="100%" style={{ display: 'block' }} aria-hidden="true">
                    {EDGES.map(([a, b], i) => (
                      <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]}
                        stroke="#2d6bff" strokeOpacity="0.28" strokeWidth="1.4" />
                    ))}
                    {NODES.map(([x, y], i) => (
                      <g key={i}>
                        <circle cx={x} cy={y} r={i % 3 === 0 ? 11 : 7} fill="#2d6bff" fillOpacity={i % 3 === 0 ? 0.16 : 0.1} />
                        <circle cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5} fill="#2d6bff" />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
