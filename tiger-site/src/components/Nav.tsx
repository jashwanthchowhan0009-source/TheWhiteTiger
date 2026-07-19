function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch { /* ignore */ }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', next === 'light' ? '#f4f6fb' : '#070a12');
}

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="wordmark">THEWHITETIGER</a>
        <nav className="links">
          <a href="#platform">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#industries">Industries</a>
          <a href="#products">Products</a>
        </nav>
        <button
          type="button"
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle light and dark mode"
        >
          <svg className="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
        <a href="#contact" className="nav-cta">Contact sales</a>
      </div>
    </header>
  );
}
