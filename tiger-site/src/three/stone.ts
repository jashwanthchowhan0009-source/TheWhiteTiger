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

export function makeStoneMaps(size = 512): { normal: THREE.Texture; rough: THREE.Texture } {
  const h = heightCanvas(size);
  const idx = (x: number, y: number) => ((y + size) % size) * size + ((x + size) % size);

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
  return { normal, rough };
}

// A single weathered-granite material reused across every mesh of the tiger.
export function makeStoneMaterial(): THREE.MeshStandardMaterial {
  const { normal, rough } = makeStoneMaps();
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9b958c'),
    roughness: 0.68,
    metalness: 0.0,
    envMapIntensity: 0.42,
    normalMap: normal,
    normalScale: new THREE.Vector2(0.9, 0.9),
    roughnessMap: rough,
  });
  // faint surviving stripes: a soft directional band along the body axis, mixed
  // into the albedo at low strength so the tiger's markings ghost through stone.
  mat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
       float band = sin(vViewPosition.y * 6.0 + vViewPosition.x * 2.0);
       band = smoothstep(0.72, 1.0, abs(band));
       diffuseColor.rgb *= (1.0 - 0.12 * band);`
    );
  };
  return mat;
}
