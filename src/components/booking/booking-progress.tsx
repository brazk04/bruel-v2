import { bookingSteps } from "@/data/booking-options";

export function BookingProgress({ step }: { step: number }) {
  return <div className="booking-progress" aria-label="Progresso do pré-agendamento"><div className="booking-progress-top"><span>ETAPA {String(step + 1).padStart(2, "0")} / 06</span><span>{bookingSteps[step].toUpperCase()}</span></div><ol>{bookingSteps.map((label, index) => <li key={label} className={index < step ? "booking-progress-done" : index === step ? "booking-progress-current" : ""} aria-current={index === step ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b></li>)}</ol></div>;
}
