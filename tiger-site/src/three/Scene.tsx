import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnv } from './RoomEnv';
import { Tiger } from './Tiger';
import { FallbackTiger } from './FallbackTiger';
import { ModelBoundary } from './ErrorBoundary';
import { tigerState } from '../scroll/tigerState';

const NEUTRAL = new THREE.Color('#fff3e6');
const WARM = new THREE.Color('#ffcf9a');

// Studio soft-box rig from plain lights (renders everywhere): a warm KEY
// upper-right that casts the grounded shadow, a cool FILL from the left, a top
// RIM to carve the edge, and a low hemisphere wrap. Key glides with scroll.
function StudioLights() {
  const key = useRef<THREE.DirectionalLight>(null!);
  const tmp = new THREE.Color();
  useFrame((_, dt) => {
    const k = Math.min(1, dt * 2.4);
    if (key.current) {
      const target = 1.35 + tigerState.key * 0.16;
      key.current.intensity += (target - key.current.intensity) * k;
      tmp.copy(NEUTRAL).lerp(WARM, tigerState.keyWarm);
      key.current.color.lerp(tmp, k);
    }
  });
  return (
    <>
      <directionalLight
        ref={key}
        position={[6.5, 7, 4]}
        intensity={2.2}
        color={'#fff3e6'}
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
        shadow-radius={9}
      />
      {/* cool soft fill from the left — opens the shadow side without flattening */}
      <directionalLight position={[-7, 3, 3.5]} intensity={0.68} color={'#dfe8f5'} />
      {/* top rim / kicker from behind — separates the sculpture from the backdrop */}
      <directionalLight position={[-1.5, 8, -5]} intensity={0.85} color={'#ffffff'} />
      {/* gentle ambient wrap so nothing is ever pure black */}
      <hemisphereLight args={['#c2c6cd', '#141416', 0.32]} />
    </>
  );
}

export function Scene() {
  return (
    <>
      <RoomEnv />
      <StudioLights />

      <ModelBoundary fallback={<FallbackTiger />}>
        <Suspense fallback={null}>
          <Tiger />
        </Suspense>
      </ModelBoundary>

      {/* invisible floor that only catches the key light's shadow → grounds the
          sculpture in the studio without drawing a visible plane. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial transparent opacity={0.45} />
      </mesh>

      {/* soft grounded contact shadow directly under the paws */}
      <ContactShadows position={[0, -1.5, 0]} scale={14} blur={3.2} opacity={0.5} far={5} resolution={1024} color="#0a0a0c" />
    </>
  );
}
