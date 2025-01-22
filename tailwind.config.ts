import type { Config } from "tailwindcss";
import daisyui from "daisyui";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  plugins: [daisyui],
} satisfies Config;
