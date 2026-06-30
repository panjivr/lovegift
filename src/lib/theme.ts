import type { ThemeName } from "./types";

export interface ThemePalette {
  bg: string;
  surface: string;
  primary: string;
  ink: string;
  accent: string;
}

export const THEMES: Record<ThemeName, ThemePalette> = {
  rose: {
    bg: "#FFF5F7",
    surface: "#FFFFFF",
    primary: "#E8567A",
    ink: "#7A2E43",
    accent: "#D4A24E",
  },
  midnight: {
    bg: "#0E0B1A",
    surface: "#1A1530",
    primary: "#FF5C8A",
    ink: "#F0E9FF",
    accent: "#8A6CFF",
  },
  sunset: {
    bg: "#FFF1E6",
    surface: "#FFFFFF",
    primary: "#FF7A59",
    ink: "#4A2C2A",
    accent: "#FFC15E",
  },
};

export const THEME_LIST: ThemeName[] = ["rose", "midnight", "sunset"];

// Inline CSS variables consumed by the Tailwind color tokens (see tailwind.config.ts).
export function themeVars(theme: ThemeName): React.CSSProperties {
  const p = THEMES[theme] ?? THEMES.rose;
  return {
    ["--c-bg" as string]: p.bg,
    ["--c-surface" as string]: p.surface,
    ["--c-primary" as string]: p.primary,
    ["--c-ink" as string]: p.ink,
    ["--c-accent" as string]: p.accent,
  };
}
