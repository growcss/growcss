module.exports = {
  "extends": [
    "./packages/coding-standard/eslint-config/index.js"
  ],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [".storybook/**", "__tests__/**", "__stories__/**"]
      }
    ]
  }
};
