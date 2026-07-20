import { useEffect, useRef } from 'react';

type Mode = 'field' | 'core' | 'graph';

interface Node { x: number; y: number; vx: number; vy: number; r: number; hub?: boolean }

const COLORS = ['rgba(200,224,255,', 'rgba(55,224,255,', 'rgba(122,140,255,'];

/**
 * Ambient particle network on a 2D canvas (no WebGL — safe on every browser).
 *  - field: full-bleed drifting network, cursor-reactive (hero)
 *  - core:  particles orbit + stream toward a central AI core
 *  - graph: denser clustered knowledge-graph with brighter hubs
 */
export function NodeField({ mode = 'field', density = 1 }: { mode?: Mode; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, raf = 0, running = true;
    const mouse = { x: -9999, y: -9999, active: false };
    let nodes: Node[] = [];

    const count = () => {
      const base = mode === 'field' ? 0.00012 : mode === 'graph' ? 0.00018 : 0.00014;
      return Math.max(26, Math.min(120, Math.floor(W * H * base * density)));
    };

    const build = () => {
      const n = count();
      nodes = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.8,
        hub: mode === 'graph' && i % 6 === 0,
      }));
    };

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const linkDist = mode === 'graph' ? 120 : 108;

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.5, cy = H * (mode === 'field' ? 0.46 : 0.5);

      // central glow for core/graph
      if (mode !== 'field') {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.5);
        g.addColorStop(0, 'rgba(46,107,255,0.22)');
        g.addColorStop(1, 'rgba(5,7,14,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }

      for (const nd of nodes) {
        if (mode === 'core') {
          // gentle inward pull toward core + swirl
          const dx = cx - nd.x, dy = cy - nd.y, d = Math.hypot(dx, dy) || 1;
          nd.vx += (dx / d) * 0.006 - (dy / d) * 0.004;
          nd.vy += (dy / d) * 0.006 + (dx / d) * 0.004;
          if (d < 40) { nd.x = Math.random() * W; nd.y = Math.random() * H; nd.vx = nd.vy = 0; }
        }
        if (mouse.active) {
          const dxm = mouse.x - nd.x, dym = mouse.y - nd.y, dm = Math.hypot(dxm, dym);
          if (dm < 150) { nd.vx += (dxm / dm) * 0.035; nd.vy += (dym / dm) * 0.035; }
        }
        nd.vx *= 0.98; nd.vy *= 0.98;
        nd.x += nd.vx; nd.y += nd.vy;
        if (nd.x < 0 || nd.x > W) nd.vx *= -1;
        if (nd.y < 0 || nd.y > H) nd.vy *= -1;
        nd.x = Math.max(0, Math.min(W, nd.x));
        nd.y = Math.max(0, Math.min(H, nd.y));
      }

      // links
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const o = (1 - d / linkDist) * (mode === 'graph' ? 0.28 : 0.2);
            ctx.strokeStyle = `rgba(91,157,255,${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y); ctx.stroke();
          }
        }
      }
      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const nd = nodes[i];
        const c = COLORS[i % COLORS.length];
        const rr = nd.hub ? nd.r + 2 : nd.r;
        if (nd.hub) {
          ctx.beginPath(); ctx.arc(nd.x, nd.y, rr + 4, 0, 6.283);
          ctx.fillStyle = 'rgba(55,224,255,0.10)'; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(nd.x, nd.y, rr, 0, 6.283);
        ctx.fillStyle = c + (nd.hub ? '1)' : '0.85)'); ctx.fill();
      }

      if (running && !reduce) raf = requestAnimationFrame(step);
    };

    size();
    step();
    if (reduce) cancelAnimationFrame(raf);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    let t: number;
    const onResize = () => { clearTimeout(t); t = window.setTimeout(size, 160); };

    // drive cursor from the whole window so the hero reacts even over text
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(([en]) => {
      running = en.isIntersecting;
      if (running && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
      else cancelAnimationFrame(raf);
    }, { threshold: 0 });
    io.observe(canvas);

    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, [mode, density]);

  return <canvas ref={ref} aria-hidden="true" />;
}
