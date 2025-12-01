"use client";
import { useTheme } from "@/app/providers";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="size-9 inline-flex items-center justify-center rounded-md border border-border bg-background shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <Sun
        className={`absolute size-5 transition-opacity ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      />
      <Moon
        className={`absolute size-5 transition-opacity ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}
