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
    <div className="company-zone">
      {/* Problem → Solution */}
      <section className="section co-sec">
        <span className="num-label">The problem</span>
        <h2 className="h-sec">The feed is broken.<br />We <span className="italic amber">rebuilt</span> it.</h2>
        <div className="compare">
          <div className="col old">
            <div className="c-head">Today’s feed</div>
            <ul>{OLD.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="col neu">
            <div className="c-head">With SherrByte</div>
            <ul>{NEW.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* Information integrity */}
      <section className="section co-sec">
        <span className="num-label">Engineered for integrity</span>
        <h2 className="h-sec">Built for factual accuracy,<br />not <span className="italic amber">engagement</span>.</h2>
        <div className="feat-grid">
          {INTEGRITY.map((f) => (
            <div className="feat" key={f.t}>
              <div className="f-t serif">{f.t}</div>
              <div className="f-s">{f.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section co-sec">
        <span className="num-label">Cloud-native by design</span>
        <h2 className="h-sec">The infrastructure<br />behind the <span className="italic amber">engine</span>.</h2>
        <p className="col-copy" style={{ maxWidth: '52ch' }}>
          A multi-provider, resilient, cost-efficient stack — engineered for sub-500ms feed
          serving and zero-downtime failover.
        </p>
        <div className="stack-grid">
          {STACK.map(([k, v]) => (
            <div className="stk" key={k}><div className="s-k">{k}</div><div className="s-v">{v}</div></div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="section co-sec">
        <span className="num-label">The build</span>
        <h2 className="h-sec">Six structured <span className="italic amber">phases</span>.</h2>
        <div className="road">
          {PHASES.map((p, i) => (
            <div className={`ph ${p.d === 'Complete' ? 'done' : 'wip'}`} key={p.t}>
              <div className="ph-n">{String(i + 1).padStart(2, '0')}</div>
              <div className="ph-body">
                <div className="ph-t serif">{p.t} <span className="ph-d">{p.d}</span></div>
                <div className="ph-s">{p.s}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="col-copy" style={{ maxWidth: '52ch', marginTop: 18 }}>
          <strong>Next:</strong> short-form Bytes, VIBGYOR community Circles, the productised B2B
          Core Data API, and Telugu / Hindi multilingual support.
        </p>
      </section>

      {/* Revenue + compliance */}
      <section className="section co-sec">
        <span className="num-label">How we grow</span>
        <h2 className="h-sec">A dual-engine<br />revenue <span className="italic amber">model</span>.</h2>
        <div className="two-layer" style={{ marginTop: 24 }}>
          <div className="lyr">
            <span className="lyr-tag">B2C · SherrByte</span>
            <p className="lyr-copy">Ads and aggregated insights first; premium subscriptions and
              value-added features as the base grows toward a ~1 lakh Year-1 user target.</p>
          </div>
          <div className="lyr">
            <span className="lyr-tag">B2B · Core Data</span>
            <p className="lyr-copy">Licensing structured, real-time feeds and API access to
              enterprises, publishers and research firms — targeting 15–20 integrations by Year 2.</p>
          </div>
        </div>
        <div className="comply">
          <span className="num-label" style={{ marginTop: 34 }}>Built for India, compliant by design</span>
          <div className="comply-row">
            {COMPLY.map((c) => <div className="cmp" key={c}><span className="tick">✓</span>{c}</div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
