"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./floating-art-film.css";

const poster = "/images/portfolio/film-poster.webp";
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function FloatingArtFilm({ src }: { src?: string }) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [floating, setFloating] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const [obscured, setObscured] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const sync = () => {
      const video = videoRef.current;
      if (!video) return;
      if (!ready || nearEnd || obscured || reducedMotion || document.hidden) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [mounted, ready, nearEnd, obscured, reducedMotion]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setObscured(document.body.dataset.menuOpen === "true" || document.body.dataset.lightboxOpen === "true" || Boolean(document.querySelector("dialog[open]")));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["data-menu-open", "data-lightbox-open", "open"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = anchorRef.current;
      const film = filmRef.current;
      if (!anchor || !film) return;
      const rect = anchor.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const mobile = window.innerWidth < 768;
      const targetWidth = mobile ? 136 : Math.min(260, Math.max(220, window.innerWidth * .16));
      const margin = mobile ? 16 : 28;
      const targetX = window.innerWidth - targetWidth - margin;
      const targetY = window.innerHeight - rect.height * targetWidth / rect.width - margin;
      // Keep the film in its hero composition on phones so it never covers content.
      const rawProgress = mobile ? 0 : clamp((window.innerHeight * .13 - rect.top) / (window.innerHeight * .35));
      const progress = reducedMotion ? (rawProgress > .5 ? 1 : 0) : rawProgress;
      const scale = 1 + (targetWidth / rect.width - 1) * progress;
      const x = rect.left + (targetX - rect.left) * progress;
      const y = rect.top + (targetY - rect.top) * progress;
      film.style.width = `${rect.width}px`;
      film.style.height = `${rect.height}px`;
      film.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      setFloating(progress > .8);
      const cta = document.querySelector<HTMLElement>(".final-cta");
      setNearEnd(Boolean(cta && cta.getBoundingClientRect().top < window.innerHeight * .9));
      setReady(true);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [mounted, reducedMotion]);

  return <>
    <div className={`hero-film-anchor ${ready ? "hero-film-anchor-ready" : ""}`} ref={anchorRef} aria-hidden="true">
      <span>BRUEL / FILM 001</span><strong>PROCESSO<br />EM MOVIMENTO.</strong><small>{src ? "TATTOO / PROCESS" : "FILM / EM BREVE"}</small>
    </div>
    {mounted && createPortal(<div className={`film-player ${floating ? "film-player-floating" : ""} ${!ready || nearEnd || obscured ? "film-player-hidden" : ""}`} ref={filmRef} aria-hidden="true">
      <div className="film-media">
        {src ? <video ref={videoRef} src={src} poster={poster} autoPlay={!reducedMotion} muted loop playsInline controls={false} preload="metadata" disablePictureInPicture disableRemotePlayback /> : <div className="film-placeholder"><strong>BRUEL</strong><span>FILM / EM BREVE</span></div>}
        <div className="film-treatment" />
        <div className="film-topline"><span>CAM_01<br /><b>PROCESS_FEED</b></span><span className="film-rec"><i /> REC</span></div>
        <div className="film-bottomline"><span>BRUEL<br /><b>TATTOO / ESTÚDIO</b></span><span className="film-timecode">{src ? "00:15 / LOOP" : "EM BREVE"}</span></div>
      </div>
    </div>, document.body)}
  </>;
}
