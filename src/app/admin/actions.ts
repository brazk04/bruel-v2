"use server";

import { redirect } from "next/navigation";
import { endAdminSession, startAdminSession } from "@/lib/cms/auth";

export async function login(_previous: string, form: FormData) {
  const password = form.get("password");
  if (typeof password !== "string" || !(await startAdminSession(password))) {
    return "Senha incorreta.";
  }
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin");
}
