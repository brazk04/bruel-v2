import { getSiteContent } from "@/lib/cms/store";
import { renderTitle } from "@/lib/cms/title";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { StreetMediaGallery } from "@/components/street/street-media-gallery";
import { getStreetProjects } from "@/data/street-projects";
import { getEditedStreetProjects } from "@/lib/cms/collections";
import "../street.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getStreetProjects().map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getEditedStreetProjects(await getSiteContent()).find(item => item.slug === slug);
  if (!project) return { title: "Projeto não encontrado — Bruel" };
  return { title: { absolute: `${project.title} — Street Art — Bruel` }, description: project.description, openGraph: { title: `${project.title} — Street Art — Bruel`, description: project.description } };
}

export default async function StreetProjectPage({ params }: Props) {
  const { slug } = await params;
  const content = await getSiteContent();
  const projects = getEditedStreetProjects(content);
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.findIndex(item => item.id === project.id) + 1) % projects.length];
  return <>
    <article className="street-detail"><Container>
      <div className="street-detail-top"><Link href="/street">← VOLTAR PARA STREET</Link><span>PROJECT / {project.id}</span></div>
      <div className="street-detail-heading"><div><span>{project.type}</span><h1>{project.title}<i>.</i></h1></div><dl>{project.city && <div><dt>LOCAL</dt><dd>{project.city}</dd></div>}{project.year && <div><dt>ANO</dt><dd>{project.year}</dd></div>}<div><dt>ARQUIVO</dt><dd>STREET / {project.id}</dd></div></dl></div>
    </Container>
      <StreetMediaGallery project={project} />
      <Container><div className="street-detail-story"><span>PROJETO / CONTEXTO</span><div><h2>{renderTitle(content, "street.detail.context", <>Traço, superfície<br /><em>e cidade.</em></>)}</h2><p>{project.description}</p><p className="street-detail-note">Explore a galeria para ver detalhes da pintura e sua relação com o entorno.</p></div></div><div className="street-detail-next"><span>NEXT / PROJECT</span><Link href={`/street/${next.slug}`}>{next.title} <span aria-hidden="true">↗</span></Link></div></Container>
    </article>
  </>;
}
