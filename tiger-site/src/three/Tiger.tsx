import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { makeStoneMaterial } from './stone';
import { tigerState, isMobile, prefersReducedMotion } from '../scroll/tigerState';
import { pointer, isTouch } from './pointer';

const MODEL = '/models/tiger.glb';

// eye anchor in the model's local space (upper-front, one side) — the point the
// glint fires from and the gaze pivots around.
const EYE = new THREE.Vector3(0.34, 0.72, 0.78);

export function Tiger() {
  const { scene } = useGLTF(MODEL, '/draco/');
  const outer = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const eye = useRef<THREE.Object3D>(null!);
  const glint = useRef<THREE.PointLight>(null!);
  const reduced = prefersReducedMotion();
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  // heavy-lerped gaze + glint timers (kept out of React state)
  const gaze = useRef({ yaw: 0, pitch: 0 });
  const glintStart = useRef(-9999);
  const lastGlint = useRef(-9999);
  const v = useRef(new THREE.Vector3());

  // Clone + apply the stone material + normalise to height ≈ 2.2, centred.
  const model = useMemo(() => {
    const root = scene.clone(true);
    const stone = makeStoneMaterial();          // uniform carved-stone statue
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) { m.material = stone; m.castShadow = true; m.receiveShadow = true; }
    });
    const box = new THREE.Box3().setFromObject(root);
    const s = 2.2 / (box.getSize(new THREE.Vector3()).y || 1);
    root.scale.setScalar(s);
    root.updateMatrixWorld(true);
    const c = new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
    root.position.sub(c);
    return root;
  }, [scene]);

  useFrame((_, dt) => {
    if (!outer.current || !inner.current) return;
    const mob = isMobile();
    const px = mob ? 0 : tigerState.posX;
    const g = Math.min(1, dt * 2.8);
    outer.current.position.x += (px - outer.current.position.x) * g;
    outer.current.position.y += (tigerState.posY - outer.current.position.y) * g;
    const sc = tigerState.scale * (mob ? 0.64 : 1);
    outer.current.scale.x += (sc - outer.current.scale.x) * g;
    outer.current.scale.y = outer.current.scale.z = outer.current.scale.x;

    const t = performance.now() * 0.001;
    const now = performance.now();

    // ── The Gaze: heavy, muscular head tracking ──
    let ty = 0, tx = 0;
    if (!reduced) {
      if (isTouch || !pointer.active) {
        // deliberate idle scan on touch / before first move
        ty = Math.sin(t * ((2 * Math.PI) / 9)) * 0.08;
      } else {
        ty = THREE.MathUtils.clamp(pointer.x * 0.16, -0.12, 0.12);
        tx = THREE.MathUtils.clamp(pointer.y * 0.09, -0.06, 0.06);
      }
    }
    gaze.current.yaw += (ty - gaze.current.yaw) * 0.06;   // heavy lerp
    gaze.current.pitch += (tx - gaze.current.pitch) * 0.06;
    const drift = reduced ? 0 : Math.sin(t * 0.35) * 0.04;
    inner.current.rotation.y = tigerState.rotY + drift + gaze.current.yaw;
    inner.current.rotation.x = -0.1 + gaze.current.pitch;
    inner.current.scale.y = reduced ? 1 : 1 + Math.sin(t * 1.25) * 0.004;

    // ── The glint: warm flash when the cursor nears the eye (desktop only) ──
    if (glint.current) {
      if (!reduced && !isTouch && pointer.active && eye.current) {
        eye.current.getWorldPosition(v.current).project(camera);
        if (v.current.z < 1) {
          const sx = (v.current.x * 0.5 + 0.5) * size.width;
          const sy = (-v.current.y * 0.5 + 0.5) * size.height;
          const d = Math.hypot(sx - pointer.px, sy - pointer.py);
          if (d < 120 && now - lastGlint.current > 3000) {
            glintStart.current = now; lastGlint.current = now;
          }
        }
      }
      const gEl = (now - glintStart.current) / 600;
      glint.current.intensity = gEl >= 1 ? 0 : 2 * Math.pow(2, -10 * gEl); // expo.out 2→0
    }
  });

  return (
    <group ref={outer} position={[tigerState.posX, tigerState.posY, 0]}>
      <group ref={inner}>
        <primitive object={model} />
        <object3D ref={eye} position={EYE} />
        <pointLight ref={glint} position={[EYE.x + 0.1, EYE.y + 0.04, EYE.z + 0.25]} color={'#ffce7a'} intensity={0} distance={4} decay={2} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL, '/draco/');
