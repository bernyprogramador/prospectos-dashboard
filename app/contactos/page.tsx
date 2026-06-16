import StatusBadge from "@/components/StatusBadge";
import { getContactosConEmpresa } from "@/lib/airtable";

export const revalidate = 60;

// Borde lateral izquierdo por paso del funnel
const ROW_BORDER: Record<string, string> = {
  "No contactado":    "border-l-line",
  "En cola":          "border-l-yellow-400",
  "Email enviado":    "border-l-blue-400",
  "Respondió":        "border-l-mint",
  "Reunión acordada": "border-l-mint",
  "Descartado":       "border-l-danger",
  "No contactar":     "border-l-danger",
};

// Leyenda de pasos en orden
const LEYENDA = [
  { label: "No contactado", color: "bg-line" },
  { label: "En cola",       color: "bg-yellow-400" },
  { label: "Email enviado", color: "bg-blue-400" },
  { label: "Respondió",     color: "bg-mint" },
  { label: "Reunión",       color: "bg-mint" },
  { label: "Descartado",    color: "bg-danger" },
];

export default async function ContactosPage() {
  const contactos = await getContactosConEmpresa();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Contactos</h1>
        <span className="text-sm text-muted">{contactos.length} contactos</span>
      </div>

      {/* Leyenda visual de pasos */}
      <div className="flex flex-wrap gap-3 text-xs">
        {LEYENDA.map((step) => (
          <span key={step.label} className="flex items-center gap-1.5 text-muted">
            <span className={`h-2.5 w-1 rounded-full ${step.color}`} />
            {step.label}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-thead text-xs font-semibold uppercase tracking-wide text-minttext">
            <tr>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Contacto</th>
              <th className="px-4 py-3">Cargo</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">No contactar</th>
              <th className="px-4 py-3">LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c, i) => {
              const borderCls = ROW_BORDER[c.estadoContacto] ?? "border-l-line";
              const baseBg    = i % 2 === 0 ? "bg-card" : "bg-rowalt";
              return (
                <tr
                  key={c.id}
                  className={`border-l-[3px] ${borderCls} ${baseBg} hover:bg-line/30 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-ink">{c.empresa}</td>
                  <td className="px-4 py-3 text-ink">{c.nombre}</td>
                  <td className="px-4 py-3 text-muted">{c.cargo}</td>
                  <td className="px-4 py-3 text-muted">{c.decisor}</td>
                  <td className="px-4 py-3 text-muted">{c.email}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.estadoContacto} />
                  </td>
                  <td className="px-4 py-3">{c.noContactar ? "🚫 Sí" : "—"}</td>
                  <td className="px-4 py-3">
                    {c.linkedin ? (
                      <a
                        href={c.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-minttext hover:underline"
                      >
                        Ver →
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
