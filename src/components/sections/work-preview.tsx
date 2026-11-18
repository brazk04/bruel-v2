import type { SiteContent } from "@/lib/cms/schema";
import { renderTitle } from "@/lib/cms/title";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

import { homeWorks } from "@/data/home";

export function WorkPreview({ content }: { content: SiteContent }) {
  return <section className="works-section" id="trabalhos" aria-labelledby="works-title"><Container>
    <div className="section-topline"><Eyebrow>02 / UNIVERSO VISUAL</Eyebrow><span>SELEÇÃO DE LINGUAGENS</span></div>
    <div className="works-heading"><h2 id="works-title">{renderTitle(content, "home.work-preview.works-title", <>Marcas que <em>ficam.</em></>)}</h2><p>Do desenho à cidade. Uma linguagem que muda de superfície sem perder a própria voz.</p></div>
    <div className="works-grid">{homeWorks.map(work => <article className={`work-card ${work.className}`} key={work.number}><Link href={work.href}><div className="work-image"><Image src={content["home.work."+work.number+".image"] ?? work.image} alt={work.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 35vw" /><span className="work-image-index">/{work.number}</span></div><div className="work-caption"><div><span>{work.note}</span><h3>{content["home.work."+work.number+".title"] ?? work.name}</h3></div><span aria-hidden="true">↗</span></div></Link></article>)}</div>
    <div className="works-note"><p>Trabalhos, detalhes e bastidores. Um recorte do universo de Bruel.</p><Link href="/trabalhos">EXPLORAR GALERIA <span aria-hidden="true">↗</span></Link></div>
  </Container></section>;
}
