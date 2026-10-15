export const tattooCategories = [
  "Todos",
  "Blackwork",
  "Lettering",
  "Ilustrativo",
  "Autoral",
  "Outros",
] as const;

export type TattooCategory = Exclude<(typeof tattooCategories)[number], "Todos">;

type TattooWorkBase = {
  id: string;
  title: string;
  category: TattooCategory;
  style: string;
  year?: string;
  location?: string;
  description?: string;
  video?: string;
  aspectRatio: "portrait" | "landscape" | "square";
  featured?: boolean;
  placeholderTone: "ink" | "concrete" | "charcoal";
};

export type TattooWork = TattooWorkBase & (
  | { image: string; alt: string }
  | { image: null; alt?: never }
);
