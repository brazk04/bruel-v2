"use client";

import { useCallback, useState } from "react";
import { ContactChoiceTrigger } from "@/components/contact/contact-choice";
import { Container } from "@/components/ui/container";
import { TattooCard } from "@/components/gallery/tattoo-card";
import { TattooFilters } from "@/components/gallery/tattoo-filters";
import { TattooLightbox } from "@/components/gallery/tattoo-lightbox";
import type { TattooCategory, TattooWork } from "@/types/tattoo-work";

export function TattooGallery({ works }: { works: TattooWork[] }) {
  const [activeCategory, setActiveCategory] = useState<TattooCategory | "Todos">("Todos");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleWorks = activeCategory === "Todos" ? works : works.filter(work => work.category === activeCategory);
  const selectedWork = activeIndex === null ? null : visibleWorks[activeIndex];
  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => setActiveIndex(index => index === null ? null : (index - 1 + visibleWorks.length) % visibleWorks.length), [visibleWorks.length]);
  const next = useCallback(() => setActiveIndex(index => index === null ? null : (index + 1) % visibleWorks.length), [visibleWorks.length]);

  return <section className="tattoo-gallery-section" aria-label="Galeria de tattoos"><Container>
    <h2 className="sr-only">Galeria de tattoos</h2>
    <div className="gallery-toolbar"><TattooFilters active={activeCategory} onChange={category => { setActiveCategory(category); setActiveIndex(null); }} /><span className="gallery-count" aria-live="polite">{String(visibleWorks.length).padStart(2, "0")} / REGISTROS</span></div>
    <div className="gallery-disclosure"><span>ARQUIVO REAL / FOTOS, DETALHES & VÍDEOS</span><span>ARRASTE A LISTA DE FILTROS →</span></div>
    <div className="tattoo-grid" key={activeCategory}>{visibleWorks.map((work, index) => <TattooCard key={work.id} work={work} index={index} onOpen={() => setActiveIndex(index)} />)}</div>
    <div className="gallery-endnote"><span>TEM UMA IDEIA EM MENTE?</span><ContactChoiceTrigger>COMEÇAR UM PROJETO <span aria-hidden="true">↗</span></ContactChoiceTrigger></div>
  </Container>{selectedWork && activeIndex !== null && <TattooLightbox work={selectedWork} position={activeIndex} total={visibleWorks.length} onClose={close} onPrevious={previous} onNext={next} />}</section>;
}
