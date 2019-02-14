# Browserslist Config

This configuration reflects Growcss's supported browser policy for their UI library and build tools.

## What is Browserslist?

[Browserslist](https://github.com/ai/browserslist) is a library to share a browsers list between different front-end tools, like Autoprefixer, Eslint, and Stylelint.

* Valid Browserslist query syntax validation [browserl.ist](http://browserl.ist)
* ["Browserslist is a Good Idea"](https://css-tricks.com/browserlist-good-idea/) (blog post by [@chriscoyier](https://github.com/chriscoyier))

## Supported Browsers

[List of our supported browsers](https://browserl.ist/?q=last+1+Android+versions%2C+last+1+ChromeAndroid+versions%2C+last+2+Chrome+versions%2C+last+2+Firefox+versions%2C+last+2+Safari+versions%2C+last+2+iOS+versions%2C+last+2+Edge+versions%2C+last+2+Opera+versions%2C+%3E+1%25%2C+ie+%3E%3D+11)

## Installation

Install the module

```shell
$ npm install @growcss/browserslist-config --save-dev
```

## Usage

### package.json

```json
{
  "browserslist": [
    "extends @growcss/browserslist-config"
  ]
}
```

Alternatively, add this to `.browserslistrc` file:

```
extends @growcss/browserslist-config
```

or when using [babel-preset-env](https://github.com/babel/babel/tree/master/experimental/babel-preset-env) 
```js
{
  presets: [
    ['env', {
      targets: {
        browsers: require('@growcss/browserslist-config')
      }
    }]
  ]
}
```
