import type { Metadata } from "next";
import Link from "next/link";
import { ArtistImage } from "@/components/artist/artist-image";
import { ContactChoiceTrigger } from "@/components/contact/contact-choice";
import { Container } from "@/components/ui/container";
import { artist } from "@/data/artist";
import "./sobre.css";

export const metadata: Metadata = {
  title: { absolute: "Sobre — Bruel Tattoo & Graffiti" },
  description: "Conheça Bruel, artista que trabalha com tattoo, graffiti e arte urbana em Rio Verde — GO.",
};

export default function SobrePage() {
  return <>
    <section className="artist-hero" aria-labelledby="artist-title"><Container className="artist-hero-layout">
      <div className="artist-hero-top"><span>03 / ARTIST</span><span>TATTOO / GRAFFITI / ART</span></div>
      <div className="artist-hero-portrait"><ArtistImage image={artist.images[0]} priority /></div>
      <div className="artist-hero-copy"><span>ARTIST / RIO VERDE — GO</span><h1 id="artist-title">Bruel<span>.</span></h1><p>Tattoo.<br />Graffiti.<br /><em>Identidade.</em></p></div>
      <div className="artist-hero-bottom"><span>{artist.introduction}</span><a href="#biografia">CONHECER O ARTISTA <span aria-hidden="true">↓</span></a></div>
    </Container></section>

    <section className="artist-bio" id="biografia" aria-labelledby="artist-bio-title"><Container>
      <div className="artist-rule"><span>ARTIST / 03</span><span>UMA LINGUAGEM, VÁRIOS SUPORTES</span></div>
      <div className="artist-bio-grid"><div><span className="artist-section-index">01 / APRESENTAÇÃO</span><h2 id="artist-bio-title">O artista por trás<br />do <em>traço.</em></h2></div><div className="artist-bio-text"><p className="artist-bio-lead">{artist.bio[0]}</p><p>{artist.bio[1]}</p><small>APRESENTAÇÃO EDITORIAL / BIOGRAFIA COMPLETA EM PREPARAÇÃO</small></div></div>
    </Container></section>

    <section className="artist-manifesto" aria-labelledby="artist-manifesto-title"><Container><div className="artist-rule"><span>MANIFESTO / VISUAL</span><span>PELE + RUA + DESENHO</span></div><div className="artist-manifesto-body"><span className="artist-manifesto-mark" aria-hidden="true">B/R</span><h2 id="artist-manifesto-title">Pele.<br />Cidade.<br /><em>Presença.</em></h2><p>O suporte muda. A intenção de criar imagens com identidade permanece.</p></div></Container></section>

    <section className="artist-trajectory" aria-labelledby="artist-trajectory-title"><Container><div className="artist-rule"><span>TRAJETÓRIA / EIXOS</span><span>DESENHO / PELE / CIDADE</span></div><div className="artist-trajectory-heading"><h2 id="artist-trajectory-title">Uma linguagem<br />em <em>camadas.</em></h2><p>Desenho, graffiti, tattoo e trabalhos autorais se encontram em diferentes superfícies.</p></div><ol>{artist.fields.map(field => <li key={field.number}><span>{field.number}</span><h3>{field.title}</h3><p>{field.note}</p><span aria-hidden="true">↗</span></li>)}</ol></Container></section>

    <section className="artist-bridge" aria-labelledby="artist-bridge-title"><Container><div className="artist-rule"><span>DUAS SUPERFÍCIES</span><span>UMA IDENTIDADE</span></div><h2 id="artist-bridge-title">Da parede<br />pra <em>pele.</em><br />Da pele<br />pra <em>rua.</em></h2><div className="artist-bridge-bottom"><p>Tattoo e graffiti trabalham em escalas diferentes. O desenho conecta as duas linguagens.</p><div><Link href="/trabalhos">VER TATTOO ↗</Link><Link href="/street">VER STREET ↗</Link></div></div></Container></section>

    <section className="artist-process" aria-labelledby="artist-process-title"><Container><div className="artist-rule"><span>PROCESS / 01</span><span>DO PENSAMENTO À IMAGEM</span></div><div className="artist-process-heading"><h2 id="artist-process-title">A ideia encontra<br /><em>forma.</em></h2><p>Uma estrutura de processo que serve ao corpo, à parede e aos projetos autorais.</p></div><ol>{artist.process.map(step => <li key={step.number}><span>{step.number} / 04</span><h3>{step.title}</h3><p>{step.note}</p></li>)}</ol></Container></section>

    <section className="artist-document" aria-labelledby="artist-document-title"><Container><div className="artist-rule"><span>DOCUMENT / BASTIDORES</span><span>DENTRO DO ESTÚDIO</span></div><div className="artist-document-heading"><h2 id="artist-document-title">Entre um traço<br />e <em>outro.</em></h2><p>O processo também deixa marcas: estudo, matéria, desenho e tempo de oficina.</p></div><div className="artist-document-grid"><figure className="artist-document-studio"><ArtistImage image={artist.images[1]} /><figcaption>01 / ESPAÇO DE TRABALHO</figcaption></figure><figure className="artist-document-process"><ArtistImage image={artist.images[2]} /><figcaption>02 / PROCESSO</figcaption></figure><figure className="artist-document-sketch"><ArtistImage image={artist.images[3]} /><figcaption>03 / TINTA & MATÉRIA</figcaption></figure></div></Container></section>

    <section className="artist-statement" aria-labelledby="artist-statement-title"><Container><span>NOTA EDITORIAL / IDENTIDADE</span><h2 id="artist-statement-title">A imagem muda<br />de suporte.<br /><em>A intenção permanece.</em></h2></Container></section>

    <section className="artist-contact" aria-labelledby="artist-contact-title"><Container><div className="artist-rule"><span>BASED IN</span><span>{artist.base.toUpperCase()} / {artist.country.toUpperCase()}</span></div><div className="artist-contact-main"><div><span>RIO VERDE — GO / BRASIL</span><h2 id="artist-contact-title">Tem uma ideia?<br /><em>Vamos conversar.</em></h2></div><ContactChoiceTrigger>COMEÇAR UM PROJETO <span aria-hidden="true">↗</span></ContactChoiceTrigger></div></Container></section>
  </>;
}
