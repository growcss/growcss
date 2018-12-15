# Testing in GrowCss

We encourage adding tests to all components on **GrowCss**.

**Jest** is the testing framework across all types of tests in GrowCss.

## Testing support as of today includes
### Unit tests
- write unit test for component using **Jest test framework**.
- *unit tests* for packages should be structured under `<pkg>/src/__tests__/unit` folder.
- on CI these are run against changed packages only.
- run all tests `yarn test`.
- run all tests in watch mode `yarn jest --watch `.
- run test for changed packages `yarn test:changed`.
- run single test `yarn test <path_to_test_file>`.
- run tests under certain directories `yarn jest <path_to_directory>`.
