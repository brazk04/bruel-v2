import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

const works = [
  { number: "01", name: "TATTOO", note: "CORPO / IDENTIDADE", image: "/images/portfolio/tattoo-oriental.webp", alt: "Tattoo oriental em preto e cinza no antebraço", className: "work-tattoo", href: "/trabalhos" },
  { number: "02", name: "ARTE URBANA", note: "CIDADE / PRESENÇA", image: "/images/portfolio/graffiti-personagem.webp", alt: "Graffiti de personagem em vermelho e laranja em um muro", className: "work-street", href: "/street" },
  { number: "03", name: "PROCESSO", note: "ESTÚDIO / BASTIDORES", image: "/images/portfolio/artista-trabalhando.webp", alt: "Bruel trabalhando em uma tattoo no estúdio", className: "work-drawings", href: "/sobre" },
  { number: "04", name: "AUTORAL", note: "TRAÇO / EXPERIMENTO", image: "/images/portfolio/tattoo-floral.webp", alt: "Composição floral tatuada na coxa", className: "work-authorial", href: "/trabalhos" },
] as const;

export function WorkPreview() {
  return <section className="works-section" id="trabalhos" aria-labelledby="works-title"><Container>
    <div className="section-topline"><Eyebrow>02 / UNIVERSO VISUAL</Eyebrow><span>SELEÇÃO DE LINGUAGENS</span></div>
    <div className="works-heading"><h2 id="works-title">Marcas que <em>ficam.</em></h2><p>Do desenho à cidade. Uma linguagem que muda de superfície sem perder a própria voz.</p></div>
    <div className="works-grid">{works.map(work => <article className={`work-card ${work.className}`} key={work.number}><Link href={work.href}><div className="work-image"><Image src={work.image} alt={work.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 35vw" /><span className="work-image-index">/{work.number}</span></div><div className="work-caption"><div><span>{work.note}</span><h3>{work.name}</h3></div><span aria-hidden="true">↗</span></div></Link></article>)}</div>
    <div className="works-note"><p>Trabalhos, detalhes e bastidores. Um recorte do universo de Bruel.</p><Link href="/trabalhos">EXPLORAR GALERIA <span aria-hidden="true">↗</span></Link></div>
  </Container></section>;
}
