import { getSiteContent } from "@/lib/cms/store";
import { renderTitle } from "@/lib/cms/title";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { TattooGallery } from "@/components/gallery/tattoo-gallery";
import { getEditedTattooWorks } from "@/lib/cms/collections";
import "./gallery.css";

export const metadata: Metadata = {
  title: { absolute: "Trabalhos — Bruel Tattoo & Street Art" },
  description: "Portfólio de tattoos de Bruel: fotos e vídeos de trabalhos em preto e cinza, lettering, floral e composições autorais.",
};

export default async function TrabalhosPage() {
  const content = await getSiteContent();
  return <>
    <section className="gallery-intro" aria-labelledby="gallery-title"><Container>
      <div className="gallery-intro-top"><Eyebrow>01 / TATTOO</Eyebrow><span>PORTFÓLIO / BRUEL</span></div>
      <div className="gallery-intro-grid"><h1 id="gallery-title">{renderTitle(content, "trabalhos.gallery-title", <>Trabalhos<span>.</span></>)}</h1><div><p className="gallery-intro-lead">Pele, tinta<br /><em>e identidade.</em></p><p className="gallery-intro-copy">Uma seleção de tattoos e composições na pele. Explore as fotos e veja os detalhes em vídeo.</p></div></div>
    </Container></section>
    <TattooGallery works={getEditedTattooWorks(content)} />
    <section className="tattoo-street-bridge" aria-labelledby="tattoo-street-title"><Container><span>FROM SKIN / TO CONCRETE</span><div><h2 id="tattoo-street-title">{renderTitle(content, "trabalhos.tattoo-street-title", <>O traço sai<br />pra <em>rua.</em></>)}</h2><Link href="/street">EXPLORAR STREET ART <span aria-hidden="true">↗</span></Link></div></Container></section>
  </>;
}
