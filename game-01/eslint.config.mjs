import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
      ecmaVersion: "latest",
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
      "curly": "error",
      "no-undef": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
    },
  },
];