const fs = require('fs');
const path = require('path');

// Set EXECUTABLE bit on file mode
const EXECUTABLE_MODE = 0o111;

// @Todo need to be fixed https://github.com/rollup/rollup/issues/2617

export default function executable () {
  return {
    name: 'rollup-plugin-executable',
    generateBundle: async function (options, bundle, isWrite) {
      if (isWrite) {
        const baseDir = options.dir || path.dirname(options.file);

        const keys = Object.keys(bundle);

        keys.forEach(function (file) {
          const {mode} = fs.statSync(baseDir + file);

          // eslint-disable-next-line no-bitwise
          const newMode = mode | EXECUTABLE_MODE;

          fs.chmodSync(baseDir + file, newMode);
        });
      }

      return null;
    }
  };
}
