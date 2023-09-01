import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  server: { port: 3000 },
  output: "server",
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  adapter: vercel(),
});
