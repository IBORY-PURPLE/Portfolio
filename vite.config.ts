import { defineConfig } from "vite";
import type { Plugin } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const rootDir = dirname(fileURLToPath(import.meta.url));
const sourceModuleRE = /\.[cm]?tsx?$/;
const nodeModulesRE = /[\\/]node_modules[\\/]/;

function fromNodeModules(...parts: string[]): string {
  return resolve(rootDir, "node_modules", ...parts);
}

function portfolioTypeScriptPlugin(): Plugin {
  return {
    name: "portfolio-typescript-transform",
    enforce: "pre",
    transform(code, id) {
      const [filePath] = id.split("?");

      if (!sourceModuleRE.test(filePath) || nodeModulesRE.test(filePath)) {
        return null;
      }

      const result = ts.transpileModule(code, {
        compilerOptions: {
          esModuleInterop: true,
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.ESNext,
          sourceMap: true,
          target: ts.ScriptTarget.ES2020,
          useDefineForClassFields: true,
        },
        fileName: filePath,
      });

      return {
        code: result.outputText,
        map: result.sourceMapText ? JSON.parse(result.sourceMapText) : null,
      };
    },
  };
}

export default defineConfig({
  plugins: [portfolioTypeScriptPlugin()],
  esbuild: false,
  keepProcessEnv: true,
  resolve: {
    alias: [
      {
        find: "react/jsx-runtime",
        replacement: fromNodeModules("react", "cjs", "react-jsx-runtime.production.js"),
      },
      {
        find: "react/jsx-dev-runtime",
        replacement: fromNodeModules("react", "cjs", "react-jsx-dev-runtime.production.js"),
      },
      {
        find: "react-dom/client",
        replacement: fromNodeModules("react-dom", "cjs", "react-dom-client.production.js"),
      },
      {
        find: "react-dom",
        replacement: fromNodeModules("react-dom", "cjs", "react-dom.production.js"),
      },
      {
        find: "scheduler",
        replacement: fromNodeModules("scheduler", "cjs", "scheduler.production.js"),
      },
      {
        find: "react",
        replacement: fromNodeModules("react", "cjs", "react.production.js"),
      },
    ],
    preserveSymlinks: true,
  },
  optimizeDeps: {
    noDiscovery: true,
  },
  build: {
    minify: false,
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
  preview: {
    host: "127.0.0.1",
    port: 4174,
  },
});
