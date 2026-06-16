import { getContactosConEmpresa, type Contacto } from "@/lib/airtable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PASOS = [
  { key: "No contactado", label: "No contactado", color: "border-t-zinc-500", badge: "bg-zinc-800 text-zinc-400", dot: "bg-zinc-500" },
  { key: "En cola", label: "En cola", color: "border-t-yellow-400", badge: "bg-yellow-500/20 text-yellow-300", dot: "bg-yellow-400" },
  { key: "Email enviado", label: "Email enviado", color: "border-t-blue-400", badge: "bg-blue-500/20 text-blue-300", dot: "bg-blue-400" },
  { key: "Respondio", label: "Respondió", color: "border-t-green-400", badge: "bg-green-500/20 text-green-300", dot: "bg-green-400" },
  { key: "Reunion acordada", label: "Reunión acordada", color: "border-t-green-400", badge: "bg-green-500/20 text-green-300", dot: "bg-green-400" },
  { key: "Descartado", label: "Descartado", color: "border-t-red-500", badge: "bg-red-500/20 text-red-300", dot: "bg-red-500" },
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
          <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:underline">
            LinkedIn
          </a>
        )}
        {c.noContactar && (
          <span className="text-xs text-red-400">No contactar</span>
        )}
      </div>
    </div>
  );
}

export default async function PipelinePage() {
  let contactos: Contacto[] = [];
  try {
    contactos = await getContactosConEmpresa();
  } catch (e) {
    console.error("Error cargando contactos:", e);
  }

  const grupos: Record<string, Contacto[]> = {};
  for (const paso of PASOS) {
    grupos[paso.key] = contactos.filter((c) => c.estadoContacto === paso.key);
  }

  const estadosConocidos = new Set(PASOS.map((p) => p.key));
  const sinEstado = contactos.filter((c) => !estadosConocidos.has(c.estadoContacto));
  grupos["No contactado"] = [...(grupos["No contactado"] ?? []), ...sinEstado];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Pipeline</h1>
        <p className="text-sm text-muted mt-0.5">{contactos.length} contactos</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {PASOS.map((paso) => {
          const items = grupos[paso.key] ?? [];
          return (
            <div key={paso.key} className={"flex-shrink-0 w-56 rounded-lg border border-line border-t-2 " + paso.color + " bg-panel"}>
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-line">
                <div className="flex items-center gap-2">
                  <span className={"h-2 w-2 rounded-full " + paso.dot} />
                  <span className="text-xs font-semibold text-white">{paso.label}</span>
                </div>
                <span className="text-xs text-muted">{items.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-24">
                {items.length === 0 ? (
                  <p className="text-center text-xs text-muted/40 py-6">—</p>
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
