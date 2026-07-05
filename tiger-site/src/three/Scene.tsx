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
      {/* barely-there edge on the shadow side so it isn't pure black */}
      <directionalLight ref={rim} position={[-4.5, 2.5, -3.5]} intensity={0.18} color={'#9fb2e6'} />
      <hemisphereLight ref={hemi} args={['#9aa3b6', '#08080b', 0.08]} />
    </>
  );
}

export function Scene() {
  return (
    <>
      {/* transparent canvas — the CSS vignette shows through behind the tiger */}
      <RoomEnv />
      <Lights />
      <ModelBoundary fallback={<FallbackTiger />}>
        <Suspense fallback={null}>
          <Tiger />
        </Suspense>
      </ModelBoundary>
      {/* real cast shadow from the single key light, thrown onto a floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <shadowMaterial transparent opacity={0.6} />
      </mesh>
      {/* faint back wall to catch a subtle projected silhouette */}
      <mesh position={[0, 1.2, -3.4]} receiveShadow>
        <planeGeometry args={[30, 18]} />
        <shadowMaterial transparent opacity={0.42} />
      </mesh>
      <ContactShadows position={[0, -1.4, 0]} scale={10} blur={3} opacity={0.4} far={4} resolution={1024} color="#000000" />
    </>
  );
}
