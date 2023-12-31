module.exports = {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  importOrder: [
    "<BUILT_IN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^(assets|components|types|utils|pages)",
    "^\\.",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: false,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  printWidth: 80,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
};
