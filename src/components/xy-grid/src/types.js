//@flow
import * as React from 'react';

export type GuttersType = { [string]: string };

export type CellType = {
  children: any,
  gridColumns?: number,
  vertical?: boolean,
  gutterSizes?: string | number | GuttersType,
  cellType?: string,
  gutterType?: string,
  small?: number | string,
  smallOffset?: number,
  medium?: number | string,
  mediumOffset?: number,
  large?: number | string,
  largeOffset?: number,
  xlarge?: number | string,
  xlargeOffset?: number,
  xxlarge?: number | string,
  xxlargeOffset?: number,
  align?: string,
};

export type GridType =
  | {
      children: CellType | React.ChildrenArray<CellType>,
      gutterSizes?: string | number | GuttersType,
      gutterType?: string,
      alignX?: string,
      alignY?: string,
    }
  | {
      children: CellType | React.ChildrenArray<CellType>,
      height: string,
      gutterSizes?: string | number | GuttersType,
      gutterType?: string,
      alignX?: string,
      alignY?: string,
    };

export type GridContainerType = {
  children: GridType | React.ChildrenArray<GridType>,
  type?: string,
  width?: string | number,
  gutterSizes?: string | number | GuttersType,
};
