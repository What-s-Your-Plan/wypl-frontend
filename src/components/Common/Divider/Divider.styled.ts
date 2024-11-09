import { css } from '@emotion/react';

export interface DividerStyling {
  $direction: 'vertical' | 'horizontal';
}

export const getDirectionStyling = (
  direction: Required<DividerStyling>['$direction'],
) => {
  const style = {
    vertical: css({
      height: '100%',
      width: '1px',
      backgroundColor: '#d1d5db',
    }),
    horizontal: css({
      width: '100%',
      height: '1px',
      backgroundColor: '#d1d5db',
    }),
  };
  return style[direction];
};
