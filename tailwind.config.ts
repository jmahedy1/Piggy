import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        primaryDark: "#4f46e5",
        success: "#10b981",
        danger: "#ef4444",
        background: "#f8fafc",
        card: "#ffffff",
        text: "#1e293b",
        textMuted: "#64748b",
        border: "#e2e8f0",
      },
    },
  },
  plugins: [],
};

export default config;
