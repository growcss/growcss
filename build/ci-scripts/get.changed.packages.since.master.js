const exec = require('child_process').exec;

function execute(command, callback) {
  exec(
    command,
    function(error, stdout, stderr) {
      callback(stdout);
    }
  );
}

/**
 * NOTE: This prints the list of changed packages that would be the subjects of the next lerna version or lerna publish execution.
 * It will print them all out as a json array of relative paths
 * i.e: $ node build/ci-scripts/get.changed.packages.since.master.js
 *        ["packages/core/avatar", "packages/core/badge"]
 * */
execute("lerna changed --json --toposort", (output) => {
  const cwd = process.cwd();
  const data = JSON.parse(output);
  let packages = [];

  for (let key in data) {
    packages.push(data[key].location.replace(cwd + '/', ''));
  }

  console.log(JSON.stringify(packages));
});
