import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeStoneMaps } from './stone';

// A calm, glossy blue ocean the tiger rises out of. Deliberately built from a
// plain MeshStandardMaterial with an animated normal map (no custom shaders /
// render-targets) so it renders everywhere the tiger already does. Two normal
// layers drift in opposite directions for a living, rippling surface; the deep
// blue glossy material reflects the environment like water.
export function Water() {
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const n1 = useMemo(() => {
    const { normal } = makeStoneMaps(256);
    normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
    normal.repeat.set(14, 14);
    return normal;
  }, []);

  useFrame((_, dt) => {
    const t = performance.now() * 0.001;
    // drift the ripples so the surface is always gently moving
    n1.offset.set((t * 0.015) % 1, (t * 0.02) % 1);
    if (matRef.current) {
      // subtle shimmer in the wet glint
      matRef.current.metalness = 0.55 + Math.sin(t * 0.6) * 0.05;
    }
    void dt;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
      <planeGeometry args={[80, 80, 1, 1]} />
      <meshStandardMaterial
        ref={matRef}
        color={'#0a2740'}
        roughness={0.12}
        metalness={0.6}
        envMapIntensity={1.4}
        normalMap={n1}
        normalScale={new THREE.Vector2(0.35, 0.35)}
        transparent
        opacity={0.94}
      />
    </mesh>
  );
}
