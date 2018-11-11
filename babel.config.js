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
        "babel-plugin-styled-components",
      ]
    },
    "production": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        "babel-plugin-styled-components",
      ]
    }
  }
};
