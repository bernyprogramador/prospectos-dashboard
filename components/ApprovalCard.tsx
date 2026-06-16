"use client";

import { useState } from "react";
import type { MensajeCola } from "@/lib/mockData";
import StatusBadge from "./StatusBadge";

const RISK_STYLES: Record<string, string> = {
  bajo: "bg-mint text-base",
  medio: "bg-warn text-black",
  alto: "bg-danger text-ink",
};

export default function ApprovalCard({ mensaje }: { mensaje: MensajeCola }) {
  const [status, setStatus] = useState(mensaje.approvalStatus);
  const [expanded, setExpanded] = useState(false);

  const requiereAlba = mensaje.mentionsFundae && mensaje.riskLevel === "alto";

  return (
    <div
      className={`rounded-lg border bg-card p-4 ${
        requiereAlba ? "border-2 border-danger" : "border-line"
      }`}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-ink">{mensaje.empresa}</p>
          <p className="text-xs text-muted">Para: {mensaje.contacto}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              RISK_STYLES[mensaje.riskLevel]
            }`}
          >
            Riesgo {mensaje.riskLevel}
          </span>
          <StatusBadge status={status} />
        </div>
      </div>

      {requiereAlba && (
        <p className="mb-2 rounded bg-danger/15 px-2 py-1 text-xs font-semibold text-danger">
          ⚠️ Requiere revisión de Alba
        </p>
      )}

      <p className="text-sm font-medium text-ink">{mensaje.asunto}</p>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1 text-xs text-minttext hover:underline"
      >
        {expanded ? "Ocultar cuerpo ▲" : "Ver cuerpo ▼"}
      </button>
      {expanded && (
        <pre className="mt-2 whitespace-pre-wrap rounded bg-base p-3 text-xs text-muted">
          {mensaje.cuerpo}
        </pre>
      )}

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted">
        <div>
          <span className="text-muted/70">Menciona FUNDAE: </span>
          <span className="font-medium text-ink">{mensaje.mentionsFundae ? "Sí" : "No"}</span>
        </div>
        <div>
          <span className="text-muted/70">Menciona normativa: </span>
          <span className="font-medium text-ink">{mensaje.mentionsNormativa ? "Sí" : "No"}</span>
        </div>
        <div className="col-span-2">
          <span className="text-muted/70">Motivo riesgo: </span>
          <span className="font-medium text-ink">{mensaje.motivoRiesgo}</span>
        </div>
        <div className="col-span-2">
          <span className="text-muted/70">Notas: </span>
          <span className="font-medium text-ink">{mensaje.notasPersonalizacion}</span>
        </div>
        <div className="col-span-2">
          <span className="text-muted/70">Acción sugerida IA: </span>
          <span className="font-medium text-ink">{mensaje.accionSugerida}</span>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          disabled={requiereAlba}
          onClick={() => setStatus("Aprobado")}
          title={
            requiereAlba
              ? "Este mensaje requiere revisión de Alba antes de aprobarse."
              : undefined
          }
          className="rounded-md bg-mint px-3 py-1.5 text-xs font-semibold text-base hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ✅ Aprobar
        </button>
        <button
          onClick={() => setStatus("Editar")}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink hover:bg-base"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => setStatus("Rechazado")}
          className="rounded-md bg-danger px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
        >
          ❌ Rechazar
        </button>
        <button
          onClick={() => setStatus("Pausado")}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-medium text-muted hover:bg-base"
        >
          ⏸ Pausar
        </button>
      </div>
    </div>
  );
}
