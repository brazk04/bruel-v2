import type { BookingErrors, BookingFormData } from "@/types/booking";

export const initialBookingData: BookingFormData = {
  name: "", whatsapp: "", instagram: "", city: "", idea: "", style: "", bodyPlacement: "", bodyPlacementDetails: "",
  size: "", sizeCm: "", color: "", firstTattoo: "", availability: [], preferredPeriod: "", notes: "",
};

export function normalizePhone(value: string) { return value.replace(/\D/g, "").slice(0, 13); }

export function formatBrazilianPhone(value: string) {
  const digits = normalizePhone(value);
  const hasCountry = digits.startsWith("55") && digits.length > 11;
  const local = hasCountry ? digits.slice(2) : digits;
  const area = local.slice(0, 2);
  const number = local.slice(2);
  const formatted = area.length === 2 ? `(${area}) ${number.slice(0, number.length > 8 ? 5 : 4)}${number.length > (number.length > 8 ? 5 : 4) ? `-${number.slice(number.length > 8 ? 5 : 4)}` : ""}` : area;
  return hasCountry ? `+55 ${formatted}` : formatted;
}

export function validateBookingStep(data: BookingFormData, step: number): BookingErrors {
  const errors: BookingErrors = {};
  if (step === 0) {
    if (data.name.trim().length < 2) errors.name = "Informe seu nome para continuar.";
    const phone = data.whatsapp.startsWith("55") && data.whatsapp.length > 11 ? data.whatsapp.slice(2) : data.whatsapp;
    if (!/^\d{10,11}$/.test(phone)) errors.whatsapp = "Digite um WhatsApp com DDD válido.";
    if (data.city.trim().length < 2) errors.city = "Informe sua cidade para continuar.";
  }
  if (step === 1 && data.idea.trim().length < 10) errors.idea = "Conte um pouco mais sobre sua ideia (ao menos 10 caracteres).";
  if (step === 2 && !data.bodyPlacement) errors.bodyPlacement = "Escolha o local do corpo, mesmo que seja aproximado.";
  if (step === 2 && data.sizeCm.trim() && (!/^\d+(?:[.,]\d+)?$/.test(data.sizeCm) || Number(data.sizeCm.replace(",", ".")) <= 0)) errors.sizeCm = "Informe uma medida válida e maior que zero, ou deixe em branco.";
  return errors;
}

export function buildBookingWhatsAppMessage(data: BookingFormData, referenceCount = 0) {
  const lines = [
    "Olá, Bruel! Vim pelo seu site e gostaria de solicitar um orçamento para uma tattoo.",
    "", "— DADOS",
    `Nome: ${data.name.trim()}`,
    `WhatsApp: ${formatBrazilianPhone(data.whatsapp)}`,
    ...(data.instagram.trim() ? [`Instagram: ${data.instagram.trim()}`] : []),
    `Cidade: ${data.city.trim()}`,
    "", "— TATTOO",
    ...(data.style ? [`Estilo: ${data.style}`] : []),
    `Local: ${data.bodyPlacement}${data.bodyPlacementDetails.trim() ? ` — ${data.bodyPlacementDetails.trim()}` : ""}`,
    ...(data.size ? [`Tamanho: ${data.size}`] : []),
    ...(data.sizeCm.trim() ? [`Medida aproximada: ${data.sizeCm.trim()} cm`] : []),
    ...(data.color ? [`Cor: ${data.color}`] : []),
    ...(data.firstTattoo ? [`Primeira tattoo: ${data.firstTattoo}`] : []),
    "", "— IDEIA", data.idea.trim(),
    ...(data.availability.length || data.preferredPeriod.trim() ? ["", "— DISPONIBILIDADE", ...(data.availability.length ? [data.availability.join(" / ")] : []), ...(data.preferredPeriod.trim() ? [`Período: ${data.preferredPeriod.trim()}`] : [])] : []),
    ...(data.notes.trim() ? ["", "— OBSERVAÇÕES", data.notes.trim()] : []),
    ...(referenceCount ? ["", `Tenho ${referenceCount} ${referenceCount === 1 ? "referência" : "referências"} e posso ${referenceCount === 1 ? "enviá-la" : "enviá-las"} nesta conversa.`] : []),
  ];
  return lines.join("\n");
}
