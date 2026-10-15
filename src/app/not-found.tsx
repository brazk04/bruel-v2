import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return <section className="not-found-page"><Container><span className="eyebrow">404 / FORA DO ARQUIVO</span><h1>Esse caminho<br />ainda não existe.</h1><p>A página pode ter mudado de endereço. Volte ao início para explorar os trabalhos de Bruel.</p><Link href="/" className="button button-primary">VOLTAR AO INÍCIO <span aria-hidden="true">↗</span></Link></Container></section>;
}
