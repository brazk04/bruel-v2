import { TattooVisual } from "@/components/gallery/tattoo-visual";
import type { TattooWork } from "@/types/tattoo-work";

export function TattooCard({ work, index, onOpen }: { work: TattooWork; index: number; onOpen: () => void }) {
  return <button className={`tattoo-card ${work.featured ? "tattoo-card-featured" : ""}`} type="button" onClick={onOpen} aria-haspopup="dialog" style={{ animationDelay: `${Math.min(index, 5) * 55}ms` }}>
    <div className="tattoo-card-media"><TattooVisual work={work} />{work.video && <span className="tattoo-card-video">▶ FOTO + VÍDEO</span>}<span className="tattoo-card-open">VER REGISTRO <span aria-hidden="true">↗</span></span></div>
    <div className="tattoo-card-caption"><div><span>WORK / {work.id}</span><h3>{work.title}</h3></div><span>{work.category}</span></div>
  </button>;
}
