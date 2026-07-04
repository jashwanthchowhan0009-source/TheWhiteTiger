export function Elegance() {
  return (
    <section className="section h-150">
      {/* giant word behind the tiger */}
      <div className="layer-back" style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <div className="giant" data-giant style={{ fontSize: '20vw' }}>UNTAMED</div>
      </div>
      {/* left column copy in front */}
      <div className="layer-front copy-scrim sec-copy" style={{ position: 'absolute', top: '30vh', left: 'clamp(20px,5vw,64px)', maxWidth: '38ch' }} data-reveal>
        <span className="num-label">01 — The Gaze</span>
        <h2 className="h-sec" style={{ marginBottom: 14 }}>Eyes of<br /><span className="italic amber">stone.</span></h2>
        <p className="col-copy">
          Head low, unblinking. Every plane of the face cut to catch the light and let the shadow
          do the rest — the apex stare, held forever.
        </p>
      </div>
    </section>
  );
}
