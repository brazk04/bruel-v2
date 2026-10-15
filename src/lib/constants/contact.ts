export const WHATSAPP_NUMBER = "556492238064";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Bruel! Vim pelo seu site e gostaria de conversar sobre uma tattoo e solicitar um orçamento. Tenho uma ideia em mente e queria saber como funciona o processo de agendamento.";

export const STREET_WHATSAPP_MESSAGE =
  "Olá, Bruel! Vim pelo seu site e gostaria de conversar sobre um projeto de graffiti ou arte urbana.";

export const DIRECT_TATTOO_MESSAGE =
  "Olá, Bruel! Vim pelo seu site e queria conversar sobre uma tattoo.";

export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
