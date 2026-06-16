import { getContactosConEmpresa, type Contacto } from "@/lib/airtable";

export const revalidate = 60;

// Pasos del funnel en orden
const PASOS = [
  {
    key: "No contactado",
    label: "No contactado",
    color: "border-t-zinc-500",
    badge: "bg-zinc-800 text-zinc-400",
    dot: "bg-zinc-500",
  },
  {
    key: "En cola",
    label: "En cola",
    color: "border-t-yellow-400",
    badge: "bg-yellow-500/20 text-yellow-300",
    dot: "bg-yellow-400",
  },
  {
    key: "Email enviado",
    label: "Email enviado",
    color: "border-t-blue-400",
    badge: "bg-blue-500/20 text-blue-300",
    dot: "bg-blue-400",
  },
  {
    key: "Respondió",
    label: "Respondió",
    color: "border-t-mint",
    badge: "bg-mint/20 text-mint",
    dot: "bg-mint",
  },
  {
    key: "Reunión acordada",
    label: "Reunión acordada",
    color: "border-t-mint",
    badge: "bg-mint/20 text-mint",
    dot: "bg-mint",
  },
  {
    key: "Descartado",
    label: "Descartado",
    color: "border-t-danger",
    badge: "bg-danger/20 text-danger",
    dot: "bg-danger",
  },
];

function ContactoCard({ c }: { c: Contacto }) {
  return (
    <div className="rounded-lg border border-line bg-card p-3 space-y-1.5 hover:bg-line/20 transition-colors">
      <p className="text-sm font-medium text-white leading-tight">{c.nombre}</p>
      <p className="text-xs text-muted">{c.cargo}</p>
      <p className="text-xs text-muted/70 truncate">{c.empresa}</p>
      {c.email && c.email !== "—" && (
        <p className="text-xs text-muted/50 truncate">{c.email}</p>
      )}
      <div className="flex items-center gap-2 pt-1">
        {c.linkedin && (
          <a
            href={c.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-mint hover:underline"
          >
            LinkedIn →
          </a>
        )}
        {c.noContactar && (
          <span className="text-[10px] text-danger">🚫 No contactar</span>
        )}
      </div>
    </div>
  );
}

export default async function PipelinePage() {
  const contactos = await getContactosConEmpresa();

  // Agrupar por estado
  const grupos: Record<string, Contacto[]> = {};
  for (const paso of PASOS) {
    grupos[paso.key] = contactos.filter(
      (c) => c.estadoContacto === paso.key
    );
  }

  // Contactos sin estado conocido → "No contactado"
  const estadosConocidos = new Set(PASOS.map((p) => p.key));
  const sinEstado = contactos.filter(
    (c) => !estadosConocidos.has(c.estadoContacto)
  );
  grupos["No contactado"] = [...(grupos["No contactado"] ?? []), ...sinEstado];

  const total = contactos.length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Pipeline</h1>
          <p className="text-sm text-muted mt-0.5">
            {total} contactos · actualiza estado en Airtable
          </p>
        </div>
        {/* Resumen rápido */}
        <div className="flex gap-2 text-xs">
          {PASOS.filter((p) => grupos[p.key]?.length > 0).map((p) => (
            <span
              key={p.key}
              className={`rounded-full px-2.5 py-1 font-medium ${p.badge}`}
            >
              {p.label} {grupos[p.key].length}
            </span>
          ))}
        </div>
      </div>

      {/* Columnas kanban */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {PASOS.map((paso) => {
          const items = grupos[paso.key] ?? [];
          return (
            <div
              key={paso.key}
              className={`flex-shrink-0 w-56 rounded-lg border border-line border-t-2 ${paso.color} bg-panel`}
            >
              {/* Header columna */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-line">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${paso.dot}`} />
                  <span className="text-xs font-semibold text-white">
                    {paso.label}
                  </span>
                </div>
                <span className="text-xs text-muted font-medium">
                  {items.length}
                </span>
              </div>

              {/* Tarjetas */}
              <div className="p-2 space-y-2 min-h-[120px]">
                {items.length === 0 ? (
                  <p className="text-center text-xs text-muted/40 py-6">
                    —
                  </p>
                ) : (
                  items.map((c) => <ContactoCard key={c.id} c={c} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
