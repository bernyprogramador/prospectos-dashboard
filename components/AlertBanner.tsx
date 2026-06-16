"use client";

import { useState } from "react";

export type Alert = {
  id: string;
  severity: "critico" | "aviso";
  message: string;
};

export default function AlertBanner({ alerts }: { alerts: Alert[] }) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = alerts.filter((a) => !dismissed.includes(a.id));

  if (visible.length === 0) return null;

  return (
    <div className="space-y-2">
      {visible.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start justify-between rounded-md border-l-4 px-4 py-2.5 text-sm font-medium ${
            alert.severity === "critico"
              ? "border-l-white bg-danger text-white"
              : "border-l-black/40 bg-warn text-black"
          }`}
        >
          <span>
            {alert.severity === "critico" ? "🔴" : "🟡"} {alert.message}
          </span>
          <button
            onClick={() => setDismissed((d) => [...d, alert.id])}
            className="ml-4 shrink-0 text-xs opacity-60 hover:opacity-100"
            aria-label="Cerrar alerta"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
