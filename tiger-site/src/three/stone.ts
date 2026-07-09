import * as THREE from 'three';

// ── Procedural granite maps ──────────────────────────────────────────────
// We generate a tiling normal map + roughness map from fractal noise on a
// canvas so the stone has micro surface life without shipping texture files.

function fbm(x: number, y: number, seed: number): number {
  // cheap value-noise fractal — deterministic, no deps
  let v = 0, amp = 0.5, freq = 1;
  for (let o = 0; o < 5; o++) {
    const sx = x * freq, sy = y * freq;
    const ix = Math.floor(sx), iy = Math.floor(sy);
    const fx = sx - ix, fy = sy - iy;
    const h = (X: number, Y: number) => {
      const n = Math.sin((X * 127.1 + Y * 311.7 + seed) * 43758.5453);
      return n - Math.floor(n);
    };
    const u = fx * fx * (3 - 2 * fx), w = fy * fy * (3 - 2 * fy);
    const a = h(ix, iy), b = h(ix + 1, iy), c = h(ix, iy + 1), d = h(ix + 1, iy + 1);
    v += amp * (a + (b - a) * u + (c - a) * w + (a - b - c + d) * u * w);
    amp *= 0.5; freq *= 2.07;
  }
  return v;
}

function heightCanvas(size = 512): Float32Array {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * 8, ny = (y / size) * 8;
      // granite = broad blotches + fine speckle
      let v = fbm(nx, ny, 11) * 0.7 + fbm(nx * 3.3, ny * 3.3, 71) * 0.3;
      // a few darker mineral veins
      const vein = Math.abs(Math.sin(nx * 1.7 + fbm(nx, ny, 5) * 3));
      v = v * 0.9 + (vein < 0.06 ? -0.25 : 0);
      h[y * size + x] = v;
    }
  }
  return h;
}

export function makeStoneMaps(size = 512): { normal: THREE.Texture; rough: THREE.Texture; color: THREE.Texture } {
  const h = heightCanvas(size);
  const idx = (x: number, y: number) => ((y + size) % size) * size + ((x + size) % size);

  // ── albedo / colour map: weathered granite — grey base with warm & cool
  // mineral blotches and dark speckle, so the stone reads rough and real ──
  const cCanvas = document.createElement('canvas'); cCanvas.width = cCanvas.height = size;
  const cctx = cCanvas.getContext('2d')!; const cImg = cctx.createImageData(size, size);
  // neutral / cool GREY granite palette — a carved-statue stone, no cream
  const GREY = [0x77, 0x79, 0x7c], LIGHT = [0x8f, 0x91, 0x95], COOL = [0x66, 0x6a, 0x70], VEIN = [0x3a, 0x3b, 0x3f];
  const mix = (a: number[], b: number[], t: number) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * 8, ny = (y / size) * 8;
      const lightBlotch = fbm(nx * 0.9 + 3, ny * 0.9 + 3, 23);
      const cool = fbm(nx * 1.4 + 9, ny * 1.4 + 9, 51);
      const speck = fbm(nx * 9, ny * 9, 88);
      let col = mix(GREY, LIGHT, Math.max(0, lightBlotch - 0.45) * 1.5);
      col = mix(col, COOL, Math.max(0, cool - 0.5) * 1.6);
      if (speck > 0.78) col = mix(col, VEIN, (speck - 0.78) * 3.4);       // dark grains
      if (speck < 0.16) col = mix(col, [0xa6, 0xa8, 0xac], (0.16 - speck) * 2); // pale flecks
      const i = (y * size + x) * 4;
      cImg.data[i] = col[0]; cImg.data[i + 1] = col[1]; cImg.data[i + 2] = col[2]; cImg.data[i + 3] = 255;
    }
  }
  cctx.putImageData(cImg, 0, 0);
  const color = new THREE.CanvasTexture(cCanvas);
  color.colorSpace = THREE.SRGBColorSpace;
  color.wrapS = color.wrapT = THREE.RepeatWrapping; color.repeat.set(3, 3); color.anisotropy = 4;

  // Normal map from height gradient
  const nCanvas = document.createElement('canvas'); nCanvas.width = nCanvas.height = size;
  const nctx = nCanvas.getContext('2d')!; const nImg = nctx.createImageData(size, size);
  // Roughness map from height (rougher in the pits)
  const rCanvas = document.createElement('canvas'); rCanvas.width = rCanvas.height = size;
  const rctx = rCanvas.getContext('2d')!; const rImg = rctx.createImageData(size, size);

  const strength = 2.2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (h[idx(x + 1, y)] - h[idx(x - 1, y)]) * strength;
      const dy = (h[idx(x, y + 1)] - h[idx(x, y - 1)]) * strength;
      const nz = 1;
      const len = Math.hypot(dx, dy, nz);
      const i = (y * size + x) * 4;
      nImg.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      nImg.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      nImg.data[i + 2] = (nz / len) * 0.5 * 255 + 128;
      nImg.data[i + 3] = 255;

      const rv = 0.5 + h[idx(x, y)] * 0.42; // 0.5..~0.9
      const rc = Math.max(0, Math.min(255, rv * 255));
      rImg.data[i] = rImg.data[i + 1] = rImg.data[i + 2] = rc; rImg.data[i + 3] = 255;
    }
  }
  nctx.putImageData(nImg, 0, 0);
  rctx.putImageData(rImg, 0, 0);

  const normal = new THREE.CanvasTexture(nCanvas);
  const rough = new THREE.CanvasTexture(rCanvas);
  for (const t of [normal, rough]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 6);
    t.anisotropy = 4;
  }
  return { normal, rough, color };
}

