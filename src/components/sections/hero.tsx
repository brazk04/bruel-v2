import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { SkullSmokeBackground } from "@/components/animations/skull-smoke-background";
import { FloatingArtFilm } from "@/components/film/floating-art-film";
import { ContactChoiceTrigger } from "@/components/contact/contact-choice";
import { existsSync } from "node:fs";
import path from "node:path";

export function Hero() {
  return <section className="home-hero" aria-labelledby="hero-title"><Container className="hero-layout">
    <div className="hero-copy">
      <Eyebrow>BRUEL / TATTOO + GRAFFITI <span className="hero-signal">VISUAL_ARCHIVE</span></Eyebrow>
      <h1 id="hero-title"><span className="hero-title-line"><span>Arte que nasce</span></span><span className="hero-title-line"><span>da <em>rua.</em></span></span><span className="hero-title-line"><span>Vive na <em>pele.</em></span></span></h1>
      <p>Tatuagem, graffiti e arte urbana com identidade, peso e presença.</p>
      <div className="hero-actions"><Link href="/trabalhos" className="button button-primary">VER TRABALHOS <span aria-hidden="true">↗</span></Link><ContactChoiceTrigger className="button button-ghost">AGENDAR SESSÃO <span aria-hidden="true">↗</span></ContactChoiceTrigger></div>
      <div className="hero-bottom-line"><span>RIO VERDE / GO — BRASIL</span><a href="#manifesto">DESÇA PARA EXPLORAR <span aria-hidden="true">↓</span></a></div>
    </div>
    <div className="hero-visual"><Image src="/images/urban-texture.webp" alt="Estudo visual abstrato de concreto urbano, papel e tinta oxidada" fill priority sizes="(max-width: 767px) 100vw, 48vw" className="hero-image" /><SkullSmokeBackground /><div className="hero-image-vignette" /><span className="hero-visual-label">RIO VERDE_GO / PELE & PAREDE</span><span className="hero-visual-mark" aria-hidden="true">BRUEL<span>.</span></span><span className="hero-visual-index">ARQUIVO / 01</span><FloatingArtFilm src={existsSync(path.join(process.cwd(), "public/videos/bruel-loop.mp4")) ? "/videos/bruel-loop.mp4" : undefined} /></div>
  </Container></section>;
}
