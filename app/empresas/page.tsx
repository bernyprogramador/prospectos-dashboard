import StatusBadge from "@/components/StatusBadge";
import { getEmpresas } from "@/lib/airtable";

export const revalidate = 60;

const SECTOR_COLOR: Record<string, string> = {
  "Gestoría/Asesoría": "text-minttext",
  "Inmobiliaria/Promotora": "text-warn",
  "Entidad pública compatible": "text-[#60a5fa]",
  "Otro": "text-muted",
};

export default async function EmpresasPage() {
  const empresas = await getEmpresas();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Empresas</h1>
        <span className="text-sm text-muted">{empresas.length} empresas</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-thead text-xs font-semibold uppercase tracking-wide text-minttext">
            <tr>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Empleados</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Web</th>
              <th className="px-4 py-3">LinkedIn</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-rowalt [&>tr:nth-child(odd)]:bg-card">
            {empresas.map((e) => (
              <tr key={e.id} className="hover:bg-line/40">
                <td className="px-4 py-3 font-medium text-ink">{e.nombre}</td>
                <td className={`px-4 py-3 font-medium ${SECTOR_COLOR[e.sector] ?? "text-muted"}`}>
                  {e.sector}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={e.estado} />
                </td>
                <td className="px-4 py-3 text-muted">{e.tamanyo || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-bold ${
                      e.score >= 7
                        ? "text-minttext"
                        : e.score >= 4
                        ? "text-warn"
                        : "text-muted"
                    }`}
                  >
                    {e.score}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {e.web ? (
                    <a
                      href={e.web}
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
                <td className="px-4 py-3">
                  {e.linkedin ? (
                    <a
                      href={e.linkedin}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
