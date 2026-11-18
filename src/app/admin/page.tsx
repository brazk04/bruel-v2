import type { Metadata } from "next";
import Link from "next/link";
import { adminEnabled, isAdmin } from "@/lib/cms/auth";
import { contentGroups } from "@/lib/cms/schema";
import { readContent, storageEnabled } from "@/lib/cms/store";
import { AdminHeading } from "./admin-heading";
import { LoginForm } from "./login-form";
import { SiteEditor } from "./site-editor";
import "./admin.css";

export const metadata: Metadata = {
  title: "Área administrativa",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <section className="admin-shell admin-login" aria-labelledby="admin-title">
      <h1 id="admin-title">Área administrativa</h1>
      {adminEnabled() ? <LoginForm /> : <p>O login administrativo está indisponível neste ambiente.</p>}
      <Link href="/">← Voltar ao site</Link>
    </section>;
  }

  const snapshot = storageEnabled() ? await readContent().catch(error => {
    console.error("Falha ao abrir editor.", error instanceof Error ? error.name : "Erro");
    return null;
  }) : null;

  return <section className="admin-shell" aria-labelledby="admin-title">
    {snapshot ? <SiteEditor groups={contentGroups} initial={snapshot} />
      : <>
          <AdminHeading />
          <p role="alert" className="admin-error">O armazenamento está indisponível. Recarregue a página para tentar novamente.</p>
        </>}
  </section>;
}
