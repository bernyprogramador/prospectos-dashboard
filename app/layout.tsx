import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ProspectOS · IA a Medida",
  description: "Dashboard de captación B2B",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen bg-base text-ink">
          <Sidebar />
          <main className="flex-1 overflow-x-auto">
            <div className="mx-auto max-w-screen-2xl px-8 py-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
