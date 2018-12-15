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

Which are shortcuts for:

```
$ ./node_modules/.bin/lerna run lint
$ ./node_modules/.bin/lerna run test
$ ./node_modules/.bin/lerna run cover

[1]: https://github.com/lerna/lerna/
