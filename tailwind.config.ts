import type { Config } from "tailwindcss";

// Every colour comes from CSS variables (see app/globals.css) so a theme switch is one line in data/gym.config.ts.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        line: v("border"),
        fg: v("text"),
        muted: v("muted"),
        accent: v("accent"),
        "accent-contrast": v("accent-contrast"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "1.5rem" },
    },
  },
  plugins: [],
};
export default config;
