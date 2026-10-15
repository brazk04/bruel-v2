"use client";

import { useRef } from "react";
import Image from "next/image";
import { availabilityOptions, bodyPlacements, tattooColors, tattooSizes, tattooStyles } from "@/data/booking-options";
import { formatBrazilianPhone, normalizePhone } from "@/lib/booking";
import type { BookingErrors, BookingField, BookingFormData, BookingReference } from "@/types/booking";

type Update = <K extends BookingField>(field: K, value: BookingFormData[K]) => void;
type FieldsProps = { data: BookingFormData; errors: BookingErrors; update: Update };

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return <div className={`booking-field ${error ? "booking-field-error" : ""}`}><label htmlFor={id}>{label}</label>{hint && <p className="booking-field-hint" id={`${id}-hint`}>{hint}</p>}{children}{error && <p className="booking-error" id={`${id}-error`} role="alert">{error}</p>}</div>;
}

function Choices({ name, label, options, value, onChange, multiple = false, error }: { name: string; label: string; options: readonly string[]; value: string | string[]; onChange: (value: string) => void; multiple?: boolean; error?: string }) {
  return <fieldset className={`booking-choices ${error ? "booking-field-error" : ""}`} aria-describedby={error ? `${name}-error` : undefined}><legend>{label}</legend><div className="booking-choice-list">{options.map(option => {
    const selected = Array.isArray(value) ? value.includes(option) : value === option;
    return <label className={`booking-choice ${selected ? "booking-choice-selected" : ""}`} key={option}><input type={multiple ? "checkbox" : "radio"} name={name} value={option} checked={selected} onChange={() => onChange(option)} /><span>{option}</span><b aria-hidden="true">{selected ? "×" : "+"}</b></label>;
  })}</div>{error && <p className="booking-error" id={`${name}-error`} role="alert">{error}</p>}</fieldset>;
}

