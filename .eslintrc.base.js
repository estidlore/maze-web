module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
  ],
  overrides: [
    {
      files: "src/**/*.tsx",
      extends: ["plugin:react/recommended"],
      globals: {
        JSX: false,
        React: false,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ["react"],
      settings: {
        react: {
          version: "detect",
        },
      },
    },
    {
      files: ["src/**/*.test.tsx?"],
      env: {
        jest: true,
      },
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      plugins: ["jest"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import"],
  root: true,
};
