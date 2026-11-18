import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "bruel_admin";
const sessionSeconds = 60 * 60 * 8;

function getPasswordHash() {
  const hash = process.env.BRUEL_ADMIN_PASSWORD_HASH;
  return hash && /^[a-f0-9]{64}$/.test(hash) ? hash : undefined;
}

export function adminEnabled() {
  return Boolean(getPasswordHash());
}

function sign(expires: string, passwordHash: string) {
  return createHmac("sha256", Buffer.from(passwordHash, "hex"))
    .update(`bruel-admin-session:${expires}`).digest("hex");
}

function matches(supplied: string, expected: string) {
  return supplied.length === expected.length && /^[a-f0-9]+$/.test(supplied)
    && timingSafeEqual(Buffer.from(supplied, "hex"), Buffer.from(expected, "hex"));
}

export async function startAdminSession(password: string) {
  const hash = getPasswordHash();
  if (!hash || password.length > 256 || !matches(createHash("sha256").update(password).digest("hex"), hash)) {
    return false;
  }

  const expires = String(Math.floor(Date.now() / 1000) + sessionSeconds);
  (await cookies()).set(cookieName, `${expires}.${sign(expires, hash)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: sessionSeconds,
  });
  return true;
}

export async function isAdmin() {
  const hash = getPasswordHash();
  const token = (await cookies()).get(cookieName)?.value;
  const [expires, signature] = token?.split(".") ?? [];
  return Boolean(hash && expires && signature && /^\d{10}$/.test(expires)
    && Number(expires) > Date.now() / 1000 && matches(signature, sign(expires, hash)));
}

export async function endAdminSession() {
  (await cookies()).delete(cookieName);
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
}
