import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
import sourceMaps from 'rollup-plugin-sourcemaps';
import globals from 'rollup-plugin-node-globals';
import 'babel-polyfill';
import typescript from 'rollup-plugin-typescript2';

const pkg = require(`${__dirname}/package.json`);
const env = process.env.NODE_ENV;

export const commonPlugins = [
  typescript(),
  json(),
  globals(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
  // nodeResolve makes rollup look for dependencies in the node_modules directory
  nodeResolve({
    jsnext: true,
    browser: true,
    preferBuiltins: false,
    extensions: ['.js', '.ts', '.tsx']
  }),
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [['env', { modules: false }], 'flow', 'react-app'],
    plugins: ['external-helpers', 'transform-flow-strip-types', 'babel-plugin-styled-components', 'polished'],
  }),
  sourceMaps(),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
  }),
];

export const configBase = {
  input: 'src/index.ts',
  external: ['react'].concat(
    Object.keys(pkg.dependencies),
  ),
  plugins: commonPlugins,
};

export const umdConfig = Object.assign({}, configBase, {
  output: {
    file: pkg.browser,
    format: 'umd',
    name: pkg.moduleName,
    exports: 'named',
    sourcemap: true,
    globals: {},
  },
  plugins: configBase.plugins.concat(
    uglify({
      sourcemap: true,
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    }),
    visualizer({ filename: './bundle-stats.html' }),
  ),
});

export const browserConfig = Object.assign({}, configBase, {
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
});
