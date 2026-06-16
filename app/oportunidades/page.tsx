import StatusBadge from "@/components/StatusBadge";
import { getOportunidades } from "@/lib/airtable";

export const revalidate = 60;

export default async function OportunidadesPage() {
  const oportunidades = await getOportunidades();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Oportunidades</h1>
        <span className="text-sm text-muted">{oportunidades.length} oportunidades</span>
      </div>

      {oportunidades.length === 0 ? (
        <div className="rounded-lg border border-line bg-panel p-8 text-center text-muted">
          Las oportunidades aparecerán aquí cuando un lead responda y pase a la siguiente etapa del pipeline.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {oportunidades.map((o) => (
            <div
              key={o.id}
              className="rounded-lg border border-line border-l-[3px] border-l-mint bg-card p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">{o.empresa}</p>
                <StatusBadge status={o.estado} />
              </div>
              <p className="text-xs text-muted">Contacto: {o.contacto}</p>

              <dl className="mt-3 space-y-1 text-sm">
                {o.reunionFecha && (
                  <div>
                    <span className="text-muted/70">Reunión: </span>
                    <span className="text-ink">📅 {o.reunionFecha}</span>
                  </div>
                )}
                {o.proximoPaso && (
                  <div>
                    <span className="text-muted/70">Próximo paso: </span>
                    <span className="text-ink">{o.proximoPaso}</span>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
