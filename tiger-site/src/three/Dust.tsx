import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { prefersReducedMotion, isMobile } from '../scroll/tigerState';

// Studio dust: faint warm motes drifting through the key light. Plain
// THREE.Points (no shaders, no textures) so it renders on every GPU. This is
// what makes the light feel like it has a body — atmosphere, not decoration.
const COUNT = 130;

export function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const reduced = prefersReducedMotion();

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 11;      // x — across the stage
      pos[i * 3 + 1] = Math.random() * 6.5 - 1.6;   // y — floor to above head
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;   // z — depth
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#ffdfae'),
        size: 0.022,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.32,
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
