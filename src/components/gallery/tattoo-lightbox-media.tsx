"use client";

import { useState } from "react";
import { TattooVisual } from "@/components/gallery/tattoo-visual";
import type { TattooWork } from "@/types/tattoo-work";

export function TattooLightboxMedia({ work }: { work: TattooWork }) {
  const [showVideo, setShowVideo] = useState(false);
  return <div className="lightbox-media">
    {showVideo && work.video ? <video src={work.video} poster={work.image ?? undefined} controls autoPlay muted playsInline preload="none" aria-label={`Vídeo da tattoo ${work.title}`}>Seu navegador não suporta vídeo. <a href={work.video}>Abrir vídeo</a></video> : <TattooVisual work={work} large />}
    {work.video && <div className="lightbox-media-switch" role="group" aria-label="Formato do registro"><button type="button" aria-pressed={!showVideo} onClick={() => setShowVideo(false)}>FOTO</button><button type="button" aria-pressed={showVideo} onClick={() => setShowVideo(true)}>VÍDEO <span aria-hidden="true">▶</span></button></div>}
  </div>;
}
