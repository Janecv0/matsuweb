import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        warm: "var(--color-warm)",
        ember: "var(--color-ember)",
        sage: "var(--color-sage)",
        bronze: "var(--color-bronze)",
        muted: "var(--color-muted)"
      },
      boxShadow: {
        card: "0 12px 30px -20px rgb(43 36 32 / 0.3)",
        focus: "0 0 0 3px rgb(194 112 63 / 0.35)"
      },
      fontFamily: {
        display: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-source-sans)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
