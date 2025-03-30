import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules/", "dist/", ".env"], // Ignore unnecessary files
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // Set to "module" if using ESM (import/export)
      ecmaVersion: "latest",  // Use the latest ECMAScript version
      globals: globals.node,  // Set global variables for Node.js
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    rules: {
      "no-unused-vars": "warn", // Warn instead of error
      "no-console": "off", // Allow console logs
      "eqeqeq": "error", // Enforce strict equality
      "semi": ["error", "always"], // Enforce semicolons
      "indent": ["error", 2], // Enforce consistent indentation (2 spaces)
    },
  },
]);
