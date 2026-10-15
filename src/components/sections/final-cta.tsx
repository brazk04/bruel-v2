import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { ContactChoiceTrigger } from "@/components/contact/contact-choice";

export function FinalCta() {
  return <section className="final-cta" aria-labelledby="final-title"><Container className="final-cta-inner"><Eyebrow>06 / PRÓXIMO TRAÇO</Eyebrow><h2 id="final-title">Sua ideia merece<br />mais do que<br /><em>um desenho.</em></h2><div className="final-cta-bottom"><p>Vamos transformar uma ideia em algo que fica.</p><ContactChoiceTrigger className="button button-primary">AGENDAR SESSÃO <span aria-hidden="true">↗</span></ContactChoiceTrigger></div></Container></section>;
}
