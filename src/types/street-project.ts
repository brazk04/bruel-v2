export type StreetFrame = {
  id: string;
  src: string | null;
  alt: string;
  label: string;
  aspect: "landscape" | "panoramic" | "portrait";
};

export type StreetProject = {
  id: string;
  slug: string;
  title: string;
  type: string;
  year?: string;
  city?: string;
  description: string;
  coverImage: string | null;
  images: StreetFrame[];
  featured?: boolean;
};
