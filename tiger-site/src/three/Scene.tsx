import { Suspense, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnv } from './RoomEnv';
import { Tiger } from './Tiger';
import { FallbackTiger } from './FallbackTiger';
import { ModelBoundary } from './ErrorBoundary';
import { Dust } from './Dust';
import { intro, INTRO_MS } from './intro';

// The entrance: the camera eases from slightly closer + lower to shot 0 while
// the key light fades up (via intro.keyMul) — the sculpture steps into light.
const CAM_BASE = new THREE.Vector3(0.7, 1.6, 6.8);
const CAM_LOOK = new THREE.Vector3(0, -0.2, 0);
const CAM_START = CAM_BASE.clone()
  .addScaledVector(CAM_LOOK.clone().sub(CAM_BASE).normalize(), 0.4);
CAM_START.y -= 0.05;

function Intro() {
  const camera = useThree((s) => s.camera);
  useFrame(() => {
    if (!intro.started || intro.reduced) return;
    const p = Math.min(1, (performance.now() - intro.startAt) / INTRO_MS);
    const e = 1 - Math.pow(2, -10 * p); // expo.out
    camera.position.lerpVectors(CAM_START, CAM_BASE, e);
    camera.lookAt(CAM_LOOK);
    intro.keyMul = e;
  });
  return null;
}

// Gallery-spotlight rig for the bronze (exact spec):
//   warm KEY  #ffd9a8 2.6 @ (4,6,3) with shadows
//   cool FILL #7a8fc4 0.5 @ (-5,2,-2)
//   warm RIM  #ffb45e 3.2 @ (-2,4,-6) — carves the silhouette out of the black
//   ambient   #1a1410 0.6
function BronzeLights() {
  const key = useRef<THREE.DirectionalLight>(null!);
  useFrame((_, dt) => {
    const k = Math.min(1, dt * 2.4);
    if (key.current) {
      key.current.intensity += (2.6 * intro.keyMul - key.current.intensity) * k;
    }
  });
  return (
    <>
      <directionalLight
        ref={key}
        position={[4, 6, 3]}
        intensity={2.6}
        color={'#ffd9a8'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0004}
        shadow-radius={7}
      />
      <directionalLight position={[-5, 2, -2]} intensity={0.5} color={'#7a8fc4'} />
      <directionalLight position={[-2, 4, -6]} intensity={3.2} color={'#ffb45e'} />
      <ambientLight color={'#1a1410'} intensity={0.6} />
      {/* the pool of light the tiger stands in — soft warm spot from directly
          above (decay 0 so the physical falloff doesn't swallow it) */}
      <spotLight position={[0.4, 6.5, 0]} angle={0.5} penumbra={1} intensity={1.2} decay={0} color={'#ffce7a'} />
    </>
  );
}

export function Scene() {
  return (
    <>
      {/* the far body melts into darkness */}
      <fogExp2 attach="fog" args={['#0a0a0e', 0.055]} />
      <RoomEnv />
      <Intro />
      <BronzeLights />
      <Dust />

      <ModelBoundary fallback={<FallbackTiger />}>
        <Suspense fallback={null}>
          <Tiger />
        </Suspense>
      </ModelBoundary>

      {/* shadow-catcher floor: no visible geometry, just the sculpture's shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial transparent opacity={0.45} />
      </mesh>

      {/* soft grounded contact shadow directly under the paws */}
      <ContactShadows position={[0, -1.5, 0]} scale={14} blur={3.2} opacity={0.5} far={5} resolution={1024} color="#0a0a0c" />
    </>
  );
}
