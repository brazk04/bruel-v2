import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

export function Manifesto() {
  return <section className="manifesto-section" id="manifesto" aria-labelledby="manifesto-title"><Container className="manifesto-layout"><div className="manifesto-side"><Eyebrow>01 / MANIFESTO</Eyebrow><span className="manifesto-cross" aria-hidden="true">✳</span></div><div><h2 id="manifesto-title">Entre a pele e o concreto existe a mesma intenção: <em>marcar presença.</em></h2><div className="manifesto-bottom"><span className="rule" /><p>Um trabalho que atravessa suportes. Da escala íntima de um traço à presença de um muro, a arte encontra seu lugar e deixa uma história.</p></div></div></Container></section>;
}
