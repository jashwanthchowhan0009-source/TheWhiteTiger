import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Studio } from './Studio';
import { Tiger } from './Tiger';
import { FallbackTiger } from './FallbackTiger';
import { ModelBoundary } from './ErrorBoundary';
import { tigerState } from '../scroll/tigerState';

const NEUTRAL = new THREE.Color('#fff3e6');
const WARM = new THREE.Color('#ffcf9a');

// The studio does the heavy lifting (soft-box IBL). On top we add ONE crisp
// directional "key" that gives the sculpture a defined form + casts the real
// grounded shadow onto the cyclorama. Its intensity/warmth glide with scroll so
// each beat has a subtle mood shift without ever leaving the studio look.
function KeyLight() {
  const key = useRef<THREE.DirectionalLight>(null!);
  const tmp = new THREE.Color();
  useFrame((_, dt) => {
    const k = Math.min(1, dt * 2.4);
    if (key.current) {
      // base ~1.6, gently modulated by the scroll state's key value
      const target = 1.35 + tigerState.key * 0.28;
      key.current.intensity += (target - key.current.intensity) * k;
      tmp.copy(NEUTRAL).lerp(WARM, tigerState.keyWarm);
      key.current.color.lerp(tmp, k);
    }
  });
  return (
    <directionalLight
      ref={key}
      position={[6.5, 7, 4]}
      intensity={1.7}
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
      shadow-radius={12}
      shadow-blurSamples={24}
    />
  );
}

export function Scene() {
  return (
    <>
      {/* neutral studio grey behind the cyclorama (never pure black) */}
      <color attach="background" args={['#191a1d']} />
      <fog attach="fog" args={['#191a1d', 12, 26]} />

      <Studio />
      <KeyLight />

      <ModelBoundary fallback={<FallbackTiger />}>
        <Suspense fallback={null}>
          <Tiger />
        </Suspense>
      </ModelBoundary>

      {/* soft grounded contact shadow directly under the paws */}
      <ContactShadows
        position={[0, -1.5, 0]}
        scale={14}
        blur={3.2}
        opacity={0.55}
        far={5}
        resolution={1024}
        color="#0a0a0c"
      />
    </>
  );
}
