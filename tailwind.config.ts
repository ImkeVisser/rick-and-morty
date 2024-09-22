import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px"
      },
      colors: {
       darkgreen: "#023535",
       lightgreen: "#C7FFED"
      },
    },
  },
  plugins: [],
};
export default config;
