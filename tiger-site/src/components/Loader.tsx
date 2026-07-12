import { useEffect, useRef, useState } from 'react';

export function Loader({ done }: { done: boolean }) {
  const [n, setN] = useState(0);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0; const start = performance.now(); const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 2);
      setN(Math.round(eased * 100));
      if (bar.current) bar.current.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`loader${done ? ' done' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="word">THEWHITETIGER</div>
        <div className="count serif">{n}</div>
        <div className="bar"><i ref={bar} /></div>
      </div>
    </div>
  );
}
