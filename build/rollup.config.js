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
import typescript from 'rollup-plugin-typescript2';
import 'babel-polyfill';
import { terser } from "rollup-plugin-terser";

const env = process.env.NODE_ENV;
const pkg = require(`${__dirname}/../packages/${process.env.PACKAGE_PATH}/package.json`);
const babelConfig = require(`${__dirname}/../babel.config.js`);

const commonPlugins = [
  peerDepsExternal(),
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
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  babel({
    exclude: '**/node_modules/**',
    babelrc: false,
    presets: babelConfig.presets,
    plugins: babelConfig.plugins,
    externalHelpers: true
  }),
  sourceMaps(),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
  }),
];

const baseConfig = {
  input: 'src/index.ts',
  external: ['react'].concat(
    Object.keys(pkg.dependencies || {}),
  ),
  plugins: commonPlugins,
};

const umdConfig = Object.assign({}, baseConfig, {
  output: {
    file: pkg.browser,
    format: 'umd',
    name: pkg.moduleName,
    exports: 'named',
    sourcemap: true,
    globals: {},
  },
});

if (env === 'prod') {
  umdConfig.plugins.concat(
    uglify({
      sourcemap: true,
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

umdConfig.plugins.concat(
  visualizer({ filename: './bundle-stats.html' }),
  cleanup(),
);

const browserEsConfig = Object.assign({}, baseConfig, {
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    }
  ],
  plugins: baseConfig.plugins.concat(
    cleanup(),
    terser(),
  ),
});

const browserCjsConfig = Object.assign({}, baseConfig, {
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: baseConfig.plugins.concat(
    cleanup(),
  ),
});

export default [umdConfig, browserEsConfig, browserCjsConfig];
