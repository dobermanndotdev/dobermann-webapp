import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
