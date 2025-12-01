import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { Providers } from "./providers";
import "./globals.css";
import ThemeToggle from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "Ambrossia",
  description: "Sistema de gestión para restaurantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Script temprano para evitar flash de tema */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const ls=localStorage.getItem('theme');const sys=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';const theme=ls||sys;const d=document.documentElement; if(theme==='dark') d.classList.add('dark'); else d.classList.remove('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-screen bg-background text-foreground">
        <Providers>
          <Sidebar />
          <div className="absolute right-4 top-4 z-50">
            <ThemeToggle />
          </div>
          <main className="flex-1 p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
