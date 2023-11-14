module.exports = {
  extends: [".eslintrc.base.js"],
  overrides: [
    {
      files: "src/**/*.tsx",
      rules: {
        "react/function-component-definition": [
          "error",
          {
            namedComponents: "arrow-function",
            unnamedComponents: "arrow-function",
          },
        ],
        "react/jsx-boolean-value": "error",
        "react/jsx-curly-brace-presence": [
          "error",
          {
            children: "always",
            props: "always",
          },
        ],
        "react/jsx-fragments": "error",
        "react/jsx-no-useless-fragment": "error",
        "react/jsx-sort-props": "error",
        "react/hook-use-state": "error",
        "react/no-multi-comp": "error",
      },
    },
    {
      files: ["src/**/*.test.tsx?"],
      rules: {
        "jest/consistent-test-it": "error",
        "jest/prefer-called-with": "error",
        "jest/prefer-comparison-matcher": "error",
        "jest/prefer-equality-matcher": "error",
        "jest/prefer-expect-assertions": "error",
        "jest/prefer-strict-equal": "error",
      },
    },
  ],
  rules: {
    eqeqeq: "error",
    "no-else-return": "error",
    "no-param-reassign": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "prefer-const": "error",
    "sort-keys": ["error", "asc"],
    "sort-vars": ["error", { ignoreCase: true }],
    yoda: "error",
  },
};
