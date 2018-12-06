module.exports = {
  "processors": ["stylelint-processor-styled-components"],
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-styled-components",
    "stylelint-no-unsupported-browser-features",
    "stylelint-config-prettier"
  ],
  "plugins": [
    "stylelint-images"
  ],
  "syntax": "scss",
  "rules": {
    "block-no-empty": null,
    "comment-empty-line-before": null,
    "declaration-block-no-duplicate-properties": [ true, { ignoreProperties: ["-styled-mixin"] } ],
    "declaration-empty-line-before": null,
    "number-leading-zero": null,
    "rule-empty-line-before": null,
    "property-no-vendor-prefix": null,
    // Bug exists in ts where it matches across different styled css rules
    "no-descending-specificity": null,
    // Bug exists in ts where interpolated values trigger these two rules
    "selector-type-case": null,
    "selector-type-no-unknown": null,
    "no-duplicate-selectors": null,

    "images/broken": true,
    "images/prefer-data-uri": 256,

    "plugin/no-unsupported-browser-features": [ true, { "severity": "warning" } ]
  }
};
