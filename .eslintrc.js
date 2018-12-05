var restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  "extends": [
    "airbnb",
    "prettier"
  ],
  "plugins": [
    "compat",
    "prettier",
    "jsx-a11y"
  ],
  "parser": "babel-eslint",
  "rules": {
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": [
        "**/__tests__/**/*.js",
        "**/examples/**/*.js"
      ]
    }],
    "import/no-unresolved": ["off"],
    "import/prefer-default-export": "off",
    "import/extensions": ["error", "never", {
      "json": "always"
    }],

    "no-labels": "off",
    "no-restricted-syntax": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",

    "arrow-body-style": "off",

    "spaced-comment": "off",

    "no-await-in-loop": "off",

    "no-mixed-operators": "off",
    "no-plusplus": "off",

    "react/sort-comp": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",

    'no-restricted-globals': ['error'].concat(restrictedGlobals),

    // Rules below are all added to remove conflicts with prettier. DO NOT REMOVE
    "react/jsx-indent": "off",
    "arrow-parens": "off",
    "react/jsx-closing-tag-location": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-wrap-multilines": "off",
    "react/prefer-stateless-function": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-multi-spaces": "off"
  },
  "env" : {
    "browser": true
  }
};
