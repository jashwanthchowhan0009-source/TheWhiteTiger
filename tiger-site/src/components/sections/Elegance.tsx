export function Elegance() {
  return (
    <section className="section h-150">
      {/* giant word behind the tiger */}
      <div className="layer-back" style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <div className="giant" data-giant style={{ fontSize: '20vw' }}>UNTAMED</div>
      </div>
      {/* left column copy in front */}
      <div className="layer-front" style={{ position: 'absolute', top: '38vh', left: 'clamp(20px,5vw,64px)', maxWidth: '34ch' }} data-reveal>
        <span className="num-label">01 — The Form</span>
        <p className="col-copy">
          <strong>Descending, deliberate.</strong> Shoulders raised, head low, one paw already
          reaching past the plinth. The stone remembers the muscle beneath — every plane cut to
          catch the light and let the shadow do the rest.
        </p>
      </div>
    </section>
  );
}
