"use client";

import { useCallback, useState } from "react";
import { StreetVisual } from "@/components/street/street-visual";
import { useMediaLightbox } from "@/hooks/use-media-lightbox";
import type { StreetProject } from "@/types/street-project";

export function StreetMediaGallery({ project }: { project: StreetProject }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const previous = useCallback(() => setActive(index => index === null ? null : (index - 1 + project.images.length) % project.images.length), [project.images.length]);
  const next = useCallback(() => setActive(index => index === null ? null : (index + 1) % project.images.length), [project.images.length]);
  return <>
    <div className="street-detail-media"><div className="container-site"><span>VISUAL DOCUMENT / {project.id}</span><span>0{project.images.length} FRAMES</span></div>
      {project.images.map((frame, index) => <button key={frame.id} type="button" className={`street-detail-frame street-detail-frame-${frame.aspect}`} onClick={() => setActive(index)} aria-haspopup="dialog"><StreetVisual frame={frame} title={project.title} /><span className="street-detail-frame-caption"><span>0{index + 1} / 0{project.images.length}</span><span>{frame.label}</span><span>AMPLIAR ↗</span></span></button>)}
    </div>
    {active !== null && <StreetMediaLightbox project={project} active={active} onClose={close} onPrevious={previous} onNext={next} />}
  </>;
}

function StreetMediaLightbox({ project, active, onClose, onPrevious, onNext }: { project: StreetProject; active: number; onClose: () => void; onPrevious: () => void; onNext: () => void }) {
  const { dialogRef, closeRef } = useMediaLightbox({ onClose, onPrevious, onNext });
  const frame = project.images[active];
  return <dialog className="street-lightbox-backdrop" ref={dialogRef} aria-label={`${project.title}: ${frame.label}`} onCancel={event => { event.preventDefault(); onClose(); }} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="street-lightbox">
      <div className="street-lightbox-top"><span>BRUEL / STREET / {project.id}</span><button ref={closeRef} type="button" onClick={onClose}>FECHAR <span aria-hidden="true">×</span></button></div>
      <div className="street-lightbox-image"><StreetVisual frame={frame} title={project.title} /></div>
      <div className="street-lightbox-bottom"><span>0{active + 1} / 0{project.images.length} &nbsp; {frame.label}</span><div><button type="button" onClick={onPrevious} aria-label="Imagem anterior">← ANTERIOR</button><button type="button" onClick={onNext} aria-label="Próxima imagem">PRÓXIMA →</button></div></div>
    </div>
  </dialog>;
}
