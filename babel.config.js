module.exports = {
  "env": {
    "test": {
      "presets": [
        [
          "@babel/preset-env",
          {
            "debug": false,
            "modules": "commonjs"
          }
        ],
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-transform-regenerator",
        "babel-plugin-styled-components",
        "require-context-hook",
        "polished"
      ]
    },
    "production": {
      "presets": [
        [
          "@babel/preset-env",
          {
            "modules": false
          }
        ],
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-transform-regenerator",
        "babel-plugin-styled-components",
        "polished"
      ]
    }
  }
};
