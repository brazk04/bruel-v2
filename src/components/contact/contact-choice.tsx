"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { DIRECT_TATTOO_MESSAGE, getWhatsAppUrl } from "@/lib/constants/contact";
import { lockPageScroll } from "@/lib/scroll-lock";
import { trapDialogTab } from "@/lib/dialog-focus";
import "./contact-choice.css";

const ContactChoiceContext = createContext<((trigger: HTMLButtonElement, onNavigate?: () => void) => void) | null>(null);

export function ContactChoiceProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstOptionRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const navigationRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const unlock = lockPageScroll();
    if (!dialog.open) dialog.showModal();
    const frame = requestAnimationFrame(() => firstOptionRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      if (dialog.open) dialog.close();
      unlock();
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);
  const openChoice = (trigger: HTMLButtonElement, onNavigate?: () => void) => { triggerRef.current = trigger; navigationRef.current = onNavigate; setOpen(true); };
  const finishChoice = () => { navigationRef.current?.(); close(); };
  const keepFocusInside = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    trapDialogTab(event, dialogRef.current);
  };

  return <ContactChoiceContext.Provider value={openChoice}>{children}<dialog id="contact-choice-dialog" ref={dialogRef} className="contact-choice-dialog" aria-labelledby="contact-choice-title" aria-describedby="contact-choice-description" onCancel={event => { event.preventDefault(); close(); }} onMouseDown={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={keepFocusInside}>
    <div className="contact-choice-inner"><div className="contact-choice-top"><span>START / PROJECT</span><button type="button" onClick={close} aria-label="Fechar opções de contato">FECHAR <span aria-hidden="true">×</span></button></div><div className="contact-choice-copy"><span>BRUEL / CONTATO</span><h2 id="contact-choice-title">Como você prefere<br /><em>começar?</em></h2><p id="contact-choice-description">Conte os detalhes da sua ideia para agilizar o orçamento ou fale direto com Bruel pelo WhatsApp.</p></div><div className="contact-choice-options"><Link ref={firstOptionRef} href="/agendar" onClick={finishChoice} className="contact-choice-option contact-choice-option-primary"><span>01 / PRÉ-AGENDAMENTO</span><strong>DETALHAR MINHA IDEIA <b aria-hidden="true">→</b></strong><small>Leva cerca de 2 minutos e ajuda a entender melhor o projeto.</small></Link><a href={getWhatsAppUrl(DIRECT_TATTOO_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={finishChoice} className="contact-choice-option contact-choice-option-secondary"><span>02 / CONVERSA DIRETA</span><strong>FALAR DIRETO NO WHATSAPP <b aria-hidden="true">↗</b></strong><small>Prefere conversar primeiro? Sem problema.</small></a></div></div>
  </dialog></ContactChoiceContext.Provider>;
}

export function ContactChoiceTrigger({ className = "", children, onClick, onNavigate, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; onNavigate?: () => void }) {
  const openChoice = useContext(ContactChoiceContext);
  if (!openChoice) throw new Error("ContactChoiceTrigger precisa estar dentro de ContactChoiceProvider.");
  return <button {...props} type="button" className={`contact-choice-trigger ${className}`} aria-haspopup="dialog" aria-controls="contact-choice-dialog" onClick={event => { onClick?.(event); if (!event.defaultPrevented) openChoice(event.currentTarget, onNavigate); }}>{children}</button>;
}
