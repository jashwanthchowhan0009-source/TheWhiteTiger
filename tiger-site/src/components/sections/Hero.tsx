import { NodeField } from '../NodeField';

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-canvas"><NodeField mode="field" /></div>
      <div className="wrap">
        <span className="eyebrow reveal">SherrByte — AI intelligence infrastructure</span>
        <h1 className="reveal">Transforming public information into <em>intelligence</em>.</h1>
        <p className="lead reveal">
          The White Tiger builds the system that observes the world's public data, understands it
          with AI, and delivers it as real-time intelligence — to enterprises, governments and
          everyone who must decide.
        </p>
        <div className="hero-actions reveal">
          <a href="#collect" className="btn primary">Enter the system</a>
          <a href="#contact" className="btn ghost">Contact sales</a>
        </div>
        <div className="hero-live reveal">
          <span className="dotlive" />
          <span><b id="live-count">12,904</b> public sources · streaming</span>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">Scroll<span /></div>
    </section>
  );
}
