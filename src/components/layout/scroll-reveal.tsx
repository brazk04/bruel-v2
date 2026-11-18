"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./scroll-reveal.css";

const targets = [
  ".manifesto-layout > div:last-child",
  ".works-heading",
  ".works-grid > .work-card",
  ".discipline-grid > .discipline-panel",
  ".street-prelude-main",
  ".about-copy",
  ".process-intro",
  ".process-list > li",
  ".final-cta h2",
  ".tattoo-card > .tattoo-card-media",
  ".tattoo-street-bridge h2",
  ".street-featured-heading",
  ".street-featured-item",
  ".street-documentary-intro",
  ".street-index h2",
  ".street-manifesto h2",
  ".street-detail-frame",
  ".street-detail-story > div",
  ".artist-bio-grid > div",
  ".artist-trajectory-heading",
  ".artist-process-heading",
  ".artist-document-heading",
  ".artist-document-grid > figure",
  ".artist-contact-main",
].join(", ");

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const elements = document.getElementById("conteudo")?.querySelectorAll(targets);
    if (!elements?.length) return;

    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        if (!reducedMotion.matches) target.classList.add("scroll-revealed");
        observer.unobserve(target);
      }
    }, { rootMargin: "0px 0px -48px", threshold: 0.01 });

    for (const element of elements) {
      if (!element.classList.contains("scroll-revealed") && element.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(element);
      }
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
