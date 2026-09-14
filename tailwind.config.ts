import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--bg-main)",
        "sea-salt": "var(--bg-card-hover)",
        "dark-serpent": "#133020",
        castleton: "#046241",
        saffron: "#FFB347",
        "earth-yellow": "#FFC370",

        // Fit Scores
        "fit-5": "#133020",
        "fit-4": "#046241",
        "fit-3": "#708E7C",

        // Priority Levels
        "priority-high": "#C17110",
        "priority-medium": "#FFB347",
        "priority-low": "#9CAFA4",

        // Business Line Accent Colors
        "bl-ai-data": "#046241",
        "bl-aigc": "#133020",
        "bl-scanning": "#C17110",
        "bl-autonomous": "#034E34",
        "bl-aeo": "#E89131",
        "bl-edge": "#417256",

        // Standard UI mappings
        border: "var(--border-color)",
        input: "var(--border-color)",
        ring: "#046241",
        background: "var(--bg-main)",
        card: "var(--bg-card)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "#FFB347",
          foreground: "#133020",
          hover: "#FFC370",
        },
        secondary: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "#B91C1C",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "var(--bg-card-hover)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "#FFB347",
          foreground: "#133020",
        },
      },
      fontFamily: {
        manrope: ["Manrope", "system-ui", "sans-serif"],
        alimama: ["Alimama ShuHeiTi", "Microsoft YaHei", "sans-serif"],
        yahei: ["Microsoft YaHei", "PingFang SC", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        lg: "12px",
        md: "8px",
        sm: "6px",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "floating-dark": "0 10px 30px -5px rgba(255, 255, 255, 0.08), 0 4px 12px -2px rgba(255, 255, 255, 0.05)",
        "floating-dark-lg": "0 16px 36px -2px rgba(255, 255, 255, 0.14), 0 6px 16px -2px rgba(255, 255, 255, 0.08)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
