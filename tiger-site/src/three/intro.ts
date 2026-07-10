// Entrance choreography state — shared between the loader (App) and the R3F
// scene. keyMul scales the key light (0 → 1) so the sculpture emerges from
// darkness; camera eases from a slightly closer/lower start to shot 0.
// Defaults to keyMul 1 so that if the entrance never runs the scene stays lit.
export const intro = { started: false, startAt: 0, reduced: false, keyMul: 1 };

export const INTRO_MS = 1600;

export function beginIntro(reduced: boolean) {
  intro.reduced = reduced;
  intro.started = true;
  intro.startAt = performance.now();
  intro.keyMul = reduced ? 1 : 0; // reduced-motion: no darkness sweep, just a fade
}
