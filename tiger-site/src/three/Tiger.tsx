import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { makeWhiteTigerMaterial } from './stone';
import { tigerState, isMobile, prefersReducedMotion } from '../scroll/tigerState';
import { pointer } from './pointer';

const MODEL = '/models/tiger.glb';

export function Tiger() {
  const { scene } = useGLTF(MODEL, '/draco/');
  const outer = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const reduced = prefersReducedMotion();

  // Clone + apply the stone material + normalise to height ≈ 2.2, centred.
  const model = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const orig = m.material as THREE.MeshStandardMaterial;
        const map = orig && orig.map ? orig.map : null;
        if (map) map.colorSpace = THREE.SRGBColorSpace;
        m.material = makeWhiteTigerMaterial(map);   // keep the tiger's stripe markings
        m.castShadow = true; m.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const s = 2.2 / (size.y || 1);
    root.scale.setScalar(s);
    root.updateMatrixWorld(true);
    const box2 = new THREE.Box3().setFromObject(root);
    const c = box2.getCenter(new THREE.Vector3());
    root.position.sub(c);
    return root;
  }, [scene]);

  useEffect(() => () => { /* materials are per-instance; GC handles them */ }, []);

  useFrame((_, dt) => {
    if (!outer.current || !inner.current) return;
    const mob = isMobile();
    // scroll-driven pose (mobile stays centred + zoomed out to fit portrait)
    const px = mob ? 0 : tigerState.posX;
    outer.current.position.x += (px - outer.current.position.x) * Math.min(1, dt * 4);
    outer.current.position.y += (tigerState.posY - outer.current.position.y) * Math.min(1, dt * 4);
    const sc = tigerState.scale * (mob ? 0.64 : 1);
    outer.current.scale.x += (sc - outer.current.scale.x) * Math.min(1, dt * 4);
    outer.current.scale.y = outer.current.scale.z = outer.current.scale.x;

    const t = performance.now() * 0.001;
    // idle breathe + micro sine drift; mouse parallax (desktop only)
    const drift = reduced ? 0 : Math.sin(t * 0.35) * 0.05;
    const par = (mob || reduced) ? { x: 0, y: 0 } : { x: pointer.x * 0.035, y: pointer.y * 0.02 };
    inner.current.rotation.y = tigerState.rotY + drift + par.x;
    inner.current.rotation.x = -0.21 + par.y; // ~-12° "descending toward viewer"
    const breathe = reduced ? 1 : 1 + Math.sin(t * 1.25) * 0.004;
    inner.current.scale.y = breathe;
  });

  return (
    <group ref={outer} position={[tigerState.posX, tigerState.posY, 0]}>
      <group ref={inner}>
        <primitive object={model} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL, '/draco/');
