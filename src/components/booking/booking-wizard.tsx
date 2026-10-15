"use client";

import { useEffect, useRef, useState } from "react";
import { BookingProgress } from "@/components/booking/booking-progress";
import { BookingReview } from "@/components/booking/booking-review";
import { AvailabilityStep, IdeaStep, PersonalStep, ReferencesStep, TattooStep } from "@/components/booking/booking-fields";
import { bookingSteps } from "@/data/booking-options";
import { useBookingReferences } from "@/hooks/use-booking-references";
import { buildBookingWhatsAppMessage, initialBookingData, validateBookingStep } from "@/lib/booking";
import { getWhatsAppUrl } from "@/lib/constants/contact";
import type { BookingErrors, BookingField, BookingFormData } from "@/types/booking";

const descriptions = [
  "Vamos começar pelo básico para que o Bruel possa responder ao seu pedido.",
  "Um ponto de partida para transformar o que você imaginou em desenho.",
  "Algumas escolhas ajudam a entender escala, superfície e direção.",
  "Imagens ajudam a explicar uma intenção. Você poderá enviá-las na conversa.",
  "Conte quando costuma estar livre. Nenhuma data será reservada ainda.",
  "Seu pedido está pronto para virar uma conversa.",
];

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<BookingFormData>(initialBookingData);
  const [errors, setErrors] = useState<BookingErrors>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStepRef = useRef(step);
  const references = useBookingReferences();

  useEffect(() => {
    if (previousStepRef.current === step) return;
    previousStepRef.current = step;
    const frame = requestAnimationFrame(() => {
      const active = document.activeElement;
      if (document.querySelector("dialog[open]") || (active instanceof HTMLElement && panelRef.current?.contains(active) && active.matches("input, textarea, .booking-upload"))) return;
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [step]);

  const update = <K extends BookingField>(field: K, value: BookingFormData[K]) => {
    setData(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  };

  const validateCurrentStep = () => {
    const found = validateBookingStep(data, step);
    setErrors(found);
    if (Object.keys(found).length) {
      const field = Object.keys(found)[0];
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus());
      return false;
    }
    return true;
  };

  const next = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    setStep(editing ? 5 : Math.min(step + 1, 5));
    setEditing(false);
  };

  const back = () => {
    if (editing) {
      if (!validateCurrentStep()) return;
      setStep(5); setEditing(false);
    } else { setErrors({}); setStep(current => Math.max(0, current - 1)); }
  };

  const edit = (target: number) => { setErrors({}); setEditing(true); setStep(target); };
  const message = buildBookingWhatsAppMessage(data, references.references.length);

  return <div className="booking-wizard" id="booking-flow"><BookingProgress step={step} /><div className="booking-layout"><div className="booking-editorial"><span>BRUEL / PRÉ-AGENDAMENTO</span><h1 ref={headingRef} className={step === 3 || step === 4 ? "booking-title-long" : undefined} tabIndex={-1}>{step === 5 ? "Seu pedido." : bookingSteps[step] + "."}</h1><p>{descriptions[step]}</p><div className="booking-editorial-end"><span>PELE / DESENHO / IDENTIDADE</span><b aria-hidden="true">B—R</b></div></div>
      <div className="booking-panel" ref={panelRef} data-booking-panel>
        <div className="booking-panel-header"><span>{String(step + 1).padStart(2, "0")} / 06</span><span>{bookingSteps[step].toUpperCase()}</span></div>
        {step < 5 ? <form onSubmit={next} noValidate>
          {step === 0 && <PersonalStep data={data} errors={errors} update={update} />}
          {step === 1 && <IdeaStep data={data} errors={errors} update={update} />}
          {step === 2 && <TattooStep data={data} errors={errors} update={update} />}
          {step === 3 && <ReferencesStep references={references.references} error={references.error} onAdd={references.add} onReplace={references.replace} onRemove={references.remove} />}
          {step === 4 && <AvailabilityStep data={data} errors={errors} update={update} />}
          <div className="booking-navigation"><button type="button" onClick={back} disabled={step === 0 && !editing}>VOLTAR</button><button type="submit" className="booking-next">{editing || step === 4 ? "REVISAR PEDIDO" : "CONTINUAR"} <span aria-hidden="true">→</span></button></div>
        </form> : <><BookingReview data={data} referenceCount={references.references.length} message={message} onEdit={edit} /><div className="booking-navigation"><button type="button" onClick={back}>VOLTAR</button><a className="booking-next" href={getWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">ENVIAR PEDIDO NO WHATSAPP <span aria-hidden="true">↗</span></a></div><p className="booking-send-note">O WhatsApp abrirá com a mensagem preenchida. Revise e toque em enviar para compartilhar seu pedido.</p></>}
        <p className="booking-privacy">Seus dados não são enviados pelo site nesta etapa. Ao finalizar, eles serão inseridos na mensagem que você poderá enviar pelo WhatsApp.</p>
      </div>
    </div></div>;
}
