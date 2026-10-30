export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="brand" aria-label="SherrByte — home">
          SherrByte<span className="sb">SBBS</span>
        </a>
        <nav className="links">
          <a href="#geo">GEO</a>
          <a href="#sbbs">SBBS</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a href="#contact" className="nav-cta">Book a demo</a>
      </div>
    </header>
  );
}
