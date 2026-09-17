import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: { card: "0 8px 30px rgba(15, 39, 35, 0.08)" },
    },
  },
  plugins: [],
};

export default config;
