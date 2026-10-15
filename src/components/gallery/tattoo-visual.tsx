import Image from "next/image";
import type { TattooWork } from "@/types/tattoo-work";

const placeholderTextures = {
  ink: "/images/ink-study.webp",
  concrete: "/images/urban-texture.webp",
  charcoal: "/images/urban-texture.webp",
} as const;

export function TattooVisual({ work, large = false }: { work: TattooWork; large?: boolean }) {
  const sizes = large ? "(max-width: 767px) 100vw, 70vw" : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 55vw";

  return <div className={`tattoo-visual tattoo-visual-${work.aspectRatio} ${work.image ? "" : `tattoo-visual-placeholder tattoo-tone-${work.placeholderTone}`}`}>
    {work.image ? <Image src={work.image} alt={work.alt} fill sizes={sizes} loading={large ? "eager" : "lazy"} /> : <>
      <Image src={placeholderTextures[work.placeholderTone]} alt="" fill sizes={sizes} loading={large ? "eager" : "lazy"} />
      <div className="tattoo-placeholder" aria-hidden="true"><span>ARQUIVO / {work.id}</span><strong>{work.category}</strong><small>FOTOGRAFIA DO TRABALHO<br />EM BREVE</small></div>
    </>}
  </div>;
}
