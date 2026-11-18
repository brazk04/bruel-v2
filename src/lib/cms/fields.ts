export type FieldKind = "title" | "image" | "video";

export type ContentField = {
  key: string;
  label: string;
  defaultValue: string;
  kind: FieldKind;
};

export type ContentGroup = {
  title: string;
  fields: ContentField[];
};

export const titleMaxLength = 180;

export const mediaFormats = {
  image: {
    types: { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" },
    maxBytes: 15 * 1024 * 1024,
    hint: "JPG, PNG, WebP ou AVIF até 15 MB",
  },
  video: {
    types: { "video/mp4": "mp4", "video/webm": "webm" },
    maxBytes: 150 * 1024 * 1024,
    hint: "MP4 ou WebM até 150 MB",
  },
} as const;

export function text(key: string, label: string, defaultValue: string): ContentField {
  return { key, label, defaultValue, kind: "title" };
}

export function media(key: string, label: string, defaultValue = "", kind: "image" | "video" = "image"): ContentField {
  return { key, label, defaultValue, kind };
}

export function mediaPathMatches(path: string, kind: "image" | "video") {
  const extensions = Object.values(mediaFormats[kind].types).join("|");
  return new RegExp(`^bruel-media/${kind}/[a-f0-9-]{36}\\.(?:${extensions})$`).test(path);
}
