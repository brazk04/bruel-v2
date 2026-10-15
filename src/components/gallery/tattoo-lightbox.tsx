"use client";

import { TattooLightboxMedia } from "@/components/gallery/tattoo-lightbox-media";
import type { TattooWork } from "@/types/tattoo-work";
import { useMediaLightbox } from "@/hooks/use-media-lightbox";

export function TattooLightbox({ work, position, total, onClose, onPrevious, onNext }: { work: TattooWork; position: number; total: number; onClose: () => void; onPrevious: () => void; onNext: () => void }) {
  const { dialogRef, closeRef } = useMediaLightbox({ onClose, onPrevious, onNext });

  return <dialog className="tattoo-lightbox-backdrop" ref={dialogRef} aria-labelledby="lightbox-title" aria-describedby="lightbox-description" onCancel={event => { event.preventDefault(); onClose(); }} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="tattoo-lightbox">
      <div className="lightbox-top"><span>TATTOO_RECORD / WORK_{work.id}</span><button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar visualização">FECHAR <small className="close-hint" aria-hidden="true">ESC</small><span aria-hidden="true">×</span></button></div>
      <div className="lightbox-body"><div className="lightbox-image"><TattooLightboxMedia key={work.id} work={work} /></div><div className="lightbox-info"><span className="lightbox-position">{String(position + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><div><span className="lightbox-category">{work.category}</span><h2 id="lightbox-title">{work.title}</h2><p id="lightbox-description">{work.description ?? "Fotografia e informações deste trabalho serão adicionadas ao portfólio."}</p><dl><div><dt>ESTILO</dt><dd>{work.style}</dd></div>{work.year && <div><dt>ANO</dt><dd>{work.year}</dd></div>}{work.location && <div><dt>LOCAL</dt><dd>{work.location}</dd></div>}</dl></div><div className="lightbox-controls"><button type="button" onClick={onPrevious} aria-label="Trabalho anterior">← <span>ANTERIOR</span></button><button type="button" onClick={onNext} aria-label="Próximo trabalho"><span>PRÓXIMO</span> →</button></div></div></div>
    </div>
  </dialog>;
}
