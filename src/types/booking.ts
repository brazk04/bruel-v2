export type BookingFormData = {
  name: string;
  whatsapp: string;
  instagram: string;
  city: string;
  idea: string;
  style: string;
  bodyPlacement: string;
  bodyPlacementDetails: string;
  size: string;
  sizeCm: string;
  color: string;
  firstTattoo: "Sim" | "Não" | "";
  availability: string[];
  preferredPeriod: string;
  notes: string;
};

export type BookingField = keyof BookingFormData;
export type BookingErrors = Partial<Record<BookingField, string>>;
export type BookingReference = { id: string; file: File; url: string };
