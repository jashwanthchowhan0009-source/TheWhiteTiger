export function Contact() {
  return (
    <section id="contact" className="section h-100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="layer-front" style={{ marginTop: '6vh' }} data-reveal>
        <h2 className="den-head">Enter the den.</h2>
        <a href="mailto:hello@thewhitetiger.studio" className="den-mail">hello@thewhitetiger.studio</a>
      </div>
      <footer className="footer layer-front" style={{ marginTop: 'auto' }}>
        <span>© THEWHITETIGER 2026</span>
        <div className="fnav">
          <a href="#top">Home</a><a href="#about">About</a><a href="#gallery">Gallery</a>
        </div>
        <span>Made with stone &amp; code</span>
      </footer>
    </section>
  );
}
