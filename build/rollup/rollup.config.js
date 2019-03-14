import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import globals from 'rollup-plugin-node-globals';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';
import gzip from 'rollup-plugin-gzip';
import licensePlugin from 'rollup-plugin-license';
import 'airbnb-browser-shims';
import { dts } from 'rollup-plugin-dts';

const nodeEnv      = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';
const packageDir   = process.cwd();
const pkg          = require(`${packageDir}/package.json`);

const onWarn = warning => {
  if (warning.pluginCode === 'ONWRITE_HOOK_DEPRECATED' ||
    warning.plugin === 'rollup-plugin-license' ||
    warning.plugin === 'progress'
  ) {
    return;
  }

  // eslint-disable-next-line no-console
  console.error(
    'Building Rollup produced warnings that need to be resolved. ' +
    'Please keep in mind that the browser build may never have external dependencies!'
  );

  throw new Error(warning.message);
};

const SOURCEMAP = true;
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];
const GLOBALS = {
  '@growcss/elaborate': 'elaborate',
  '@popmotion/easing': 'easing',
  react: 'React',
  'styled-components': 'styled',
  classnames: 'classNames',
  'hey-listen': 'heyListen',
  'react-pose': 'posed',
  '@growcss/theme': 'theme',
  '@researchgate/react-intersection-observer': 'Observer'
};

const commonPlugins = [
  process.env.DEBUG ? progress() : null,
  replace({
    'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  }),
  json(),
  globals(),
  // nodeResolve makes rollup look for dependencies in the node_modules directory
  nodeResolve({
    // use 'module' field for ES6 module if possible
    module: false, // Default: true
    // use 'jsnext:main' if possible
    // – see https://github.com/rollup/rollup/wiki/jsnext:main
    jsnext: false,  // Default: false
    // use 'main' field or index.js, even if it's not an ES6 module
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
    extensions: EXTENSIONS,
  }),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
  }),
  babel({
    babelrc: false,
    configFile: `${packageDir}/babel.config.js`,
    // The Babel-Plugin is not using a pre-defined include, but builds up
    // its include list from the default extensions of Babel-Core.
    // Default Extensions: ['.js', '.jsx', '.es6', '.es', '.mjs']
    // We add TypeScript extensions here as well to be able to post-process
    // any TypeScript sources with Babel. This allows us for using presets
    // like 'react' and plugins like 'fast-async' with TypeScript as well.
    extensions: EXTENSIONS,
    // Do not transpile external code
    // https://github.com/rollup/rollup-plugin-babel/issues/48#issuecomment-211025960
    exclude: [
      'node_modules/**',
      '**/*.json'
    ],
  }),
  sourceMaps(),
  cleanup({}),
  isProduction && terser({
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
    safari10: true,
  }),
  licensePlugin({
    banner: [
      `/**`,
      ` * ${pkg.name} v${pkg.version} (c) 2018-${new Date().getFullYear()}`,
      ` * Released under the MIT License.`,
      ` * Website: https://growcss.com`,
      ` */`
    ].join('\n')
  }),
  isProduction && gzip(),
];

const baseConfig = {
  input: `${packageDir}/src/index.ts`,
  onwarn: onWarn,
  inlineDynamicImports: true,
  treeshake: {
    pureExternalModules: true,
  },
  plugins: commonPlugins,
  external: Object.keys(pkg.peerDependencies || {}).concat(
    Object.keys(pkg.dependencies || {}),
  ),
};

const unpkgConfig = Object.assign({}, baseConfig, {
  output: {
    file: `${packageDir}/${pkg.unpkg}`,
    format: 'umd',
    name: pkg.moduleName,
    sourcemap: SOURCEMAP,
    globals: GLOBALS,
  },
});

if (isProduction) {
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

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` or `dir` and `format` for each target)
export default [
  unpkgConfig,
  Object.assign({}, baseConfig, {
    output: [
      {
        file: `${packageDir}/${pkg.main}`,
        format: 'cjs',
        sourcemap: SOURCEMAP,
        globals: GLOBALS,
      },
      {
        file: `${packageDir}/${pkg.module}`,
        format: 'esm',
        sourcemap: SOURCEMAP,
        globals: GLOBALS,
      },
    ],
  }),
  process.env.GENERATE_TYPES === 'true' ? Object.assign({}, baseConfig, {
    // NOTE: The second output is your bundled `.d.ts` file
    output: [
      {
        file: `${packageDir}/dist/index.d.ts`,
        format: 'es',
        globals: GLOBALS,
      }
    ],
    plugins: [
      dts({
        tsconfig: `${packageDir}/tsconfig.json`,
        banner: false,
      })
    ],
  }) : null,
].filter(Boolean);
