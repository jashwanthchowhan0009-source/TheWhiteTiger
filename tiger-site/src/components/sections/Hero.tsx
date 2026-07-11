// headline split into masked words for the entrance reveal (translateY 110%→0)
function Word({ text, i, cls = '' }: { text: string; i: number; cls?: string }) {
  return (
    <span className="w">
      <span className="wi" style={{ transitionDelay: `${400 + i * 60}ms` }}>
        <span className={cls}>{text}</span>
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="section h-hero">
      {/* text sits in the negative space to the LEFT of the sculpture */}
      <div className="hero-copy layer-front" data-reveal>
        <span className="mono-label" style={{ color: 'var(--amber)', letterSpacing: '0.22em' }}>
          SherrByte · your personal information OS
        </span>
        <h1 className="hero-head hero-mask" style={{ marginTop: 22 }}>
          <Word text="The" i={0} />{' '}
          <Word text="informed" i={1} /><br />
          <Word text="are" i={2} />{' '}
          {/* word + period share one mask unit so the dot can never wrap alone */}
          <span className="w">
            <span className="wi" style={{ transitionDelay: '580ms' }}>
              <span className="italic amber">ungovernable</span>.
            </span>
          </span>
        </h1>
        <p className="hero-sub" style={{ marginLeft: 0, textAlign: 'left' }}>
          An information engine — clean, verified, objective truth, carved from the world's noise.
        </p>
        <a href="/download/" className="cta">Get SherrByte</a>
      </div>
      <div className="scroll-hint layer-front"><span>Scroll — enter the beast</span><div className="line" /></div>
    </section>
  );
}
