import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));
const envsMockPath = fileURLToPath(
  new URL("./src/constants/__mocks__/envs.ts", import.meta.url),
);
const svgMockPath = fileURLToPath(
  new URL("./src/shared/__mocks__/svgrMock.js", import.meta.url),
);

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\/constants\/envs$/, replacement: envsMockPath },
      { find: "@", replacement: srcPath },
      { find: /\.svg$/, replacement: svgMockPath },
    ],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: false,
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      "src/shared/components/RouteRegistryFormDrawer/__tests__/fixtures/**",
    ],
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      include: ["src/**/*.{js,ts,tsx}"],
      exclude: [
        "node_modules",
        "dist",
        "src/constants/envs.ts",
        "**/__snapshots__/**",
      ],
    },
  },
});
