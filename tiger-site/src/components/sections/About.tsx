import { NodeField } from '../NodeField';

const STAGES = [
  { n: 'S1', t: 'Entity recognition', s: 'Every article resolved into people, places, organisations and instruments.' },
  { n: 'S2', t: 'Relationship detection', s: 'Connections inferred between entities — who, what, where, and how they relate.' },
  { n: 'S3', t: 'Knowledge graph', s: 'Entities and relationships fused into one continuously-updated structure.' },
  { n: 'S4', t: 'Trend detection', s: 'Emerging patterns and anomalies surfaced across domains as they form.' },
  { n: 'S5', t: 'Reasoning', s: 'RAG-consensus synthesis with hallucination control — traceable to every source.' },
  { n: 'S6', t: 'Prediction', s: 'Forward signals and scenarios, scored by confidence and evidence.' },
];

export function About() {
  return (
    <>
      {/* Scene 4 — Process */}
      <section id="process" className="scene">
        <div className="wrap">
          <div className="s-head reveal">
            <span className="eyebrow">02 — Understand</span>
            <h2>AI turns signal into <em>structure</em>.</h2>
            <p className="sec-lead">
              A six-stage intelligence pipeline runs on every item — from raw text to reasoned,
              evidence-backed prediction.
            </p>
          </div>
          <div className="pipe">
            {STAGES.map((s) => (
              <div className="stage reveal" key={s.t}>
                <span className="node" />
                <div>
                  <span className="st-n">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scene 5 — Knowledge graph (real neural footage, recoloured) */}
      <section className="scene tight">
        <div className="wrap graph2">
          <div className="graph-copy reveal">
            <span className="eyebrow">The knowledge graph</span>
            <h2>Everything, <em>connected</em>.</h2>
            <p>Millions of entities and relationships, fused across nine intelligence domains into
              one living structure — queryable by meaning, not keywords.</p>
            <div className="metrics">
              <div><b>9</b><span>Domains</span></div>
              <div><b>50M+</b><span>Entities</span></div>
              <div><b>&lt;1ms</b><span>Graph query</span></div>
            </div>
          </div>
          <div className="graph-video glass reveal tilt" style={{ backgroundImage: 'url(/media/neural-poster.jpg)' }}>
            <video autoPlay muted loop playsInline preload="metadata" poster="/media/neural-poster.jpg">
              <source src="/media/neural.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
