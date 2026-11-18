import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin, isSameOrigin } from "@/lib/cms/auth";
import { mediaFormats, mediaPathMatches } from "@/lib/cms/fields";
import { storageEnabled } from "@/lib/cms/store";

export async function POST(request: Request) {
  if (!isSameOrigin(request) || !(await isAdmin())) {
    return Response.json({ message: "Sua sessão expirou. Entre novamente." }, { status: 403 });
  }
  if (!storageEnabled()) {
    return Response.json({ message: "O armazenamento do painel está indisponível." }, { status: 503 });
  }

  try {
    const body: HandleUploadBody = await request.json();
    if (body.type !== "blob.generate-client-token") return Response.json({ message: "Envio inválido." }, { status: 400 });
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async pathname => {
        const kind = pathname.startsWith("bruel-media/video/") ? "video" : "image";
        if (!mediaPathMatches(pathname, kind)) throw new Error("Caminho inválido.");
        const format = mediaFormats[kind];
        const allowedContentTypes = Object.entries(format.types)
          .filter(([, extension]) => pathname.endsWith(`.${extension}`)).map(([type]) => type);
        return { allowedContentTypes, maximumSizeInBytes: format.maxBytes, validUntil: Date.now() + 15 * 60_000 };
      },
    });
    return Response.json(result);
  } catch (error) {
    console.error("Falha ao autorizar upload.", error instanceof Error ? error.name : "Erro");
    return Response.json({ message: "Não foi possível iniciar o envio." }, { status: 400 });
  }
}
