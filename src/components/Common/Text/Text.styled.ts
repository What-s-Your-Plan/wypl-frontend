import { css } from '@emotion/react';

import type { TextProps } from './Text';

export const getTextSizeStyling = (size: Required<TextProps>['$size']) => {
  const style = {
    small: css({
      fontSize: '10px',
    }),
    medium: css({
      fontSize: '14px',
    }),
    large: css({
      fontSize: '18px',
    }),
  };
  return style[size];
};
