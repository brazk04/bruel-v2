"use client";

import Image from "next/image";
import { useHeroAtmosphere } from "@/hooks/use-hero-atmosphere";

export function SkullSmokeBackground() {
  const atmosphereRef = useHeroAtmosphere();

  return <div className="skull-atmosphere" aria-hidden="true" ref={atmosphereRef}>
    <Image
      src="/images/skull-smoke.webp"
      alt=""
      fill
      priority
      sizes="(max-width: 767px) 100vw, 48vw"
      className="skull-atmosphere-image"
    />
    <div className="smoke-field">
      <span className="smoke-haze smoke-haze-back" />
      <span className="smoke-haze smoke-haze-front" />
      <svg className="smoke-wisp smoke-wisp-back" viewBox="0 0 240 540" fill="none" aria-hidden="true">
        <defs><linearGradient id="smoke-back" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#a9a5a0" stopOpacity="0" /><stop offset=".35" stopColor="#a9a5a0" stopOpacity=".45" /><stop offset=".72" stopColor="#a9a5a0" stopOpacity=".2" /><stop offset="1" stopColor="#a9a5a0" stopOpacity="0" /></linearGradient></defs>
        <path d="M151 540C90 470 182 421 124 361C78 313 159 276 101 224C62 189 127 131 94 88C76 64 83 31 112 3" stroke="url(#smoke-back)" strokeWidth="18" />
        <path d="M186 528C144 466 213 417 171 356C128 292 214 258 157 185C130 151 159 106 147 76" stroke="url(#smoke-back)" strokeWidth="9" />
      </svg>
      <svg className="smoke-wisp smoke-wisp-front" viewBox="0 0 240 540" fill="none" aria-hidden="true">
        <defs><linearGradient id="smoke-front" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#c4bdb6" stopOpacity="0" /><stop offset=".4" stopColor="#c4bdb6" stopOpacity=".38" /><stop offset=".8" stopColor="#c4bdb6" stopOpacity=".16" /><stop offset="1" stopColor="#c4bdb6" stopOpacity="0" /></linearGradient></defs>
        <path d="M91 537C43 488 125 438 73 382C24 331 118 302 59 245C18 205 99 171 71 116C53 80 93 38 83 3" stroke="url(#smoke-front)" strokeWidth="12" />
      </svg>
    </div>
    <span className="smoke-veil" />
    <span className="scroll-shade" />
    <span className="ember-aura" />
    <span className="ember-depth"><span className="ember" /></span>
  </div>;
}
