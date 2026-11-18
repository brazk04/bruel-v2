import type { SiteContent } from "@/lib/cms/schema";
import { renderTitle } from "@/lib/cms/title";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow, Tag } from "@/components/ui/typography";
import { artist } from "@/data/artist";

export function About({ content }: { content: SiteContent }) {
  return <section className="about-section" id="sobre" aria-labelledby="about-title"><Container className="about-layout">
    <div className="about-art about-art-photo"><Image src={content["home.aboutPhoto"] ?? "/images/portfolio/artista-trabalhando.webp"} alt="Bruel trabalhando em uma tattoo no estúdio" fill sizes="(max-width: 767px) 100vw, 48vw" /><small>BRUEL / EM AÇÃO</small></div>
    <div className="about-copy"><Eyebrow>04 / O ARTISTA</Eyebrow><h2 id="about-title">{renderTitle(content, "home.about.about-title", <>Por trás do<br /><em>traço.</em></>)}</h2><p>{artist.bio[0]}</p><p>Entre pele, tinta e cidade, a imagem encontra novas formas de presença.</p><div className="about-tags"><Tag>TATTOO</Tag><Tag>GRAFFITI</Tag><Tag>ARTE URBANA</Tag></div><Link href="/sobre" className="button button-secondary">CONHECER O ARTISTA <span aria-hidden="true">↗</span></Link></div>
  </Container></section>;
}
