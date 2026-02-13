import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        projects: resolve(__dirname, "projects.html"),
        resume: resolve(__dirname, "resume.html"),
        contact: resolve(__dirname, "contact.html"),
        // misc: resolve(__dirname, "misc.html"), // (optional)
      },
    },
  },
});