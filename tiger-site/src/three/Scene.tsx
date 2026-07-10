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
      const target = 2.5 + tigerState.key * 0.32;
      key.current.intensity += (target - key.current.intensity) * k;
      tmp.copy(NEUTRAL).lerp(WARM, tigerState.keyWarm);
      key.current.color.lerp(tmp, k);
    }
  });
  return (
    <>
      {/* CINEMATIC KEY: a single strong warm raking light from high right that
          carves the stone and throws a long shadow — the drama light. */}
      <directionalLight
        ref={key}
        position={[7.5, 6, 2.5]}
        intensity={2.8}
        color={'#fff2e0'}
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
      {/* very low cool fill so the shadow side stays deep and moody (not black) */}
      <directionalLight position={[-7, 2, 3]} intensity={0.16} color={'#9fb6d8'} />
      {/* cool rim / kicker from high behind-left — a bright edge that separates
          the sculpture from the dark background for that cinematic silhouette. */}
      <directionalLight position={[-3, 7, -5]} intensity={1.15} color={'#dfeafd'} />
      {/* barely-there ambient so the darkest areas keep a hint of form */}
      <hemisphereLight args={['#8f97a6', '#0a0a0d', 0.12]} />
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
