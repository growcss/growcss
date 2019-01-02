const { compiler, beautify } = require('flowgen');
const fs = require('fs');

const packageDir = join(__dirname, `/../packages/${process.env.PACKAGE_PATH}`);
const typesFile = `${packageDir}/types/index.tsx`;

const flowDefinitions = compiler.compileDefinitionFile(typesFile);

fs.writeFileSync(`${packageDir}/dist/index.flow.js`, beautify(flowDefinitions));
