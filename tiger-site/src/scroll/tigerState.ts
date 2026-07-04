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
  rotY: 0.14,
  posX: 0,
  posY: -0.4,
  scale: 1.32,
  key: 2.2,
  fill: 0.25,
  rim: 1.4,
  keyWarm: 0,
};

// Cinematic character beats (NOT a 360° spin): a prowl toward you, then a tight
// zoom to the EYES, the SIDE PROFILE, the CLAWS, and a final dramatic FACE.
// Tight crops on purpose — the weak full-body wide shot is avoided.
export const SHOTS = {
  // hero — front prowl, head & shoulders, facing you (character)
  hero:     { rotY: 0.14,  posX: 0.0,  posY: -0.40, scale: 1.32, key: 2.2, fill: 0.26, rim: 1.5, keyWarm: 0.05 },
  // I · The Gaze — the FACE / eyes, tiger right, text left
  elegance: { rotY: -0.13, posX: 0.95, posY: -1.30, scale: 1.80, key: 2.5, fill: 0.20, rim: 1.7, keyWarm: 0.5 },
  // II · The Form — SIDE PROFILE, head left, text right
  about:    { rotY: -1.50, posX: 2.00, posY: -0.75, scale: 2.40, key: 2.3, fill: 0.24, rim: 1.7, keyWarm: 0.3 },
  // III · The Edge — the CLAWS / front paws, tiger right, text left
  gallery:  { rotY: 0.15,  posX: 1.10, posY: 1.35, scale: 2.30, key: 2.1, fill: 0.28, rim: 1.5, keyWarm: 0.15 },
  // IV · The Reveal — dramatic FACE head-on, single hard key
  contact:  { rotY: 0.0,   posX: 0.0,  posY: -1.35, scale: 2.00, key: 2.8, fill: 0.06, rim: 1.2, keyWarm: 0.35 },
};

// Debug: ?pose=elegance&scale=2.6&posY=-1.9 freezes a single shot for tuning.
export function debugPose(): Partial<TigerState> | null {
  if (typeof window === 'undefined') return null;
  const q = new URLSearchParams(window.location.search);
  const name = q.get('pose');
  if (!name) return null;
  const base = (SHOTS as Record<string, TigerState>)[name] ?? SHOTS.hero;
  const out: TigerState = { ...base };
  (['rotY', 'posX', 'posY', 'scale', 'key', 'fill', 'rim', 'keyWarm'] as const).forEach((k) => {
    const v = q.get(k); if (v !== null) out[k] = parseFloat(v);
  });
  return out;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
