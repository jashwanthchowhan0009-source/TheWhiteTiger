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
  rotY: 0.2,
  posX: 1.85,
  posY: -0.32,
  scale: 1.14,
  key: 2.5,
  fill: 0.12,
  rim: 0.18,
  keyWarm: 0.05,
};

// Cinematic character beats (NOT a 360° spin): a prowl toward you, then a tight
// zoom to the EYES, the SIDE PROFILE, the CLAWS, and a final dramatic FACE.
// Tight crops on purpose — the weak full-body wide shot is avoided.
export const SHOTS = {
  // hero — prowl, held well to the RIGHT so the headline stays clean on the left
  hero:     { rotY: 0.2,   posX: 1.85, posY: -0.32, scale: 1.14, key: 2.5, fill: 0.12, rim: 0.18, keyWarm: 0.05 },
  // I · The Gaze — the FACE / eyes, tiger right, text left
  elegance: { rotY: -0.1,  posX: 1.55, posY: -1.12, scale: 1.5,  key: 2.7, fill: 0.10, rim: 0.2, keyWarm: 0.22 },
  // II · The Form — SIDE PROFILE, head left, text right
  about:    { rotY: -1.52, posX: 2.05, posY: -0.62, scale: 1.92, key: 2.6, fill: 0.12, rim: 0.2, keyWarm: 0.14 },
  // III · The Edge — the CLAWS / front paws, tiger right, text left
  gallery:  { rotY: 0.14,  posX: 1.35, posY: 1.05,  scale: 1.9,  key: 2.5, fill: 0.13, rim: 0.18, keyWarm: 0.1 },
  // IV · The Reveal — dramatic FACE, tiger slightly right, warm key
  contact:  { rotY: 0.02,  posX: 0.7,  posY: -1.12, scale: 1.78, key: 2.9, fill: 0.05, rim: 0.15, keyWarm: 0.24 },
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
