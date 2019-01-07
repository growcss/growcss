module.exports = function(plop) {
  plop.setGenerator(`package`, {
    description: `This sets up the basic files for a new package.`,
    prompts: [
      {
        type: `input`,
        name: `name`,
        message: `Name of new package`,
      },
      {
        type: `input`,
        name: `package_type`,
        message: `Choose in witch folder this new package belongs (coding-standard, core, blog, ...)`,
      },
      {
        type: `input`,
        name: `author`,
        message: `Your name for putting in the package.json of the new package`,
      },
      {
        type: `input`,
        name: `author_email`,
        message: `Your email for putting in the package.json of the new package`,
      },
      {
        type: `input`,
        name: `version`,
        message: `Package version`,
      },
      {
        type: `input`,
        name: `description`,
        message: `Package description`,
      },
    ],
    actions: data =>
      [
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/__stories__/{{name}}.stories.tsx`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/__tests__/{{name}}.tsx`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/src/components/.gitkeep`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/src/styled/.gitkeep`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/types/index.tsx`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/src/index.ts`,
          templateFile: `plop-templates/package/src/index.ts.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/.npmignore`,
          templateFile: `plop-templates/package/.npmignore.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/CHANGELOG.md`,
          templateFile: `plop-templates/package/CHANGELOG.md.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/LICENSE.md`,
          templateFile: `plop-templates/package/LICENSE.md.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/package.json`,
          templateFile: `plop-templates/package/package.json.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{package_type}}/{{kebabCase name}}/README.md`,
          templateFile: `plop-templates/package/README.md.hbs`,
        },
      ].filter(Boolean),
  });
};
