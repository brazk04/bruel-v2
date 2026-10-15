import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import "./street-prelude.css";

export function StreetPrelude() {
  return <section className="street-prelude" aria-labelledby="street-prelude-title"><div className="street-prelude-image"><Image src="/images/portfolio/graffiti-personagem.webp" alt="" fill sizes="100vw" /><div /></div><Container className="street-prelude-content"><div className="street-prelude-top"><span>STREET / 02</span><span>DA PELE PRO CONCRETO</span></div><div className="street-prelude-main"><h2 id="street-prelude-title">Da pele<br />pro <em>concreto.</em></h2><p>A mesma linguagem em outra escala. Parede, cidade e movimento entram na composição.</p></div><Link href="/street">VER STREET ART <span aria-hidden="true">↗</span></Link></Container></section>;
}
