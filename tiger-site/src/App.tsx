import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Grain } from './components/Grain';
import { Loader } from './components/Loader';
import { Hero } from './components/sections/Hero';
import { Elegance } from './components/sections/Elegance';
import { About } from './components/sections/About';
import { Gallery } from './components/sections/Gallery';
import { Company } from './components/sections/Company';
import { Contact } from './components/sections/Contact';
import { useScroll } from './lib/useScroll';

export default function App() {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false); // fade the loader

  useEffect(() => {
    // reveal the hero (word masks) once the loader clears
    const fire = () => {
      document.body.classList.add('is-ready');
      setTimeout(() => setDone(true), 120);
    };
    const fonts = (document as any).fonts?.ready ?? Promise.resolve();
    // never block forever on fonts (offline / blocked CDN): cap the wait
    const fontsCapped = Promise.race([fonts, new Promise((r) => setTimeout(r, 2200))]);
    const minWait = new Promise((r) => setTimeout(r, 900));
    let cancelled = false;
    Promise.all([fontsCapped, minWait]).then(() => {
      if (cancelled) return;
      setReady(true);
      fire();
    });
    return () => { cancelled = true; };
  }, []);

  useScroll(ready);

  return (
    <>
      <Loader done={done} />
      <Grain />
      <div className="bg-vignette" aria-hidden="true" />
      <Nav />

      <main id="scroll-root">
        <Hero />
        <Elegance />
        <About />
        <Gallery />
        <Company />
        <Contact />
      </main>
    </>
  );
}
