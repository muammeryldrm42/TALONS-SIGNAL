import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#05060a",
        panel: "#0d1018",
        panel2: "#141826",
        muted: "#8c92a8",
        line: "rgba(255,255,255,0.08)",
        card: "#121726",
        purple: "#8b5cf6",
        purple2: "#6d28d9",
        green: "#158f7a",
        red: "#8f3555"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(139,92,246,0.2), 0 10px 30px rgba(109,40,217,0.18)"
      },
      backgroundImage: {
        "panel-gradient": "linear-gradient(180deg, rgba(139,92,246,0.08), rgba(255,255,255,0))",
        "hero-glow": "radial-gradient(circle at top, rgba(139,92,246,0.24), rgba(5,6,10,0) 55%)"
      }
    }
  },
  plugins: [],
};

export default config;
