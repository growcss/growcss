const requiredVersion = require("fs")
  .readFileSync(".nvmrc", { encoding: "utf8" })
  .trim();

if (process.env.SKIP_CHECK !== undefined) {
  process.exit(0);
}

if (process.version.split(".")[0] !== requiredVersion.split(".")[0]) {
  console.error(
    `[!] This project requires Node.js ${requiredVersion}, current version is ${
      process.version
      }`
  );

  process.exit(1);
}
