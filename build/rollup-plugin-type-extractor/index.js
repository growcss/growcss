const { dirname, join } = require('path');
const { ScriptTarget, ModuleResolutionKind, createProgram, getPreEmitDiagnostics, flattenDiagnosticMessageText } = require('typescript');
const { compiler, beautify } = require('flowgen');
const fs = require('fs');

// Compiler based on code shown in the official docs:
// https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
function compile(fileNames, options, verbose) {
  const program = createProgram(fileNames, options);
  const emitResult = program.emit();

  if (verbose) {
    const allDiagnostics = getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
      if (diagnostic.file) {
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start
        );
        const message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");

        console.log(
          `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
        );
      } else {
        console.log(`${flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`);
      }
    });
  }
}

function extractTypescriptTypes({ input, root, output, verbose }) {
  return compile([ input ], {
    declarationDir: join(root, dirname(output)),
    declaration: true,
    emitDeclarationOnly: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    moduleResolution: ModuleResolutionKind.NodeJs,
    target: ScriptTarget.ES5,
    module: 'commonjs',
    jsx: 'preserve',
    noImplicitAny: true,
    noImplicitThis: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
  }, verbose)
}

const packageDir = join(__dirname, `/../packages/${process.env.PACKAGE_PATH}`);
const typesFile = `${packageDir}/types/index.tsx`;

extractTypescriptTypes({
  input: typesFile,
  root: packageDir,
  output: 'dist/index.d.ts',
  verbose: true
});

const flowDefinitions = compiler.compileDefinitionFile(typesFile);

fs.writeFileSync(`${packageDir}/dist/index.flow.js`, beautify(flowDefinitions));

export default function executable () {
  return {
    name: 'rollup-plugin-executable',
    generateBundle: async function (options, bundle, isWrite) {
      const baseDir = options.dir || path.dirname(options.file);
    }
  };
}
