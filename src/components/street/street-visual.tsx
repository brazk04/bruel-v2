import Image from "next/image";
import type { StreetFrame } from "@/types/street-project";

export function StreetVisual({ frame, title, priority = false }: { frame: StreetFrame; title: string; priority?: boolean }) {
  return <div className={`street-visual street-visual-${frame.aspect} ${frame.src ? "street-visual-photo" : "street-visual-pending"}`}>
    {frame.src && <Image src={frame.src} alt={frame.alt} fill priority={priority} sizes="(max-width: 767px) 100vw, (max-width: 1440px) 90vw, 1500px" />}
    {!frame.src && <div className="street-visual-study" role="img" aria-label={frame.alt}><span className="street-visual-grid" aria-hidden="true" /><span className="street-visual-number" aria-hidden="true">B / R</span><strong>{title}</strong><small>{frame.label}</small></div>}
    <span className="street-visual-corner" aria-hidden="true">BRUEL / STREET</span>
  </div>;
}
