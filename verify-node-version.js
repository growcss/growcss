const requiredVersion = require("fs")
  .readFileSync(".nvmrc", { encoding: "utf8" })
  .trim();

if ((! ('TRAVIS' in process.env && 'CI' in process.env) || process.env.SKIP_CHECK !== undefined) && process.version.split(".")[0] !== requiredVersion.split(".")[0]) {
  console.error(
    `[!] This project requires Node.js ${requiredVersion}, current version is ${
      process.version
      }`
  );

  process.exit(1)
}
