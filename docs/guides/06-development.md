# Development

We use [Lerna][1] for managing our monorepo. All our packages can be found in [packages](./packages) directory.

To start developing the packages:
### Setup

Clone the repository, and run:

```
yarn && yarn bootstrap && yarn build
```

### Scripts

Now you can run the `yarn` scripts:

```
$ npm run lint
$ npm run test
$ npm run test:coverage
```

### Dependencies

We keep all the `devDependencies` at root `package.json` for avoiding unnecessary duplication.

To install dependencies at individual package level, just update their `package.json` (even if the dependency is a package from this repo itself), and run this from root:

```
$ yarn run bootstrap
```

The `bootstrap` script takes care of installing and linking the dependencies in your packages.

[1]: https://github.com/lerna/lerna/
