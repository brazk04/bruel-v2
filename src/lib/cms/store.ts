import { BlobError, BlobNotFoundError, BlobPreconditionFailedError, get, head, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { mediaFormats, mediaPathMatches, titleMaxLength } from "./fields";
import { contentFields, type SiteContent } from "./schema";

export const contentTag = "bruel-site-content";

export class ContentConflict extends Error {}
export class InvalidContent extends Error {}

function contentPath() {
  return process.env.VERCEL_ENV === "production" ? "bruel-content/site.json" : "bruel-content/development.json";
}

export function storageEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN && process.env.BRUEL_CONTENT_READ_WRITE_TOKEN);
}

function manifestStorage() {
  return { access: "private", token: process.env.BRUEL_CONTENT_READ_WRITE_TOKEN } as const;
}

function mediaUrl(value: string, kind: "image" | "video") {
  const url = URL.parse(value);
  return url && url.protocol === "https:" && /^[a-z0-9]+\.public\.blob\.vercel-storage\.com$/.test(url.host)
    && !url.username && !url.password && !url.hash && !url.search
    && mediaPathMatches(url.pathname.slice(1), kind) ? url : null;
}

function parseContent(input: unknown, strict: boolean): SiteContent {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new InvalidContent("Conteúdo inválido.");

  const result: SiteContent = {};
  for (const [key, value] of Object.entries(input)) {
    const field = contentFields.get(key);
    if (!field && !strict) continue;
    if (!field || typeof value !== "string") throw new InvalidContent("Campo inválido.");
    const cleanValue = value.trim();
    if (cleanValue === field.defaultValue) continue;
    const valid = field.kind === "title"
      ? cleanValue.length > 0 && cleanValue.length <= titleMaxLength
      : cleanValue.length <= 512 && mediaUrl(cleanValue, field.kind);
    if (!valid) throw new InvalidContent(`Confira o campo “${field.label}”.`);
    result[key] = cleanValue;
  }
  return result;
}

export async function readContent(): Promise<{ content: SiteContent; revision: string | null }> {
  if (!storageEnabled()) return { content: {}, revision: null };
  const result = await get(contentPath(), {
    ...manifestStorage(),
    useCache: false,
    // Conditional writes require the strong ETag of the uncompressed manifest.
    headers: { "Accept-Encoding": "identity" },
  });
  if (!result || result.statusCode !== 200) return { content: {}, revision: null };
  const data: unknown = await new Response(result.stream).json();
  return { content: parseContent(data, false), revision: result.blob.etag };
}

const readPublishedContent = unstable_cache(
  async () => (await readContent()).content,
  ["bruel-published-content-v1"],
  { revalidate: 300, tags: [contentTag] },
);

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!storageEnabled()) return {};
  try {
    return await readPublishedContent();
  } catch (error) {
    console.error("Falha ao carregar o conteúdo do site.", error instanceof Error ? error.name : "Erro");
    return {};
  }
});

export async function saveContent(input: unknown, revision: string | null) {
  const content = parseContent(input, true);
  const current = await readContent();
  if (current.revision !== revision) throw new ContentConflict();

  await Promise.all(Object.entries(content).map(async ([key, value]) => {
    const field = contentFields.get(key);
    if (!field || field.kind === "title" || !value || current.content[key] === value) return;
    const url = mediaUrl(value, field.kind)!;
    try {
      const blob = await head(url.pathname.slice(1));
      if (blob.url === url.href && Object.hasOwn(mediaFormats[field.kind].types, blob.contentType)) return;
    } catch (error) {
      if (!(error instanceof BlobNotFoundError)) throw error;
    }
    throw new InvalidContent(`Envie novamente o arquivo de “${field.label}”.`);
  }));

  try {
    const result = await put(contentPath(), JSON.stringify(content), {
      ...manifestStorage(),
      contentType: "application/json",
      allowOverwrite: revision !== null,
      ifMatch: revision ?? undefined,
    });
    return { content, revision: result.etag };
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError || (error instanceof BlobError && /already exists/i.test(error.message))) {
      throw new ContentConflict();
    }
    throw error;
  }
}
