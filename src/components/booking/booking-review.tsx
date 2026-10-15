import { formatBrazilianPhone } from "@/lib/booking";
import type { BookingFormData } from "@/types/booking";

function ReviewRow({ label, value }: { label: string; value: string }) {
  return <div className="booking-review-row"><dt>{label}</dt><dd>{value || "—"}</dd></div>;
}

export function BookingReview({ data, referenceCount, message, onEdit }: { data: BookingFormData; referenceCount: number; message: string; onEdit: (step: number) => void }) {
  return <div className="booking-review"><p className="booking-review-lead">Confira os dados antes de abrir o WhatsApp. Você ainda poderá editar a mensagem lá.</p>
    <section><div className="booking-review-heading"><h2>01 / VOCÊ</h2><button type="button" onClick={() => onEdit(0)} aria-label="Editar seus dados">EDITAR ↗</button></div><dl><ReviewRow label="Nome" value={data.name} /><ReviewRow label="WhatsApp" value={formatBrazilianPhone(data.whatsapp)} /><ReviewRow label="Instagram" value={data.instagram} /><ReviewRow label="Cidade" value={data.city} /></dl></section>
    <section><div className="booking-review-heading"><h2>02 / IDEIA</h2><button type="button" onClick={() => onEdit(1)} aria-label="Editar ideia">EDITAR ↗</button></div><p className="booking-review-idea">{data.idea}</p></section>
    <section><div className="booking-review-heading"><h2>03 / TATTOO</h2><button type="button" onClick={() => onEdit(2)} aria-label="Editar detalhes da tattoo">EDITAR ↗</button></div><dl><ReviewRow label="Estilo" value={data.style} /><ReviewRow label="Local" value={[data.bodyPlacement, data.bodyPlacementDetails].filter(Boolean).join(" — ")} /><ReviewRow label="Tamanho" value={[data.size, data.sizeCm ? `${data.sizeCm} cm` : ""].filter(Boolean).join(" / ")} /><ReviewRow label="Cor" value={data.color} /><ReviewRow label="Primeira tattoo" value={data.firstTattoo} /></dl></section>
    <section><div className="booking-review-heading"><h2>04 / REFERÊNCIAS</h2><button type="button" onClick={() => onEdit(3)} aria-label="Editar referências">EDITAR ↗</button></div><p>{referenceCount ? `${referenceCount} ${referenceCount === 1 ? "imagem selecionada" : "imagens selecionadas"}. Envie na conversa depois de abrir o WhatsApp.` : "Nenhuma imagem selecionada."}</p></section>
    <section><div className="booking-review-heading"><h2>05 / DISPONIBILIDADE</h2><button type="button" onClick={() => onEdit(4)} aria-label="Editar disponibilidade">EDITAR ↗</button></div><dl><ReviewRow label="Horários" value={data.availability.join(" / ")} /><ReviewRow label="Período" value={data.preferredPeriod} /><ReviewRow label="Observações" value={data.notes} /></dl></section>
    <details className="booking-message-preview"><summary>VER MENSAGEM QUE SERÁ ABERTA ↗</summary><pre>{message}</pre></details>
  </div>;
}
