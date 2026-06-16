import { saludEmail } from "@/lib/mockData";

function reboteColor(tasa: number): string {
  if (tasa < 1) return "text-minttext";
  if (tasa <= 2) return "text-warn";
  return "text-danger";
}

function respuestaColor(tasa: number): string {
  if (tasa > 15) return "text-minttext";
  if (tasa >= 5) return "text-warn";
  return "text-danger";
}

export default function EmailHealthCard() {
  const s = saludEmail;
  return (
    <div className="rounded-lg border border-line border-l-4 border-l-mint bg-card p-6">
      <h2 className="mb-4 text-lg font-bold text-ink">Salud del canal email</h2>
      <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Emails enviados</dt>
          <dd className="font-semibold text-ink">{s.emailsEnviados}</dd>
        </div>
        <div>
          <dt className="text-muted">Rebotes</dt>
          <dd className="font-semibold text-ink">{s.rebotes}</dd>
        </div>
        <div>
          <dt className="text-muted">Tasa de rebote</dt>
          <dd className={`font-semibold ${reboteColor(s.tasaRebote)}`}>{s.tasaRebote}%</dd>
        </div>
        <div>
          <dt className="text-muted">Tasa de respuesta</dt>
          <dd className={`font-semibold ${respuestaColor(s.tasaRespuesta)}`}>
            {s.tasaRespuesta}%
          </dd>
        </div>
        <div>
          <dt className="text-muted">Estado warmup</dt>
          <dd className="font-semibold text-ink">{s.estadoWarmup}</dd>
        </div>
        <div>
          <dt className="text-muted">Campañas</dt>
          <dd className="font-semibold text-ink">
            {s.campanasActivas} activas · {s.campanasPausadas} pausadas
          </dd>
        </div>
      </dl>
    </div>
  );
}
