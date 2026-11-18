import { artist } from "@/data/artist";
import { getStreetProjects } from "@/data/street-projects";
import { tattooWorks } from "@/data/tattoo-works";
import type { TattooWork } from "@/types/tattoo-work";
import type { SiteContent } from "./schema";

export function getEditedTattooWorks(content: SiteContent): TattooWork[] {
  return tattooWorks.map(work => {
    const prefix = `tattoo.${work.id}`;
    const title = content[`${prefix}.title`] ?? work.title;
    const image = content[`${prefix}.image`];
    const video = content[`${prefix}.video`] ?? work.video;

    return image
      ? { ...work, title, image, alt: title, video }
      : { ...work, title, video };
  });
}

export function getEditedStreetProjects(content: SiteContent) {
  return getStreetProjects().map(project => {
    const prefix = `project.${project.id}`;
    return {
      ...project,
      title: content[`${prefix}.title`] ?? project.title,
      coverImage: content[`${prefix}.cover`] ?? project.coverImage,
      images: project.images.map(image => ({
        ...image,
        src: content[`${prefix}.image.${image.id}`] ?? image.src,
      })),
    };
  });
}

export function getEditedArtist(content: SiteContent) {
  return {
    ...artist,
    name: content["artist.name"] ?? artist.name,
    images: artist.images.map(image => ({ ...image, src: content[`artist.image.${image.id}`] ?? image.src })),
    fields: artist.fields.map(field => ({ ...field, title: content[`artist.field.${field.number}`] ?? field.title })),
    process: artist.process.map(step => ({ ...step, title: content[`artist.process.${step.number}`] ?? step.title })),
  };
}
