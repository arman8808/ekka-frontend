import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "#6E2D79 ",
      },
    },
    fontSize: {
      esm: "0.6rem",
      sm: "0.875rem",
      normal: "1rem",
      base: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [tailwindcss()],
});
