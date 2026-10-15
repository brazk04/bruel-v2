import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

export function Disciplines() {
  return <section className="disciplines-section" id="street" aria-labelledby="disciplines-title"><Container><div className="section-topline"><Eyebrow>03 / DOIS TERRITÓRIOS</Eyebrow><span>UMA MESMA LINGUAGEM</span></div><h2 id="disciplines-title" className="sr-only">Tattoo e street art</h2><div className="discipline-grid"><div className="discipline-panel tattoo-panel"><span className="discipline-number">A / 01</span><div><span className="discipline-kicker">O CORPO COMO TELA</span><h3>Tattoo<span>.</span></h3><p>Um traço pensado para pertencer a alguém. Presença que acompanha, muda e permanece.</p></div></div><div className="discipline-panel street-panel"><span className="discipline-number">B / 02</span><div><span className="discipline-kicker">A CIDADE COMO SUPORTE</span><h3>Street <em>art.</em></h3><p>Escala, movimento e rua. Arte que ocupa espaços e encontra novas formas de conversa.</p></div></div></div></Container></section>;
}
