import type { ReactNode } from "react";
import type { SiteContent } from "./schema";

export function renderTitle(content: SiteContent, key: string, original: ReactNode) {
  const value = content[key];
  return value ? <span className="cms-title">{value}</span> : original;
}
