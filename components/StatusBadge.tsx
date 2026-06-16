// Estados de pipeline, aprobación y campaña con colores Nexe.
const POSITIVE = "bg-mint/10 text-mint border border-mint/30";
const NEUTRAL  = "bg-white/5 text-muted border border-line";
const WARN     = "bg-warn/10 text-warn border border-warn/30";
const DANGER   = "bg-danger/10 text-danger border border-danger/30";
const PENDING  = "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30";
const BLUE     = "bg-blue-500/10 text-blue-300 border border-blue-500/30";

const STYLES: Record<string, string> = {
  // Aprobación
  Aprobado:  POSITIVE,
  Enviado:   POSITIVE,
  Pendiente: PENDING,
  Editar:    WARN,
  Pausado:   WARN,
  Rechazado: DANGER,
  // Pipeline contactos
  "No contactado":      NEUTRAL,
  "En cola":            PENDING,
  "Email enviado":      BLUE,
  Respondió:            POSITIVE,
  "Reunión acordada":   POSITIVE,
  Descartado:           DANGER,
  "No contactar":       DANGER,
  // Pipeline empresas
  Nueva:                NEUTRAL,
  Validada:             BLUE,
  "En contacto":        PENDING,
  Respondida:           POSITIVE,
  Interesada:           POSITIVE,
  "Reunión programada": POSITIVE,
  "Cerrada ganada":     POSITIVE,
  "Propuesta enviada":  BLUE,
  Negociación:          WARN,
  Descartada:           DANGER,
  // Campaña / warmup
  Activa:       POSITIVE,
  Listo:        POSITIVE,
  Pausada:      WARN,
  "En warmup":  WARN,
  Borrador:     NEUTRAL,
  "No iniciado":NEUTRAL,
  Problema:     DANGER,
};

export default function StatusBadge({ status }: { status: string }) {
  const cls = STYLES[status] ?? NEUTRAL;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}
    >
      {status}
    </span>
  );
}
