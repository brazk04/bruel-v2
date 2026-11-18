import type { SiteContent } from "@/lib/cms/schema";
import { renderTitle } from "@/lib/cms/title";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

import { homeProcessSteps } from "@/data/home";

export function Process({ content }: { content: SiteContent }) {
  return <section className="process-section" id="processo" aria-labelledby="process-title"><Container className="process-layout"><div className="process-intro"><Eyebrow>05 / PROCESSO</Eyebrow><h2 id="process-title">{renderTitle(content, "home.process.process-title", <>Tudo começa<br />com uma <em>ideia.</em></>)}</h2><p>Cada projeto é uma conversa. Um caminho simples para transformar intenção em arte.</p></div><ol className="process-list">{homeProcessSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{content["home.process."+number+".title"] ?? title}</h3><p>{description}</p></div><span aria-hidden="true">↗</span></li>)}</ol></Container></section>;
}
