"use client";

import { useEffect, useRef } from "react";
import { lockPageScroll } from "@/lib/scroll-lock";
import { trapDialogTab } from "@/lib/dialog-focus";

export function useMediaLightbox({ onClose, onPrevious, onNext }: { onClose: () => void; onPrevious: () => void; onNext: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const unlock = lockPageScroll();
    document.body.dataset.lightboxOpen = "true";
    dialog.showModal();
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); onClose(); }
      if (!(event.target instanceof HTMLVideoElement)) {
        if (event.key === "ArrowLeft") { event.preventDefault(); onPrevious(); }
        if (event.key === "ArrowRight") { event.preventDefault(); onNext(); }
      }
      trapDialogTab(event, dialog);
    };
    dialog.addEventListener("keydown", onKeyDown);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      if (dialog.open) dialog.close();
      unlock();
      delete document.body.dataset.lightboxOpen;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [onClose, onPrevious, onNext]);

  return { dialogRef, closeRef };
}
