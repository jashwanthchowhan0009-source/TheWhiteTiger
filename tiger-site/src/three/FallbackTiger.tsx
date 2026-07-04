import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeStoneMaterial } from './stone';
import { tigerState, isMobile, prefersReducedMotion } from '../scroll/tigerState';
import { pointer } from './pointer';

// A stylised prowling big-cat silhouette (side profile), extruded to a slab and
// carved in the same stone. Shown only if /models/tiger.glb is missing so the
// canvas is never blank.
const OUTLINE: [number, number][] = [
  [2.6, 0.15], [2.55, 0.5], [2.28, 0.66], [2.0, 0.58], [1.4, 0.78], [0.4, 0.72],
  [-0.6, 0.74], [-1.4, 0.7], [-1.72, 0.95], [-2.2, 1.55], [-2.5, 2.15], [-2.18, 2.02],
  [-1.9, 1.4], [-1.7, 0.78], [-1.5, 0.2], [-1.42, -0.62], [-1.26, -0.98], [-1.0, -0.92],
  [-1.05, -0.2], [-0.2, -0.36], [0.7, -0.4], [1.32, -0.46], [1.52, -0.92], [1.78, -1.02],
  [1.98, -0.9], [1.9, -0.3], [2.02, 0.0], [2.42, -0.05], [2.6, 0.15],
];

export function FallbackTiger() {
  const outer = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const reduced = prefersReducedMotion();

  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    OUTLINE.forEach(([x, y], i) => (i ? shape.lineTo(x, y) : shape.moveTo(x, y)));
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.9, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.16, bevelSegments: 4, steps: 1,
    });
    g.center();
    g.computeVertexNormals();
    // normalise height to ~2.2
    g.computeBoundingBox();
    const h = g.boundingBox!.max.y - g.boundingBox!.min.y;
    g.scale(2.2 / h, 2.2 / h, 2.2 / h);
    return g;
  }, []);

  const mat = useMemo(() => makeStoneMaterial(), []);

  useFrame((_, dt) => {
    if (!outer.current || !inner.current) return;
    const mob = isMobile();
    const px = mob ? 0 : tigerState.posX;
    outer.current.position.x += (px - outer.current.position.x) * Math.min(1, dt * 4);
    outer.current.position.y += (tigerState.posY - outer.current.position.y) * Math.min(1, dt * 4);
    const sc = tigerState.scale;
    outer.current.scale.setScalar(outer.current.scale.x + (sc - outer.current.scale.x) * Math.min(1, dt * 4));
    const t = performance.now() * 0.001;
    const par = (mob || reduced) ? 0 : pointer.x * 0.03;
    inner.current.rotation.y = tigerState.rotY + (reduced ? 0 : Math.sin(t * 0.35) * 0.05) + par;
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        <mesh geometry={geo} material={mat} castShadow receiveShadow />
      </group>
    </group>
  );
}
