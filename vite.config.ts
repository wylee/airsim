import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/ui/main.ts"
    }
  }
});
