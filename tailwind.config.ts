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
        bronze: "var(--color-bronze)",
        muted: "var(--color-muted)"
      },
      boxShadow: {
        card: "0 14px 30px -22px rgb(0 0 0 / 0.35)",
        focus: "0 0 0 3px rgb(213 121 28 / 0.35)"
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at 20% 20%, rgb(255 255 255 / 0.6), transparent 38%), radial-gradient(circle at 70% 0%, rgb(255 244 230 / 0.48), transparent 45%), linear-gradient(135deg, rgb(244 240 235) 0%, rgb(234 228 219) 100%)"
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