// cached surface maps (generated once)
let _maps: { normal: THREE.Texture; rough: THREE.Texture } | null = null;
function surfaceMaps() {
  if (!_maps) { const m = makeStoneMaps(); _maps = { normal: m.normal, rough: m.rough }; }
  return _maps;
}

// WHITE-TIGER stone: keep the model's own stripe markings (white body, dark
// stripes) so it reads as a white tiger carved in pale stone — not a blank blob.
export function makeWhiteTigerMaterial(baseMap: THREE.Texture | null): THREE.MeshStandardMaterial {
  const { normal, rough } = surfaceMaps();
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    map: baseMap || null,
    roughness: 0.66,
    metalness: 0.0,
    envMapIntensity: 0.28,
    normalMap: normal,
    normalScale: new THREE.Vector2(0.7, 0.7),
    roughnessMap: rough,
  });
  // remap the model's texture luminance → dark charcoal stripes over warm ivory
  mat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>',
      `#include <map_fragment>
       float _l = dot(diffuseColor.rgb, vec3(0.299,0.587,0.114));
       _l = smoothstep(0.10, 0.80, _l);
       diffuseColor.rgb = mix(vec3(0.085,0.085,0.095), vec3(0.94,0.92,0.88), _l);`);
  };
  mat.needsUpdate = true;
  return mat;
}

// Pitch-black, wet-looking beast: a near-black obsidian/scale surface with a
// glossy sheen so studio + water light glints off it, as if it just rose out of
// the ocean. The colour map stays for micro tonal life; the dark base colour
// multiplies it down to near-black. Stronger normals read as scales/skin.
export function makeStoneMaterial(): THREE.MeshStandardMaterial {
  const { normal, rough, color } = makeStoneMaps();
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0c0e13'),   // blue-black; multiplies the map down to pitch dark
    map: color,
    roughness: 0.3,                       // wet sheen — light glints across the surface
    metalness: 0.22,                      // slight metallic wetness for reflections
    envMapIntensity: 1.35,                // catch the sky / water reflections
    normalMap: normal,
    normalScale: new THREE.Vector2(1.15, 1.15), // pronounced scale/skin relief
    roughnessMap: rough,
  });
  return mat;
}
