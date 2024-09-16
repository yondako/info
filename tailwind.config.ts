import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        accent: "#A17171",
        "primary-foreground": "#494949",
        "secondary-foreground": "#9d9595",
        "primary-background": "#FFFAF6",
        "secondary-background": "#FAF9F9",
        "tertiary-background": "#fff3e9",
        "primary-border": "#494949",
        "secondary-border": "#DDDDDD",
        "tertiary-border": "#f0e1d5"
      }
    },
    backgroundImage: {
      gradation: "url('/gradation.webp')",
      "paper-texture": "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)"
    },
    backgroundSize: {
      "size-10": "10px 10px"
    }
  }
};

export default config;
