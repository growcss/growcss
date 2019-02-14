# Babel preset

> A babel preset for transforming your JavaScript for GrowCss.

Currently contains transforms for all stage 4 (ES2018) and stage 3 syntax.
Additionally, stage 4 syntax that is excluded is as follows:

- generators: regenerator-runtime is too heavyweight for our use.
- lifted template literal restrictions: we do not use tagged template literals, nor implement custom DSLs, otherwise we would enable this.

[fast-async](https://github.com/MatAtBread/fast-async) is used to compile async function without generators.

## Install

```sh
$ npm install --save-dev @growcss/babel-preset
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@growcss/babel-preset"]
}
```

### Via CLI

```sh
$ babel script.js --presets @growcss/babel-preset
```

### Via Node API

```javascript
require('@babel/core').transform('code', {
  presets: ['@growcss/babel-preset']
});
```

### Targeting Environments

This module uses @babel/preset-env to target specific environments.

Please refer to [@babel/preset-env#targets](https://babeljs.io/docs/en/babel-preset-env#targets) for a list of available options.

For a list of browsers please see [browserlist](https://github.com/ai/browserslist).

You may override our default list of targets by providing your own `targets` key.

[List of our supported browsers](https://browserl.ist/?q=last+1+Android+versions%2C+last+1+ChromeAndroid+versions%2C+last+2+Chrome+versions%2C+last+2+Firefox+versions%2C+last+2+Safari+versions%2C+last+2+iOS+versions%2C+last+2+Edge+versions%2C+last+2+Opera+versions%2C+%3E+1%25%2C+ie+%3E%3D+11)


The following transpiles only for Node v6.

```json
{
  "presets": [["@growcss/babel-preset", {
    "targets": {
      "node": 6
    }
  }]]
}
```

If you wish, you can also inherit our default list of browsers and extend them.

```javascript
module.exports = {
  'presets': [[
    '@growcss/babel-preset',
    {
      'targets': Object.assign(
          {},
          require('@growcss/browserslist-config'),
          {
            'chrome': 42,
            'explorer': 8
          }
      ),
    }
  ]]
};
```

You may override our default debug option by providing your own `debug` key.

```json
{
  "presets": [["@growcss/babel-preset", {
    "debug": true
  }]]
}
```
## React Mode

This preset can be configured to support `typescript`, using `"typescript": true` in our preset. 

```json
{
  "presets": [["@growcss/babel-preset", {
    "typescript": true
  }]]
}
```

## React Mode

This preset can be configured to support `react`, using `"react": true` in our preset. 

```json
{
  "presets": [["@growcss/babel-preset", {
    "react": true
  }]]
}
```

## React Development Mode

When `process.env.NODE_ENV` is `'development'`, [the `development` mode will be set for `@babel/preset-react`](https://babeljs.io/docs/en/babel-preset-react#development).

You may override our default development option by providing your own boolean `development` key.

```json
{
  "presets": [["@growcss/babel-preset", {
    "react": true,
    "development": false
  }]]
}
```

## React PropTypes removal

This preset can be configured to remove propTypes using [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) with the following default options:


To enable this transformation with the default options, set the `removePropTypes` option to `true`:

```json
{
  "presets": [["@growcss/babel-preset", {
    "react": true,
    "removePropTypes": true
  }]]
}
```

The default options that will be used are:

```js
{
  mode: 'wrap',
  ignoreFilenames: ['node_modules'],
}
```

Default options can be overridden using the `removePropTypes` option. These options will be shallow-merged with the defaults:

```json
{
  "presets": [["@growcss/babel-preset", {
    "removePropTypes": {
      "mode": "remove"
    }
  }]]
}
```
For example, if you are using this plugin in a deployable app, you might want to use the remove mode for your production build (and disable this transform entirely in development for optimal build speeds).

## Selective loose modes

By default, this preset will compile everything in normal mode. This is safer, but comes with bundle size and runtime overhead. We have some options to selectively opt in to loose mode for some features. These options are:

- [classes](https://babeljs.io/docs/en/babel-plugin-transform-classes#loose): `looseClasses`
- [computed properties](https://babeljs.io/docs/en/babel-plugin-transform-computed-properties#loose): `looseComputedProperties`
- [parameters](https://babeljs.io/docs/en/babel-plugin-transform-parameters#loose): `looseParameters`
- [template literals](https://babeljs.io/docs/en/babel-plugin-transform-template-literals#loose): `looseTemplateLiterals`

Example:

```json
{
  "presets": [["@growcss/babel-preset", {
    "looseClasses": true,
    "looseComputedProperties": true,
    "looseParameters": true,
    "looseTemplateLiterals": true
  }]]
}
```
