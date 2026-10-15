import Link from "next/link";
import type { MouseEventHandler } from "react";

export function Logo({ onClick }: { onClick?: MouseEventHandler<HTMLAnchorElement> } = {}) {
  return <Link href="/" className="logo" onClick={onClick}><strong>BRUEL<span className="logo-period">.</span></strong><small>TATTOO / STREET ART</small></Link>;
}
