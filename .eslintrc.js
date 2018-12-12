module.exports = {
  "extends": [
    "./packages/coding-standard/eslint-config/index.js"
  ],
  "parser": "typescript-eslint-parser",
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": ["**/__tests__/*.tsx", "**/*.stories.tsx"]
      }
    ]
  }
};
