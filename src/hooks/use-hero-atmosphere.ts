"use client";

import { useEffect, useRef } from "react";

export function useHeroAtmosphere() {
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const hero = atmosphere?.closest(".home-hero") as HTMLElement | null;
    if (!atmosphere || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const target = { x: 0, y: 0, scroll: 0 };
    const current = { x: 0, y: 0, scroll: 0 };
    let frame = 0;
    let enabled = false;
    let inView = true;

    const render = () => {
      current.x += (target.x - current.x) * 0.09;
      current.y += (target.y - current.y) * 0.09;
      current.scroll += (target.scroll - current.scroll) * 0.12;

      atmosphere.style.setProperty("--skull-x", `${(current.x * 0.35).toFixed(2)}px`);
      atmosphere.style.setProperty("--skull-y", `${(current.y * 0.35 - current.scroll * 8).toFixed(2)}px`);
      atmosphere.style.setProperty("--smoke-x", `${(current.x * 0.85).toFixed(2)}px`);
      atmosphere.style.setProperty("--smoke-y", `${(current.y * 0.8 - current.scroll * 14).toFixed(2)}px`);
      atmosphere.style.setProperty("--skull-opacity", (0.44 - current.scroll * 0.14).toFixed(3));
      atmosphere.style.setProperty("--shade-opacity", (current.scroll * 0.18).toFixed(3));
      atmosphere.style.setProperty("--ember-scroll-opacity", (1 - current.scroll * 0.6).toFixed(3));
      hero.style.setProperty("--title-x", `${(current.x * 0.13).toFixed(2)}px`);
      hero.style.setProperty("--title-y", `${(current.y * 0.13 - current.scroll * 7).toFixed(2)}px`);

      const unsettled = Math.abs(target.x - current.x) > 0.03 || Math.abs(target.y - current.y) > 0.03 || Math.abs(target.scroll - current.scroll) > 0.003;
      frame = unsettled ? window.requestAnimationFrame(render) : 0;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
      schedule();
    };

    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
      schedule();
    };

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      target.scroll = Math.min(1, Math.max(0, -rect.top / rect.height));
      schedule();
    };

    const configure = () => {
      const shouldEnable = inView && finePointer.matches && !reducedMotion.matches;
      if (shouldEnable === enabled) return;
      enabled = shouldEnable;

      if (enabled) {
        hero.addEventListener("pointermove", onPointerMove, { passive: true });
        hero.addEventListener("pointerleave", onPointerLeave);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        hero.removeEventListener("pointermove", onPointerMove);
        hero.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("scroll", onScroll);
        target.x = 0;
        target.y = 0;
        target.scroll = 0;
        schedule();
      }
    };

    finePointer.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      atmosphere.dataset.visible = String(inView);
      configure();
    });
    observer.observe(hero);
    configure();

    return () => {
      finePointer.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
      observer.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      hero.style.removeProperty("--title-x");
      hero.style.removeProperty("--title-y");
    };
  }, []);

  return atmosphereRef;
}
