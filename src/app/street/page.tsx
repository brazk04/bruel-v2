import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { StreetVisual } from "@/components/street/street-visual";
import { getFeaturedStreetProjects, getStreetProjects } from "@/data/street-projects";
import { getWhatsAppUrl, STREET_WHATSAPP_MESSAGE } from "@/lib/constants/contact";
import "./street.css";

export const metadata: Metadata = {
  title: { absolute: "Street Art — Bruel" },
  description: "Projetos de graffiti e arte urbana de Bruel. Arte em grande escala entre a pele e a cidade.",
};

export default function StreetPage() {
  const featured = getFeaturedStreetProjects();
  const projects = getStreetProjects();
  return <>
    <section className="street-hero" aria-labelledby="street-title">
      <div className="street-hero-image"><Image src="/images/portfolio/graffiti-personagem.webp" alt="" fill priority sizes="100vw" /><div className="street-hero-shade" /></div>
      <Container className="street-hero-content"><div className="street-topline"><span>02 / STREET</span><span>PELE → CONCRETO</span></div><div className="street-hero-main"><h1 id="street-title">A rua<br />também é <em>tela.</em></h1><p>Graffiti e arte urbana que transformam paredes, espaços e cidade em expressão.</p></div><div className="street-hero-foot"><span>BRUEL / STREET ART</span><a href="#projetos">EXPLORAR PROJETOS <span aria-hidden="true">↓</span></a></div></Container>
    </section>

    <section className="street-featured" id="projetos" aria-labelledby="street-featured-title"><Container>
      <div className="street-section-rule"><span>FEATURED / PROJECTS</span><span>01 — 0{featured.length}</span></div>
      <div className="street-featured-heading"><h2 id="street-featured-title">Escala muda<br /><em>o gesto.</em></h2><p>A parede traz distância, arquitetura e cidade para dentro do trabalho. Cada projeto pede uma leitura do lugar.</p></div>
      <div className="street-featured-list">{featured.map((project, index) => <Link className={`street-featured-item street-featured-item-${index + 1}`} href={`/street/${project.slug}`} key={project.id}><StreetVisual frame={{ ...project.images[0], src: project.coverImage ?? project.images[0].src }} title={project.title} /><div className="street-project-caption"><span>PROJECT / {project.id}</span><div><h3>{project.title}</h3><p>{[project.type, project.city].filter(Boolean).join(" · ")}</p></div><b>VER PROJETO ↗</b></div></Link>)}</div>
      <p className="street-disclosure">DA RUA AO ESTÚDIO / REGISTROS DE PAREDE, COR & CONTEXTO.</p>
    </Container></section>

    <section className="street-documentary" aria-labelledby="street-documentary-title"><Container><div className="street-section-rule"><span>DOCUMENT / 001</span><span>CIDADE COMO SUPORTE</span></div><div className="street-documentary-intro"><h2 id="street-documentary-title">A imagem vive<br />no <em>entorno.</em></h2><p>Uma obra na rua nunca aparece isolada. Superfície, escala e circulação fazem parte do registro.</p></div></Container>
      <Link href={`/street/${projects[2].slug}`} className="street-documentary-photo"><Image src="/images/portfolio/estudio-original.jpg" alt={projects[2].images[1].alt} width={720} height={1280} unoptimized /><span className="street-documentary-photo-caption">WALL / 003 <b>ABRIR REGISTRO ↗</b></span></Link>
    </section>

    <section className="street-index" aria-labelledby="street-index-title"><Container><div className="street-section-rule"><span>STREET / ARCHIVE</span><span>0{projects.length} PROJETOS</span></div><h2 id="street-index-title">Arquivo <em>urbano.</em></h2><div className="street-index-list">{projects.map(project => <Link href={`/street/${project.slug}`} key={project.id}><span>{project.id} / {project.type}</span><strong>{project.title}</strong><span>{project.city}</span><b aria-hidden="true">↗</b></Link>)}</div></Container></section>

    <section className="street-manifesto" aria-labelledby="street-manifesto-title"><Container><span>MANIFESTO / URBANO</span><h2 id="street-manifesto-title">A cidade muda.<br />A marca <em>fica.</em></h2><p>Do primeiro traço ao último detalhe, o lugar também participa da obra.</p></Container></section>

    <section className="street-end" aria-label="Explore os dois universos de Bruel"><Container><span>FROM CONCRETE / BACK TO SKIN</span><div><h2>Outra superfície.<br /><em>A mesma voz.</em></h2><Link href="/trabalhos">EXPLORAR TATTOO <span aria-hidden="true">↗</span></Link></div><p>Tem um espaço ou projeto em mente? <a href={getWhatsAppUrl(STREET_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">Converse sobre arte urbana ↗</a></p></Container></section>
  </>;
}
