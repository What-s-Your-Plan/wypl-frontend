import { css } from '@emotion/react';

import type { PopoverProps } from './PopOver';
import { Theme } from '@/styles/Theme';

export const getPopOverPositionStyling = (
  position: Required<PopoverProps>['$position'],
) => {
  const style = {
    default: css({
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    top: css({
      top: '32px',
    }),
    bottom: css({
      bottom: '32px',
    }),
  };
  return style[position];
};

export const getPopOverContainerStyling = () => {
  return css({
    position: 'relative',
    width: 'fit-content',
    height: 'fit-content',
  });
};

export const getPopOverButtonStyling = () => {
  return css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  });
};

export const getPopOverPanelStyling = () => {
  return css({
    position: 'absolute',
    zIndex: 10,
    maxWidth: '320px',
    padding: '16px',
    borderRadius: Theme.borderRadius.medium,
    '@media (min-width: 640px)': {
      padding: 0,
    },
    '@media (min-width: 1024px)': {
      maxWidth: '48rem',
    },
  });
};
