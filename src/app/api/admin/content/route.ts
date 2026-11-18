import { revalidatePath, revalidateTag } from "next/cache";
import { isAdmin, isSameOrigin } from "@/lib/cms/auth";
import { ContentConflict, InvalidContent, contentTag, saveContent, storageEnabled } from "@/lib/cms/store";

export async function POST(request: Request) {
  if (!isSameOrigin(request) || !(await isAdmin())) {
    return Response.json({ message: "Sua sessão expirou. Entre novamente." }, { status: 403 });
  }
  if (!storageEnabled()) {
    return Response.json({ message: "O armazenamento do painel está indisponível." }, { status: 503 });
  }

  try {
    const body = await request.text();
    if (body.length > 100_000) return Response.json({ message: "Conteúdo muito grande." }, { status: 413 });

    const { content, revision } = JSON.parse(body) ?? {};
    if (revision !== null && (typeof revision !== "string" || revision.length > 128)) throw new InvalidContent("Versão inválida.");
    const saved = await saveContent(content, revision);
    revalidateTag(contentTag, { expire: 0 });
    revalidatePath("/", "layout");
    return Response.json(saved);
  } catch (error) {
    if (error instanceof ContentConflict) {
      return Response.json({ message: "O site foi salvo em outra sessão. Recarregue o painel para ver a versão atual antes de editar." }, { status: 409 });
    }
    if (error instanceof InvalidContent || error instanceof SyntaxError) {
      return Response.json({ message: error instanceof InvalidContent ? error.message : "Conteúdo inválido." }, { status: 400 });
    }
    console.error("Falha ao publicar conteúdo.", error instanceof Error ? error.name : "Erro");
    return Response.json({ message: "Falha ao salvar. Tente novamente." }, { status: 503 });
  }
}
