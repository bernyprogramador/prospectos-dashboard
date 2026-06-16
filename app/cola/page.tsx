import { getContactosConEmpresa, type Contacto } from "@/lib/airtable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    color: "borde