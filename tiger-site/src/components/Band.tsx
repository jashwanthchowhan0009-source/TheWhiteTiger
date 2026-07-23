import type { ReactNode } from 'react';

interface BandProps {
  id?: string;
  src: string;
  poster: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}

/** Full-width cinematic band — the video is fixed to the viewport and revealed
 *  through this section as you scroll (App wires an IntersectionObserver that
 *  toggles `.show` on `.band-fx`, so only the in-view band plays). */
export function Band({ id, src, poster, eyebrow, title, lead }: BandProps) {
  return (
    <section id={id} className="band">
      <div className="band-fx" aria-hidden="true">
        <video muted loop playsInline preload="none" poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <div className="wrap">
        <span className="eyebrow reveal">{eyebrow}</span>
        <h2 className="reveal" style={{ marginTop: 14 }}>{title}</h2>
        {lead && <p className="sec-lead reveal">{lead}</p>}
      </div>
    </section>
  );
}
