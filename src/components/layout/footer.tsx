import { getSiteContent } from "@/lib/cms/store";
import { renderTitle } from "@/lib/cms/title";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { getWhatsAppUrl } from "@/lib/constants/contact";
import { site } from "@/lib/constants/site";

export async function Footer() {
  const content = await getSiteContent();
  return <footer className="footer" id="contato"><Container>
    <div className="footer-upper"><div><span className="eyebrow">CONTATO / RIO VERDE — GO</span><h2>{renderTitle(content, "footer.contact-title", <>Onde a próxima<br /><em>marca começa.</em></>)}</h2></div><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Vamos conversar com Bruel no WhatsApp" className="footer-mail">VAMOS CONVERSAR <span aria-hidden="true">↗</span></a></div>
    <div className="footer-main"><Logo /><p>TATTOO / GRAFFITI / STREET ART<br />RIO VERDE — GO, BRASIL</p><div><span>CONVERSE</span><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp — conversar com Bruel">WHATSAPP ↗</a><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Bruel — @bruel_tattoo">INSTAGRAM ↗</a></div></div>
    <div className="footer-end"><span>© 2026 BRUEL</span><span>ARCHIVE / END — A MARCA FICA.</span><a href="#conteudo">VOLTAR AO TOPO ↑</a><Link href="/admin" className="footer-admin" prefetch={false}>Área administrativa</Link></div>
  </Container></footer>;
}
