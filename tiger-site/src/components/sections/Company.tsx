const OLD = [
  'Algorithms reward outrage, clickbait & sensationalism',
  'No systematic bias control — bias is embedded by design',
  'AI summaries hallucinate, unchecked',
  'Keyword-only search; no semantic discovery',
  'Surveillance-based; your data monetised without consent',
];
const NEW = [
  'One hyper-personalised, AI-verified feed across all 9 pillars',
  'Abstractive summaries that strip framing while keeping the facts',
  'MMR re-ranking mathematically enforces source diversity',
  'RAG-consensus hallucination control on every summary',
  'pgvector semantic search — discovery by meaning, not keywords',
  'Privacy by design — your data is never sold to third parties',
];

const INTEGRITY = [
  { t: 'Abstractive Synthesis', s: 'AI-generated WWWW (Who · What · Where · Why) summaries that capture the facts without reproducing sensationalist framing.' },
  { t: 'Hallucination Control', s: 'RAG-consensus cross-verification checks every AI summary against its source material to prevent factual drift.' },
  { t: 'Source Diversity', s: 'The MMR re-ranker ensures no single publisher dominates your feed — protecting against filter bubbles by design.' },
  { t: 'Real-Time Personalisation', s: 'EMA profile vectors + Redis Streams update your interests within minutes of every click, read, save or share.' },
  { t: 'Semantic Discovery', s: 'A pgvector HNSW index enables sub-millisecond similarity search across sources.' },
  { t: 'SGI Watermarking', s: 'Every AI-generated summary is transparently marked, in full compliance with India’s IT Rules 2026.' },
];

const STACK = [
  ['Backend API', 'Python · FastAPI'],
  ['Vector store', 'PostgreSQL + pgvector'],
  ['Events & cache', 'Redis Streams'],
  ['Primary LLM', 'Gemini cascade'],
  ['Fast fallback LLM', 'Groq'],
  ['Embeddings', 'Local MiniLM 384-dim'],
  ['Delivery', 'PWA · web + mobile'],
  ['Ops', 'CI/CD · hot-standby failover'],
];

const PHASES = [
  { t: 'Foundation & Security', s: 'FastAPI, Docker, CI/CD, Argon2id, JWT rotation, rate limiting.', d: 'Complete' },
  { t: 'Data Ingestion Pipeline', s: 'Real-time RSS from 24+ publishers, dedup, compliant parsing.', d: 'Complete' },
  { t: 'AI Intelligence Layer', s: 'Gemini→Groq cascade, MiniLM embeddings, pgvector, VIBGYOR taxonomy.', d: 'Complete' },
  { t: 'Personalisation Engine', s: 'Redis Streams, EMA profiles, hybrid scorer, MMR re-ranker.', d: 'Complete' },
  { t: 'PWA Frontend', s: 'Dark, editorial, glassmorphic PWA — mobile-responsive.', d: 'Complete' },
  { t: 'Production Deployment', s: 'Mumbai-region latency, hot-standby failover, monitoring.', d: 'In progress' },
];

const COMPLY = [
  'AI content marked per India’s IT Rules 2026',
  'Hardened auth & session security',
  'Your data is never sold to third parties',
  'Domestic data & AI infrastructure',
];

export function Company() {
  return (
    <>
      <section className="sec">
        <div className="wrap">
          <span className="label">04 — The Problem</span>
          <h2>The feed is broken. We <em>rebuilt</em> it.</h2>
          <div className="grid-2" style={{ marginTop: 28 }}>
            <div className="card">
              <span className="tag">Today's feed</span>
              <ul className="list x">{OLD.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="card amberline">
              <span className="tag amber">With SherrByte</span>
              <ul className="list ok">{NEW.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label">05 — Engineered for integrity</span>
          <h2>Built for factual accuracy, not <em>engagement</em>.</h2>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {INTEGRITY.map((f) => (
              <div className="card" key={f.t}><h3>{f.t}</h3><p>{f.s}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label">06 — Cloud-native by design</span>
          <h2>The infrastructure behind the <em>engine</em>.</h2>
          <p className="sec-lead">
            A multi-provider, resilient, cost-efficient stack — engineered for sub-500ms feed
            serving and zero-downtime failover.
          </p>
          <div className="grid-4">
            {STACK.map(([k, v]) => (
              <div className="card mini" key={k}><span className="tag">{k}</span><div className="mini-v">{v}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label">07 — The build</span>
          <h2>Six structured <em>phases</em>.</h2>
          <div className="phases">
            {PHASES.map((p, i) => (
              <div className="phase" key={p.t}>
                <span className="ph-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.t} <span className={`badge ${p.d === 'Complete' ? 'done' : 'wip'}`}>{p.d}</span></h3>
                  <p>{p.s}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="sec-lead" style={{ marginTop: 20 }}>
            <strong>Next:</strong> short-form Bytes, VIBGYOR community Circles, the productised
            B2B Core Data API, and Telugu / Hindi multilingual support.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label">08 — How we grow</span>
          <h2>A dual-engine revenue <em>model</em>.</h2>
          <div className="grid-2" style={{ marginTop: 28 }}>
            <div className="card">
              <span className="tag">B2C · SherrByte</span>
              <p>Ads and aggregated insights first; premium subscriptions and value-added
                features as the base grows toward a ~1 lakh Year-1 user target.</p>
            </div>
            <div className="card">
              <span className="tag">B2B · Core Data</span>
              <p>Licensing structured, real-time feeds and API access to enterprises, publishers
                and research firms — targeting 15–20 integrations by Year 2.</p>
            </div>
          </div>
          <div className="comply">
            {COMPLY.map((c) => <div className="cmp" key={c}><span>✓</span>{c}</div>)}
          </div>
        </div>
      </section>
    </>
  );
}
