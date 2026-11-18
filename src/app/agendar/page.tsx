import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { bookingTitles } from "@/data/booking-options";
import { getSiteContent } from "@/lib/cms/store";
import { DIRECT_TATTOO_MESSAGE, getWhatsAppUrl } from "@/lib/constants/contact";
import "./booking.css";

export const metadata: Metadata = {
  title: { absolute: "Agendar Tattoo — Bruel" },
  description: "Conte sua ideia, envie as informações do projeto e solicite um orçamento de tattoo com Bruel.",
};

export default async function AgendarPage() {
  const content = await getSiteContent();
  const titles = bookingTitles.map((title, index) => content[`booking.step.${index + 1}`] ?? title);
  return <div className="booking-page"><Container><div className="booking-intro"><span>PROJECT REQUEST / BRUEL</span><span>UMA IDEIA COMEÇA AQUI</span></div><div className="booking-direct"><span>Prefere conversar antes de detalhar sua ideia?</span><a href={getWhatsAppUrl(DIRECT_TATTOO_MESSAGE)} target="_blank" rel="noopener noreferrer">FALAR DIRETO NO WHATSAPP <span aria-hidden="true">↗</span></a></div><BookingWizard titles={titles} /></Container></div>;
}
