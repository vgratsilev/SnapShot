import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import fsdImport from "eslint-plugin-fsd-import";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"]
  },

  // Base recommended JS + type-aware TS rules.
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Project source.
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "fsd-import": fsdImport
    },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true }
      }
    },
    rules: {
      // React Hooks + Fast Refresh.
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],

      // Feature-Sliced Design enforcement.
      // Within a slice, imports must be relative (no alias self-references).
      "fsd-import/fsd-relative-path": ["error", { alias: "@" }],
      // A layer may only import from layers below it.
      "fsd-import/layer-imports": [
        "error",
        { alias: "@", ignoreImportPatterns: [] }
      ],
      // Consume slices through their public API (barrel index), not internals.
      "fsd-import/public-api-imports": ["error", { alias: "@" }]
    }
  },

  // Configs and scripts (non-src) — relax FSD rules, they don't apply.
  {
    files: ["*.ts", "*.js", "*.mjs", "vite.config.ts"],
    rules: {
      "fsd-import/fsd-relative-path": "off",
      "fsd-import/layer-imports": "off",
      "fsd-import/public-api-imports": "off"
    }
  },

  // Tests can import internals when needed (e.g. testing model functions).
  {
    files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    rules: {
      "fsd-import/public-api-imports": "off"
    }
  },

  // Turn off all formatting-related rules — Prettier owns formatting.
  prettierConfig
);
