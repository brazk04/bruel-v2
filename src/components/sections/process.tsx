import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

const steps = [
  ["01", "Envie sua ideia", "Conte o que você imagina e onde a arte vai viver."],
  ["02", "Compartilhe referências", "Imagens, medidas e contexto ajudam a definir o caminho."],
  ["03", "Receba uma análise", "A proposta toma forma com direção e orçamento."],
  ["04", "Agende sua sessão", "Com tudo alinhado, escolhemos o melhor momento."],
] as const;

export function Process() {
  return <section className="process-section" id="processo" aria-labelledby="process-title"><Container className="process-layout"><div className="process-intro"><Eyebrow>05 / PROCESSO</Eyebrow><h2 id="process-title">Tudo começa<br />com uma <em>ideia.</em></h2><p>Cada projeto é uma conversa. Um caminho simples para transformar intenção em arte.</p></div><ol className="process-list">{steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><span aria-hidden="true">↗</span></li>)}</ol></Container></section>;
}
