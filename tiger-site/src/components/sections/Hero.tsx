import { useEffect, useRef } from 'react';
import { NodeField } from '../NodeField';

export function Hero() {
  const vref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    const show = () => v.classList.add('ready');
    if (v.readyState >= 2) show();
    v.addEventListener('loadeddata', show, { once: true });
    // best-effort autoplay (some browsers need an explicit call)
    v.play?.().catch(() => {});
    return () => v.removeEventListener('loadeddata', show);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-media" aria-hidden="true" style={{ backgroundImage: 'url(/media/hero-city-poster.jpg)' }}>
        <video ref={vref} autoPlay muted loop playsInline preload="auto" poster="/media/hero-city-poster.jpg">
          <source src="/media/hero-city.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-canvas" aria-hidden="true"><NodeField mode="field" density={0.7} /></div>
      <img className="hero-watermark" src="/tiger.png" alt="" aria-hidden="true" />

      <div className="wrap">
        <span className="eyebrow reveal">SherrByte Pvt. Ltd. — AI intelligence infrastructure</span>
        <h1 className="reveal">Transforming public information into <em>intelligence</em>.</h1>
        <p className="lead reveal">
          SherrByte builds the system that observes the world's public data, understands it with AI,
          and delivers it as real-time intelligence — to enterprises, governments and everyone who
          must decide.
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
