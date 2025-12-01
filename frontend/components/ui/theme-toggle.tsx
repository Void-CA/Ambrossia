"use client";
import { useTheme } from "@/app/providers";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
