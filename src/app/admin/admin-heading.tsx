"use client";

import Link from "next/link";
import { logout } from "./actions";

export function AdminHeading({ confirmExit = false, saving = false }: { confirmExit?: boolean; saving?: boolean }) {
  return <div className="admin-heading">
    <div>
      <h1 id="admin-title">Editar site</h1>
      <p>Altere títulos e arquivos. As mudanças ficam visíveis no site ao publicar.</p>
    </div>
    <nav aria-label="Ações do painel">
      <Link href="/" target="_blank" rel="noopener">Ver site ↗</Link>
      <form action={logout} onSubmit={event => {
        if (confirmExit && !window.confirm("Descartar as alterações pendentes e sair?")) event.preventDefault();
      }}>
        <button type="submit" disabled={saving}>Sair</button>
      </form>
    </nav>
  </div>;
}