export function PersonalStep({ data, errors, update }: FieldsProps) {
  return <div className="booking-fields booking-fields-two">
    <Field id="booking-name" label="NOME *" error={errors.name}><input id="booking-name" name="name" required autoComplete="name" value={data.name} onChange={event => update("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "booking-name-error" : undefined} maxLength={100} /></Field>
    <Field id="booking-whatsapp" label="WHATSAPP *" hint="Com DDD, para o Bruel responder ao seu pedido." error={errors.whatsapp}><input id="booking-whatsapp" name="whatsapp" type="tel" inputMode="tel" required autoComplete="tel" placeholder="(64) 99999-9999" value={formatBrazilianPhone(data.whatsapp)} onChange={event => update("whatsapp", normalizePhone(event.target.value))} aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? "booking-whatsapp-error" : "booking-whatsapp-hint"} /></Field>
    <Field id="booking-instagram" label="INSTAGRAM / OPCIONAL"><input id="booking-instagram" name="instagram" autoComplete="off" placeholder="@seuperfil" value={data.instagram} onChange={event => update("instagram", event.target.value)} maxLength={80} /></Field>
    <Field id="booking-city" label="CIDADE *" error={errors.city}><input id="booking-city" name="city" required autoComplete="address-level2" value={data.city} onChange={event => update("city", event.target.value)} aria-invalid={!!errors.city} aria-describedby={errors.city ? "booking-city-error" : undefined} maxLength={100} /></Field>
  </div>;
}

export function IdeaStep({ data, errors, update }: FieldsProps) {
  return <div className="booking-fields"><Field id="booking-idea" label="CONTA UM POUCO DA SUA IDEIA *" hint="Referências, símbolos, composição, significado ou qualquer detalhe que ajude a entender o projeto." error={errors.idea}><textarea id="booking-idea" name="idea" required rows={9} maxLength={1500} value={data.idea} onChange={event => update("idea", event.target.value)} aria-invalid={!!errors.idea} aria-describedby={errors.idea ? "booking-idea-error" : "booking-idea-hint"} /></Field><span className="booking-counter">{data.idea.length} / 1500</span></div>;
}

export function TattooStep({ data, errors, update }: FieldsProps) {
  return <div className="booking-fields">
    <Choices name="style" label="ESTILO / SE SOUBER" options={tattooStyles} value={data.style} onChange={value => update("style", value)} />
    <Choices name="bodyPlacement" label="LOCAL DO CORPO *" options={bodyPlacements} value={data.bodyPlacement} onChange={value => update("bodyPlacement", value)} error={errors.bodyPlacement} />
    <Field id="booking-placement-detail" label="QUER DETALHAR O LOCAL? / OPCIONAL"><input id="booking-placement-detail" value={data.bodyPlacementDetails} onChange={event => update("bodyPlacementDetails", event.target.value)} placeholder="Ex.: parte interna do antebraço" maxLength={120} /></Field>
    <Choices name="size" label="TAMANHO APROXIMADO" options={tattooSizes} value={data.size} onChange={value => update("size", value)} />
    <Field id="booking-size-cm" label="MEDIDA EM CM / SE SOUBER" error={errors.sizeCm}><div className="booking-unit-input"><input id="booking-size-cm" name="sizeCm" inputMode="decimal" value={data.sizeCm} onChange={event => update("sizeCm", event.target.value.replace(/[^\d.,]/g, "").slice(0, 8))} placeholder="15" aria-invalid={!!errors.sizeCm} aria-describedby={errors.sizeCm ? "booking-size-cm-error" : undefined} /><span>CM</span></div></Field>
    <Choices name="color" label="COR" options={tattooColors} value={data.color} onChange={value => update("color", value)} />
    <Choices name="firstTattoo" label="É SUA PRIMEIRA TATTOO?" options={["Sim", "Não"]} value={data.firstTattoo} onChange={value => update("firstTattoo", value as "Sim" | "Não")} />
  </div>;
}

export function ReferencesStep({ references, error, onAdd, onReplace, onRemove }: { references: BookingReference[]; error: string; onAdd: (files: FileList | null) => void; onReplace: (id: string, file: File | undefined) => void; onRemove: (id: string) => void }) {
  const addRef = useRef<HTMLInputElement>(null);
  return <div className="booking-references"><p>Escolha até cinco imagens de referência. PNG, JPG ou WEBP, até 10 MB por arquivo.</p><input className="booking-file-input" ref={addRef} type="file" tabIndex={-1} accept="image/png,image/jpeg,image/webp" multiple onChange={event => { onAdd(event.target.files); event.target.value = ""; }} aria-label="Selecionar imagens de referência" /><button type="button" className="booking-upload" onClick={() => addRef.current?.click()} disabled={references.length >= 5}><span aria-hidden="true">+</span><strong>ADICIONAR REFERÊNCIAS</strong><small>{references.length} / 5 SELECIONADAS</small></button>{error && <p className="booking-error" role="alert">{error}</p>}
    {references.length > 0 && <div className="booking-reference-grid">{references.map(reference => <ReferenceCard key={reference.id} reference={reference} onReplace={onReplace} onRemove={onRemove} />)}</div>}
    <p className="booking-reference-note">As imagens permanecem apenas neste navegador. Elas não são enviadas pelo site nem anexadas automaticamente à mensagem. Você poderá enviá-las na conversa do WhatsApp.</p>
  </div>;
}

function ReferenceCard({ reference, onReplace, onRemove }: { reference: BookingReference; onReplace: (id: string, file: File | undefined) => void; onRemove: (id: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return <div className="booking-reference-card"><div className="booking-reference-image"><Image src={reference.url} alt={`Referência selecionada: ${reference.file.name}`} fill unoptimized sizes="(max-width: 767px) 45vw, 180px" /></div><span title={reference.file.name}>{reference.file.name}</span><div className="booking-reference-actions"><a href={reference.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver referência ${reference.file.name}`}>VER ↗</a><button type="button" onClick={() => inputRef.current?.click()} aria-label={`Trocar referência ${reference.file.name}`}>TROCAR</button><button type="button" onClick={() => onRemove(reference.id)} aria-label={`Remover ${reference.file.name}`}>REMOVER</button></div><input className="booking-file-input" ref={inputRef} type="file" tabIndex={-1} accept="image/png,image/jpeg,image/webp" onChange={event => { onReplace(reference.id, event.target.files?.[0]); event.target.value = ""; }} aria-label={`Escolher outra imagem para ${reference.file.name}`} /></div>;
}

export function AvailabilityStep({ data, update }: FieldsProps) {
  const toggle = (value: string) => update("availability", data.availability.includes(value) ? data.availability.filter(item => item !== value) : [...data.availability, value]);
  return <div className="booking-fields"><Choices name="availability" label="QUANDO VOCÊ COSTUMA TER DISPONIBILIDADE?" options={availabilityOptions} value={data.availability} onChange={toggle} multiple /><Field id="booking-period" label="ALGUMA DATA OU PERÍODO ESPECÍFICO? / OPCIONAL"><input id="booking-period" value={data.preferredPeriod} onChange={event => update("preferredPeriod", event.target.value)} maxLength={180} placeholder="Ex.: segunda quinzena do mês" /></Field><Field id="booking-notes" label="OBSERVAÇÕES SOBRE O PROJETO / OPCIONAL"><textarea id="booking-notes" rows={5} maxLength={700} value={data.notes} onChange={event => update("notes", event.target.value)} /></Field></div>;
}
