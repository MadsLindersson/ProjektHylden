import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
    [
        includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
        {
            files: ["**/*.{js,mjs,cjs}"],
            plugins: { js },
            extends: ["js/recommended"],
            languageOptions: { globals: globals.browser },
        },
    ],
    prettier,
    ...svelte.configs.prettier
);
