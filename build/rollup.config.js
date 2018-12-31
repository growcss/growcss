import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
import sourceMaps from 'rollup-plugin-sourcemaps';
import globals from 'rollup-plugin-node-globals';
import cleanup from 'rollup-plugin-cleanup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from "rollup-plugin-terser";
import gzip from 'rollup-plugin-gzip';
import licensePlugin from 'rollup-plugin-license';
import 'airbnb-browser-shims';

const env = process.env.NODE_ENV;
const packageDir = `${__dirname}/../packages/${process.env.PACKAGE_PATH}`;
const pkg = require(`${packageDir}/package.json`);

const SOURCEMAP = true;
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

const commonPlugins = [
  peerDepsExternal(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
  json(),
  globals(),
  // nodeResolve makes rollup look for dependencies in the node_modules directory
  nodeResolve({
    // use "module" field for ES6 module if possible
    module: false, // Default: true
    // use "jsnext:main" if possible
    // – see https://github.com/rollup/rollup/wiki/jsnext:main
    jsnext: false,  // Default: false
    // use "main" field or index.js, even if it's not an ES6 module
    // (needs to be converted from CommonJS to ES6
    // – see https://github.com/rollup/rollup-plugin-commonjs
    main: true,  // Default: true
    // some package.json files have a `browser` field which
    // specifies alternative files to load for people bundling
    // for the browser. If that's you, use this option, otherwise
    // pkg.browser will be ignored
    browser: true,  // Default: false
    // whether to prefer built-in modules (e.g. `fs`, `path`) or
    // local ones with the same names
    preferBuiltins: true,  // Default: true
    // If true, inspect resolved files to check that they are
    // ES2015 modules
    modulesOnly: false,  // Default: false
    extensions: EXTENSIONS
  }),
  babel({
    babelrc: false,
    configFile: `${__dirname}/../babel.config.js`,
    // The Babel-Plugin is not using a pre-defined include, but builds up
    // its include list from the default extensions of Babel-Core.
    // Default Extensions: [".js", ".jsx", ".es6", ".es", ".mjs"]
    // We add TypeScript extensions here as well to be able to post-process
    // any TypeScript sources with Babel. This allows us for using presets
    // like "react" and plugins like "fast-async" with TypeScript as well.
    extensions: EXTENSIONS,
    // Do not transpile external code
    // https://github.com/rollup/rollup-plugin-babel/issues/48#issuecomment-211025960
    exclude: [ "node_modules/**", "**/*.json" ]  }),
  sourceMaps(),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
  }),
  env === 'production' && terser({
    warnings: true,
    ecma: 5,
    output: {
      comments: false,
    },
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  }),
  licensePlugin({
    banner: [
      `/*!`,
      ` * ${pkg.name} v${pkg.version} (c) 2017-${new Date().getFullYear()}`,
      ` * Released under the MIT License.`,
      ` * Website: https://growcss.com`,
      `*/`
    ].join('\n')
  }),
  env === 'production' && gzip()
];

const baseConfig = {
  input: 'src/index.ts',
  inlineDynamicImports: true,
  external: ['react'].concat(
    Object.keys(pkg.dependencies || {}),
  ),
  plugins: commonPlugins,
};

const unpkgConfig = Object.assign({}, baseConfig, {
  output: {
    dir: `${packageDir}/dist/umd/`,
    format: 'umd',
    name: pkg.moduleName,
    sourcemap: SOURCEMAP,
  },
});

if (env === 'production') {
  unpkgConfig.plugins.concat(
    uglify({
      sourcemap: SOURCEMAP,
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

unpkgConfig.plugins.concat(
  visualizer({ filename: './bundle-stats.html' }),
  cleanup({}),
);

const moduleConfig = Object.assign({}, baseConfig, {
  output: [
    {
      dir: `${packageDir}/dist/es/`,
      format: 'esm',
      target: 'node',
      sourcemap: SOURCEMAP
    }
  ],
  plugins: baseConfig.plugins.concat(
    cleanup({}),
    ),
});

const mainConfig = Object.assign({}, baseConfig, {
  output: [
    {
      dir: `${packageDir}/dist/cjs/`,
      format: 'cjs',
      exports: 'named',
      sourcemap: SOURCEMAP,
    },
  ],
  plugins: baseConfig.plugins.concat(
    cleanup({}),
  ),
});

export default [unpkgConfig, moduleConfig, mainConfig];
