import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./__test__/setup.tsx"],
    globals: true,
    testTimeout: 15 * 1000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "**/__test__/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
        "prisma/",
        "emails/",
        "public/",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@feat": path.resolve(__dirname, "./src/features"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@type": path.resolve(__dirname, "./src/types"),
      "@generated": path.resolve(__dirname, "./prisma/generated"),
    },
  },
});
