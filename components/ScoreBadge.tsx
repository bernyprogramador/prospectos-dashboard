function scoreStyle(score: number): { cls: string; label: string } {
  if (score >= 8) return { cls: "bg-danger text-white", label: "Alta" };
  if (score >= 5) return { cls: "bg-warn text-black", label: "Media" };
  if (score >= 3) return { cls: "bg-mint text-base", label: "Baja" };
  return { cls: "bg-line text-muted", label: "Descartar" };
}

export default function ScoreBadge({ score }: { score: number }) {
  const { cls, label } = scoreStyle(score);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}
    >
      {score} · {label}
    </span>
  );
}
