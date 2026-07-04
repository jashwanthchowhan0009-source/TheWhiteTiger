import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnv } from './RoomEnv';
import { Tiger } from './Tiger';
import { FallbackTiger } from './FallbackTiger';
import { ModelBoundary } from './ErrorBoundary';
import { tigerState } from '../scroll/tigerState';

const NEUTRAL = new THREE.Color('#fff1e0');
const WARM = new THREE.Color('#ffc98a');

// Three-point rig whose intensities/temperature are driven by the scroll state.
function Lights() {
  const key = useRef<THREE.DirectionalLight>(null!);
  const rim = useRef<THREE.DirectionalLight>(null!);
  const hemi = useRef<THREE.HemisphereLight>(null!);
  const tmp = new THREE.Color();

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 3);
    if (key.current) {
      key.current.intensity += (tigerState.key - key.current.intensity) * k;
      tmp.copy(NEUTRAL).lerp(WARM, tigerState.keyWarm);
      key.current.color.lerp(tmp, k);
    }
    if (rim.current) rim.current.intensity += (tigerState.rim - rim.current.intensity) * k;
    if (hemi.current) hemi.current.intensity += (tigerState.fill - hemi.current.intensity) * k;
  });

  return (
    <>
      <directionalLight
        ref={key}
        position={[-4.2, 5.2, 4]}
        intensity={2.2}
        color={'#fff1e0'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
        shadow-radius={6}
      />
      <directionalLight ref={rim} position={[4.5, 3, -4.5]} intensity={1.4} color={'#a8c4ff'} />
      <hemisphereLight ref={hemi} args={['#c9cede', '#101014', 0.25]} />
    </>
  );
}

export function Scene() {
  return (
    <>
      {/* transparent canvas — the CSS vignette + giant words show through behind the tiger */}
      <RoomEnv />
      <Lights />
      <ModelBoundary fallback={<FallbackTiger />}>
        <Suspense fallback={null}>
          <Tiger />
        </Suspense>
      </ModelBoundary>
      <ContactShadows position={[0, -1.35, 0]} scale={9} blur={2.6} opacity={0.55} far={4} resolution={1024} color="#000000" />
    </>
  );
}
