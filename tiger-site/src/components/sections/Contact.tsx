export function Contact() {
  return (
    <section id="contact" className="section h-100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="layer-front copy-scrim c" style={{ marginTop: '6vh', maxWidth: 'min(1000px, 92vw)', marginLeft: 'auto', marginRight: 'auto' }} data-reveal>
        <span className="mono-label" style={{ color: 'var(--amber)' }}>Reclaim your time</span>
        <h2 className="den-head" style={{ marginTop: 16 }}>The informed are<br /><span className="italic amber">ungovernable</span>.</h2>
        <a href="/download/" className="den-mail">Get SherrByte →</a>
      </div>
      <footer className="footer layer-front" style={{ marginTop: 'auto' }}>
        <span>© TheWhiteTiger · SherrByte</span>
        <div className="fnav">
          <a href="#top">Home</a><a href="#about">VIBGYOR</a><a href="#gallery">Engine</a>
        </div>
        <span>Information Sovereignty for India</span>
      </footer>
    </section>
  );
}
