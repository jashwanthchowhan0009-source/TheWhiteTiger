import { useEffect, useRef } from 'react';

export function Hero() {
  const vref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    const show = () => v.classList.add('ready');
    if (v.readyState >= 2) show();
    v.addEventListener('loadeddata', show, { once: true });
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
      <img className="hero-watermark" src="/tiger.png" alt="" aria-hidden="true" />

      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow reveal">SherrByte Pvt. Ltd. — AI intelligence infrastructure</span>
          <h1 className="reveal">The informed are <em>ungovernable</em>.</h1>
          <p className="lead reveal">
            SherrByte builds the AI infrastructure that observes the world's public data, understands
            it, and delivers it as real-time intelligence — for enterprises, governments and everyone
            who must decide.
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
      </div>
      <div className="scroll-cue" aria-hidden="true">Scroll<span /></div>
    </section>
  );
}
