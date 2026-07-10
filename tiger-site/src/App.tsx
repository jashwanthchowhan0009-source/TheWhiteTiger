import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Scene } from './three/Scene';
import { ModelBoundary } from './three/ErrorBoundary';
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
import { beginIntro } from './three/intro';
import { prefersReducedMotion } from './scroll/tigerState';
import './three/pointer';

export default function App() {
  const [ready, setReady] = useState(false); // fonts ready → mount canvas
  const [done, setDone] = useState(false);    // fade the loader

  useEffect(() => {
    const reduced = prefersReducedMotion();
    // reveal the hero + choreograph the entrance once the loader clears
    const fire = () => {
      beginIntro(reduced);
      document.body.classList.add('is-ready');
      setTimeout(() => setDone(true), 120);
    };
    // debug framing mode (?pose=…) skips the loader for fast iteration
    if (new URLSearchParams(window.location.search).has('pose')) {
      setReady(true); fire(); return;
    }
    const fonts = (document as any).fonts?.ready ?? Promise.resolve();
    // never block forever on fonts (offline / blocked CDN): cap the wait
    const fontsCapped = Promise.race([fonts, new Promise((r) => setTimeout(r, 2200))]);
    const minWait = new Promise((r) => setTimeout(r, 1400));
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

      <div className="stage" aria-hidden="true">
        {/* A DOM-level boundary AROUND the Canvas: if WebGL / the 3D scene ever
            fails, we simply drop the canvas and keep the rest of the page (nav,
            headline, sections) fully usable — never a blank screen. */}
        <ModelBoundary
          label="canvas"
          fallback={(err) => (
            <div className="gl-note">3D scene unavailable on this browser — {String(err.message).slice(0, 90)}</div>
          )}
        >
          {ready && (
            <Canvas
              dpr={[1, 2]}
              shadows
              camera={{ fov: 34, position: [0.7, 1.6, 6.8], near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: true }}
              onCreated={({ gl, camera }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 0.86;
                gl.outputColorSpace = THREE.SRGBColorSpace;
                // elevated top-side angle, looking slightly down into the studio
                camera.position.set(0.7, 1.6, 6.8);
                camera.lookAt(0, -0.2, 0);
              }}
            >
              <Scene />
            </Canvas>
          )}
        </ModelBoundary>
      </div>

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
