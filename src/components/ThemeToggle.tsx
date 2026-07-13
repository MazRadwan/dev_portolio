import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="mono-label inline-flex h-8 items-center gap-1.5 border border-line bg-surface-2 px-2 text-muted transition-colors hover:border-accent/60 hover:text-ink"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
      <span className="hidden sm:inline">{theme === "dark" ? "dark" : "light"}</span>
    </button>
  );
}
