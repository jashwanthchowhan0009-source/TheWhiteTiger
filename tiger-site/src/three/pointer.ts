// Global pointer state for the tiger's Gaze — normalised (-1..1) for head
// tracking, plus raw pixel coords for the eye-glint proximity test.
export const pointer = { x: 0, y: 0, px: -9999, py: -9999, active: false };

export const isTouch =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.px = e.clientX;
      pointer.py = e.clientY;
      if (e.pointerType !== 'touch') pointer.active = true;
    },
    { passive: true }
  );
  window.addEventListener('pointerleave', () => { pointer.active = false; }, { passive: true });
}
