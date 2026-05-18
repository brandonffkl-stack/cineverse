import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body:    ["Outfit", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%":     { transform: "translateY(-8px) rotate(1deg)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.94)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        float:    "float 3s ease-in-out infinite",
        fadeUp:   "fadeUp 0.3s ease forwards",
        scaleIn:  "scaleIn 0.2s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;