const fs = require('fs');
const { mode } = fs.statSync(file);

// eslint-disable-next-line no-bitwise
const newMode = mode | EXECUTABLE_MODE;

fs.chmodSync(file, newMode);
