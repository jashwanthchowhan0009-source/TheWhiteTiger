import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Backdrop } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnv } from './RoomEnv';
import { Tiger } from './Tiger';
import { FallbackTiger } from './FallbackTiger';
import { ModelBoundary } from './ErrorBoundary';
import { tigerState } from '../scroll/tigerState';

const NEUTRAL = new THREE.Color('#fff3e6');
const WARM = new THREE.Color('#ffcf9a');

// Studio soft-box rig built from plain lights (maximum GPU compatibility):
// a warm KEY upper-right that casts the grounded shadow, a cool FILL from the
// left to open the shadow side, a top RIM/kicker to carve the edge, and a low
// hemisphere for ambient wrap. RoomEnvironment adds micro-specular life on the
// polished marble. Key intensity/warmth glide gently with scroll for mood.
function StudioLights() {
  const key = useRef<THREE.DirectionalLight>(null!);
  const tmp = new THREE.Color();
  useFrame((_, dt) => {
    const k = Math.min(1, dt * 2.4);
    if (key.current) {
      const target = 1.9 + tigerState.key * 0.24;
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
      <directionalLight position={[-7, 3, 3.5]} intensity={0.75} color={'#cfe0ff'} />
      {/* top rim / kicker from behind — separates the sculpture from the backdrop */}
      <directionalLight position={[-1.5, 8, -5]} intensity={0.9} color={'#ffffff'} />
      {/* gentle ambient wrap so nothing is ever pure black */}
      <hemisphereLight args={['#c7ccd6', '#141416', 0.35]} />
    </>
  );
}

// The studio cyclorama is the one "new" component — keep it isolated so, if a
// device can't build it, the page still shows the fully-lit tiger (never blank).
function Cyclorama() {
  return (
    <ModelBoundary fallback={null}>
      <Suspense fallback={null}>
        <Backdrop floor={0.75} segments={40} scale={[42, 18, 10]} position={[0, -1.55, -5]} receiveShadow>
          <meshStandardMaterial color="#24252a" roughness={0.94} metalness={0} envMapIntensity={0.5} />
        </Backdrop>
      </Suspense>
    </ModelBoundary>
  );
}

export function Scene() {
  return (
    <>
      {/* transparent canvas → the CSS studio backdrop shows through if WebGL is
          slow, and the DOM copy is never hidden. IBL from RoomEnvironment. */}
      <RoomEnv />
      <StudioLights />
      <Cyclorama />

      <ModelBoundary fallback={<FallbackTiger />}>
        <Suspense fallback={null}>
          <Tiger />
        </Suspense>
      </ModelBoundary>

      {/* soft grounded contact shadow directly under the paws */}
      <ContactShadows position={[0, -1.5, 0]} scale={14} blur={3.2} opacity={0.5} far={5} resolution={1024} color="#0a0a0c" />
    </>
  );
}
