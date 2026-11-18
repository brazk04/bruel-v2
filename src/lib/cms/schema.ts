import { artist } from "@/data/artist";
import { bookingTitles } from "@/data/booking-options";
import { homeProcessSteps, homeWorks } from "@/data/home";
import { getStreetProjects } from "@/data/street-projects";
import { tattooWorks } from "@/data/tattoo-works";
import { media, text, type ContentGroup } from "./fields";
import { pageFields } from "./page-fields";

export type SiteContent = Record<string, string | undefined>;

const extraFields: Record<string, ContentGroup["fields"]> = {
  "Página inicial": [
    ...homeWorks.flatMap(work => [
      text(`home.work.${work.number}.title`, `Título do cartão · ${work.name}`, work.name),
      media(`home.work.${work.number}.image`, `Foto do cartão · ${work.name}`, work.image),
    ]),
    ...homeProcessSteps.map(([number, title]) => text(`home.process.${number}.title`, `Etapa ${number} do processo`, title)),
  ],
  "Sobre": [
    text("artist.name", "Nome exibido no título", artist.name),
    ...artist.images.map(image => media(`artist.image.${image.id}`, image.label, image.src)),
    ...artist.fields.map(field => text(`artist.field.${field.number}`, `Título da área ${field.number}`, field.title)),
    ...artist.process.map(step => text(`artist.process.${step.number}`, `Título da etapa ${step.number}`, step.title)),
  ],
};

export const contentGroups: ContentGroup[] = [
  ...pageFields.map(group => ({ ...group, fields: [...group.fields, ...(extraFields[group.title] ?? [])] })),
  {
    title: "Agendar",
    fields: bookingTitles.map((title, index) => text(`booking.step.${index + 1}`, `Título da etapa ${index + 1}`, title)),
  },
  {
    title: "Galeria de tattoos",
    fields: tattooWorks.flatMap(work => [
      text(`tattoo.${work.id}.title`, `Título · ${work.title}`, work.title),
      media(`tattoo.${work.id}.image`, `Foto · ${work.title}`, work.image ?? ""),
      media(`tattoo.${work.id}.video`, `Vídeo · ${work.title}`, work.video, "video"),
    ]),
  },
  ...getStreetProjects().map(project => ({
    title: `Street · ${project.title}`,
    fields: [
      text(`project.${project.id}.title`, "Título do projeto", project.title),
      media(`project.${project.id}.cover`, "Foto de capa", project.coverImage ?? ""),
      ...project.images.map(image => media(`project.${project.id}.image.${image.id}`, image.label, image.src ?? "")),
    ],
  })),
];

export const contentFields = new Map(contentGroups.flatMap(group => group.fields.map(field => [field.key, field] as const)));
