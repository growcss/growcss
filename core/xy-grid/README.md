# GrowCss XY-Grid

## Installation

```bash
npm install @growcss/xy-grid
```

or if you're using yarn

```bash
yarn add @growcss/xy-grid
```

## Usage

To implement XY-Grid component into your project you'll need to add the import:

```js
import { Cell, GridX, GridContainer } from '@growcss/xy-grid';
```

After adding import into your project you can use it simply like:

```jsx
<GridContainer>
  <GridX>
    <Cell small={4}>cell</Cell>
    <Cell small={4}>cell</Cell>
    <Cell small={4}>cell</Cell>
  </GridX>
</GridContainer>
```
