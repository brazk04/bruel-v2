import Image from "next/image";
import type { ArtistImage as ArtistImageData } from "@/data/artist";

export function ArtistImage({ image, priority = false }: { image: ArtistImageData; priority?: boolean }) {
  return <div className={`artist-image artist-image-${image.type} ${image.src ? "artist-image-photo" : "artist-image-pending"}`}>
    {image.src ? <Image src={image.src} alt={image.alt} fill priority={priority} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 55vw, 45vw" /> : <div className="artist-image-placeholder" role="img" aria-label={image.alt}><span className="artist-image-cross" aria-hidden="true">✳</span><strong aria-hidden="true">B.</strong><small>{image.label}</small></div>}
    {image.src && <span className="artist-image-label">{image.label}</span>}
  </div>;
}
