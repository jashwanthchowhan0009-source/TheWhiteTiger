// Single source of truth for the sculpture, mutated by the GSAP scroll timeline
// and read every frame by the R3F scene. Keeping it outside React avoids
// re-renders on scroll (60fps mutations stay in the render loop).
export type TigerState = {
  rotY: number;   // Y rotation (radians)
  posX: number;   // world X offset
  posY: number;   // world Y offset
  scale: number;  // uniform scale multiplier
  key: number;    // key light intensity
  fill: number;   // fill/ambient intensity
  rim: number;    // rim light intensity
  keyWarm: number; // 0 = neutral key, 1 = warm amber key
};

export const tigerState: TigerState = {
  rotY: 0,
  posX: 0,
  posY: -0.1,
  scale: 1,
  key: 2.2,
  fill: 0.25,
  rim: 1.4,
  keyWarm: 0,
};

// Section keyframes the timeline tweens through (front → side → rear → front → face).
export const SHOTS = {
  hero:     { rotY: 0,                posX: 0,    posY: -0.1, scale: 1.0,  key: 2.2, fill: 0.25, rim: 1.4, keyWarm: 0.0 },
  elegance: { rotY: Math.PI * 0.5,    posX: 1.7,  posY: 0.0,  scale: 1.05, key: 2.5, fill: 0.22, rim: 1.6, keyWarm: 0.6 },
  about:    { rotY: Math.PI * 1.25,   posX: -1.7, posY: 0.0,  scale: 0.82, key: 2.0, fill: 0.28, rim: 1.3, keyWarm: 0.25 },
  gallery:  { rotY: Math.PI * 2.0,    posX: 0,    posY: -0.45,scale: 0.68, key: 2.0, fill: 0.30, rim: 1.2, keyWarm: 0.1 },
  contact:  { rotY: Math.PI * 2.0,    posX: 0,    posY: -1.45,scale: 1.85, key: 2.7, fill: 0.05, rim: 1.0, keyWarm: 0.35 },
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
