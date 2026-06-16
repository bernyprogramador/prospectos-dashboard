import { getCampanas } from "@/lib/airtable";

export const revalidate = 60;

export default async function CampanasPage() {
  const campanas = await getCampanas();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink">Campañas</h1>
      <p className="text-sm text-muted">
        Solo lectura — las campañas se gestionan desde n8n.
        {campanas.length === 0 && " Aún no hay campañas creadas."}
      </p>

      {campanas.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-thead text-xs font-semibold uppercase tracking-wide text-minttext">
              <tr>
                <th className="px-4 py-3">Campaña</th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:bg-rowalt [&>tr:nth-child(odd)]:bg-card">
              {campanas.map((c) => (
                <tr key={c.id} className="hover:bg-line/40">
                  <td className="px-4 py-3 font-medium text-ink">{c.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-line bg-panel p-8 text-center text-muted">
          Las campañas aparecerán aquí una vez que configures n8n y empieces a enviar.
        </div>
      )}
    </div>
  );
}
