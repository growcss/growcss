GrowCss Elaborate
---------
#### A lightweight toolset for writing styles in JavaScript. 

```bash
npm install @growcss/elaborate
```

or if you're using yarn

```bash
yarn add @growcss/elaborate
```

Want to write styles in JavaScript, but also want Sass-style helper functions and mixins or consistent color palette throughout your app? `elaborate` is for you!

## Usage

`elaborate` modules are meant to be used as stand-alone imports. You should avoid importing the entire library directly:

```js
import { rem, em } from '@growcss/elaborate';
```

When `elaborate` modules are imported properly, tree shaking in [webpack](https://webpack.js.org/guides/tree-shaking/) and [Rollup](https://github.com/rollup/rollup#tree-shaking) can be leveraged to reduce your bundle size.
