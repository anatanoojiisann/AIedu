import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          navy: "#070921",
          blue: "#0AA0FF",
          cyan: "#00E5FF",
          silver: "#AAB0BF",
          text: "#F5F8FF",
          secondary: "#B8C2D6"
        }
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(10,160,255,0.22), transparent 56%)"
      }
    },
  },
  plugins: [],
};

export default config;
