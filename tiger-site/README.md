# THEWHITETIGER — Sculpture Scroll Site

A premium, award-site-style single page: a prowling **tiger carved from stone**
pinned in a fixed WebGL canvas that rotates, scales and travels as you scroll,
while giant serif typography moves around and behind it.

Built with **Vite + React + TypeScript**, **Three.js** via
`@react-three/fiber` + `@react-three/drei`, **GSAP + ScrollTrigger** for the
scroll choreography, and **Lenis** for smooth scrolling.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/  (static, deploy anywhere)
npm run preview
```

## Replace the tiger model

Drop **any** tiger `.glb` at:

```
public/models/tiger.glb
```

The app strips the model's own materials, applies the procedural stone material,
normalises its height to ~2.2 units and re-centres it — so any scale/orientation
works. If the model is a plain standing pose it's tilted ~-12° so it reads as
"descending toward the viewer".

- **Draco-compressed** models are supported (decoder is bundled at
  `public/draco/`).
- If `tiger.glb` is **missing or fails to load**, the site falls back to a
  procedurally-extruded stone tiger silhouette so the canvas is never blank.

Good CC0/CC-BY sources: [Sketchfab](https://sketchfab.com) (filter
Downloadable + CC0), [Poly Pizza](https://poly.pizza).

## Where things live

```
src/
  App.tsx                 # loader, fixed canvas stage, sections
  index.css               # design system (colors, type, layout, grain, loader)
  scroll/tigerState.ts    # shared sculpture state + per-section pose keyframes (SHOTS)
  lib/useScroll.ts        # Lenis ↔ ScrollTrigger + the master GSAP timeline
  three/
    Scene.tsx             # lights (driven by scroll state), env, contact shadows
    Tiger.tsx             # loads the GLB, applies stone, idle drift + mouse parallax
    FallbackTiger.tsx     # silhouette fallback
    stone.ts              # procedural granite normal/roughness maps + material
    RoomEnv.tsx           # offline image-based lighting
  components/
    Nav / Loader / Grain
    sections/             # Hero, Elegance, About, Gallery, Contact
```

## Tuning

- **Poses:** edit `SHOTS` in `src/scroll/tigerState.ts` — each section's
  rotation, x/y position, scale and per-light intensity/temperature.
- **Stone look:** `src/three/stone.ts` (color, roughness, normal strength) and
  exposure in `App.tsx`.
- **Lighting:** `src/three/Scene.tsx` (key / rim / fill positions & colors).

## Notes

- Respects `prefers-reduced-motion` (static hero, no scrub).
- Mobile keeps the tiger centred (no left/right travel), disables mouse parallax,
  and the gallery becomes a native horizontal scroll-snap row.
- Deploy to Vercel as a static build (`dist/`), framework preset **Vite**.

Made with stone & code.
