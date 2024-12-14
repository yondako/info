// @ts-check
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://info.yondako.com",
  integrations: [tailwind(), icon(), react()]
});

