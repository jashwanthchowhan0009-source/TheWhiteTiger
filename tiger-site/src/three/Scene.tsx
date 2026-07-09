import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnv } from './RoomEnv';
import { Water } from './Water';
import { Tiger } from './Tiger';
import { FallbackTiger } from './FallbackTiger';
import { ModelBoundary } from './ErrorBoundary';
import { tigerState } from '../scroll/tigerState';

const NEUTRAL = new THREE.Color('#fff3e6');
const WARM = new THREE.Color('#ffcf9a');

// Studio soft-box rig built from plain lights (every one of these renders on the
// devices that showed earlier versions fine): a warm KEY upper-right that casts
// the grounded shadow, a cool FILL from the left to open the shadow side, a top
// RIM to carve the edge, and a low hemisphere wrap. RoomEnvironment adds
// micro-specular life on the marble. Key intensity/warmth glide with scroll.
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
      <directionalLight position={[-7, 3, 3.5]} intensity={0.9} color={'#bcd6ff'} />
      {/* top rim / kicker from behind — separates the wet beast from the water */}
      <directionalLight position={[-1.5, 8, -5]} intensity={1.1} color={'#eaf3ff'} />
      {/* oceanic ambient wrap: cool sky, deep-blue bounce off the water */}
      <hemisphereLight args={['#83b0d8', '#06131f', 0.45]} />
    </>
  );
}

export function Scene() {
  return (
    <>
      {/* transparent canvas → the CSS studio backdrop shows through, the DOM copy
          is never hidden, and IBL comes from RoomEnvironment (offline, no CDN). */}
      <RoomEnv />
      <StudioLights />

      {/* the blue ocean the beast rises out of */}
      <ModelBoundary fallback={null}>
        <Water />
      </ModelBoundary>

      <ModelBoundary fallback={<FallbackTiger />}>
        <Suspense fallback={null}>
          <Tiger />
        </Suspense>
      </ModelBoundary>

      {/* soft dark grounding into the water so the beast doesn't look weightless */}
      <ContactShadows position={[0, -1.34, 0]} scale={16} blur={3.4} opacity={0.4} far={5} resolution={1024} color="#02060b" />
    </>
  );
}
