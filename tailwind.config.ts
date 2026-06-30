import type { Config } from "tailwindcss";

// Colors map to CSS variables set per-theme on the experience wrapper
// (see src/lib/theme.ts). This lets one set of utilities re-skin instantly.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--c-bg)",
        surface: "var(--c-surface)",
        primary: "var(--c-primary)",
        ink: "var(--c-ink)",
        accent: "var(--c-accent)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
