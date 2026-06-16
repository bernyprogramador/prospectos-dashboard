"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/empresas", label: "Empresas", icon: "🏢" },
  { href: "/contactos", label: "Contactos", icon: "👥" },
  { href: "/cola", label: "Pipeline", icon: "🎯" },
  { href: "/campanas", label: "Campañas", icon: "🚀" },
  { href: "/oportunidades", label: "Oportunidades", icon: "🎯" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-sidebar">
      <div className="px-5 pb-6 pt-8">
        <Image
          src="/logo-nexe.png"
          alt="Nexe · IA a Medida"
          width={1024}
          height={338}
          className="h-auto w-40 brightness-0 invert"
          priority
        />
        <p className="mt-4 text-sm font-bold text-white">ProspectOS</p>
      </div>
      <nav className="flex-1 px-3">
        {LINKS.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mb-1 flex items-center gap-2.5 rounded px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-mint/10 font-medium text-mint"
                  : "text-sidemuted hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-5 py-4 text-xs text-sidemuted">Conectado a Airtable · live</div>
    </aside>
  );
}
