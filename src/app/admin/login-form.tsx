"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, "");

  return <form className="admin-login-form" action={action}>
    <label htmlFor="admin-password">Senha</label>
    <input id="admin-password" type="password" name="password" autoComplete="current-password" maxLength={256} required />
    {error && <p className="admin-error" role="alert">{error}</p>}
    <button className="admin-primary" disabled={pending}>{pending ? "Entrando…" : "Entrar"}</button>
  </form>;
}
