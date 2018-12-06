const flexAlign = {
  top: 'flex-start',
  bottom: 'flex-end',
  middle: 'center',
  stretch: 'stretch',
};

const flexJustify = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  justify: 'space-between',
  spaced: 'space-around',
};

export const GridElementAlign = (alignX: string | null = null, alignY: string | null = null): string => {
  let css = '';

  if (alignX !== null) {
    if (flexJustify[alignX] !== undefined) {
      css += `justify-content:${flexJustify[alignX]};`;
    } else {
      throw new Error(`${alignX} is not a valid value for horizontal alignment. Use left, right, center, justify, or spaced.`);
    }
  }

  if (alignY !== null) {
    if (flexAlign[alignY] !== undefined) {
      css += `align-items:${flexAlign[alignY]};`;
    } else {
      throw new Error(`${alignY} is not a valid value for vertical alignment. Use top, bottom, middle, or stretch.`);
    }
  }

  return css;
};

export const CellElementAlign = (align: string | null = null) => {
  let css = '';

  if (align !== null) {
    if (flexAlign[align] !== undefined) {
      css += `align-self:${flexAlign[align]};`;
    } else {
      throw new Error(`${align} is not a valid value for vertical alignment. Use top, bottom, middle, or stretch.`);
    }
  }

  return css;
};
