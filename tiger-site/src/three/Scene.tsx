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
      {/* KEY: far right + up + slightly front → carves the form, deep shadow on the left */}
      <directionalLight
        ref={key}
        position={[6.5, 6.2, 3.2]}
        intensity={2.6}
        color={'#fff2e2'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={24}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
        shadow-radius={7}
      />
      {/* faint cool edge on the shadow (left/back) side so it isn't pure black */}
      <directionalLight ref={rim} position={[-4.5, 2.5, -3.5]} intensity={0.6} color={'#9fb2e6'} />
      <hemisphereLight ref={hemi} args={['#aab3c6', '#0a0a0e', 0.12]} />
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
