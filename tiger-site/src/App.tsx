import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Scene } from './three/Scene';
import { Nav } from './components/Nav';
import { Grain } from './components/Grain';
import { Loader } from './components/Loader';
import { Hero } from './components/sections/Hero';
import { Elegance } from './components/sections/Elegance';
import { About } from './components/sections/About';
import { Gallery } from './components/sections/Gallery';
import { Contact } from './components/sections/Contact';
import { useScroll } from './lib/useScroll';
import './three/pointer';

export default function App() {
  const [ready, setReady] = useState(false); // fonts ready → mount canvas
  const [done, setDone] = useState(false);    // fade the loader

  useEffect(() => {
    // debug framing mode (?pose=…) skips the loader for fast iteration
    if (new URLSearchParams(window.location.search).has('pose')) {
      setReady(true); setTimeout(() => setDone(true), 60); return;
    }
    const fonts = (document as any).fonts?.ready ?? Promise.resolve();
    // never block forever on fonts (offline / blocked CDN): cap the wait
    const fontsCapped = Promise.race([fonts, new Promise((r) => setTimeout(r, 2200))]);
    const minWait = new Promise((r) => setTimeout(r, 1400));
    let cancelled = false;
    Promise.all([fontsCapped, minWait]).then(() => {
      if (cancelled) return;
      setReady(true);
      setTimeout(() => setDone(true), 120);
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
        {ready && (
          <Canvas
            dpr={[1, 2]}
            shadows
            camera={{ fov: 35, position: [0, 0, 7], near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 0.98;
              gl.outputColorSpace = THREE.SRGBColorSpace;
            }}
          >
            <Scene />
          </Canvas>
        )}
      </div>

      <main id="scroll-root">
        <Hero />
        <Elegance />
        <About />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
