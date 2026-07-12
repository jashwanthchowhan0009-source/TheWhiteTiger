import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { prefersReducedMotion, isMobile } from '../scroll/tigerState';

// Studio dust: faint warm motes drifting through the key light. Plain
// THREE.Points (no shaders, no textures) so it renders on every GPU. This is
// what makes the light feel like it has a body — atmosphere, not decoration.
const COUNT = 120;

export function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const reduced = prefersReducedMotion();

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // inside the light pool: a loose column around the spot's footprint
      const r = Math.sqrt(Math.random()) * 3.4;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = 0.4 + Math.cos(a) * r;           // x — around the pool centre
      pos[i * 3 + 1] = Math.random() * 5.5 - 1.5;   // y — floor to above head
      pos[i * 3 + 2] = Math.sin(a) * r * 0.7;       // z — depth
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#ffdfae'),
        size: 0.016,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((_, dt) => {
    if (!ref.current || reduced) return;
    // slow orbital drift + a barely-there vertical breathe
    ref.current.rotation.y += dt * 0.018;
    ref.current.position.y = Math.sin(performance.now() * 0.00012) * 0.12;
  });

  if (isMobile()) return null; // keep mobile GPU budget untouched
  return <points ref={ref} geometry={geo} material={mat} />;
}
