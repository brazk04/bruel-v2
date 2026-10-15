import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { getWhatsAppUrl } from "@/lib/constants/contact";

export function Footer() {
  return <footer className="footer" id="contato"><Container>
    <div className="footer-upper"><div><span className="eyebrow">CONTATO / RIO VERDE — GO</span><h2>Onde a próxima<br /><em>marca começa.</em></h2></div><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Vamos conversar com Bruel no WhatsApp" className="footer-mail">VAMOS CONVERSAR <span aria-hidden="true">↗</span></a></div>
    <div className="footer-main"><Logo /><p>TATTOO / GRAFFITI / STREET ART<br />RIO VERDE — GO, BRASIL</p><div><span>CONVERSE</span><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp — conversar com Bruel">WHATSAPP ↗</a></div></div>
    <div className="footer-end"><span>© 2026 BRUEL</span><span>ARCHIVE / END — A MARCA FICA.</span><a href="#conteudo">VOLTAR AO TOPO ↑</a></div>
  </Container></footer>;
}
