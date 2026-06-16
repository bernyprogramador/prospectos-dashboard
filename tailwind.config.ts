import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Nexe — "Obsidian Precision" (Dark Premium, DESIGN.md)
        base: "#0a0a0a", // fondo principal (negro profundo)
        mint: "#00d4aa", // acento verde / CTA
        minttext: "#00d4aa", // acento verde para texto
        ink: "#ffffff", // texto principal
        card: "#111111", // fondo de cards (nivel 1)
        panel: "#111111", // fondo de cards/filas destacadas
        rowalt: "#141414", // fila alterna de tabla
        thead: "#161616", // cabecera de tabla (nivel 2)
        line: "#1f1f1f", // bordes finos
        muted: "#8a8a8a", // texto secundario / metadatos
        sidebar: "#111111", // fondo del sidebar
        sidemuted: "#8a8a8a", // texto secundario del sidebar
        danger: "#e74c3c", // alertas críticas
        warn: "#f39c12", // avisos
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
