import { css } from '@emotion/react';

import { Theme } from '@/styles/Theme.ts';

export interface ButtonStyling {
  $size: 'small' | 'medium' | 'large';
  $variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'default';
}

export const getVariantStyling = (
  variant: Required<ButtonStyling>['$variant'],
) => {
  const style = {
    primary: css({
      backgroundColor: Theme.color.brown600,

      color: Theme.color.white,

      '&:hover:enabled': {
        backgroundColor: Theme.color.brown700,
      },

      '&:focus': {
        boxShadow: `0 0 0 3px ${Theme.color.brown700}`,
      },
    }),
    secondary: css({
      backgroundColor: Theme.color.green600,

      color: Theme.color.white,

      '&:hover:enabled': {
        backgroundColor: Theme.color.green700,
      },

      '&:focus': {
        boxShadow: `0 0 0 3px ${Theme.color.green700}`,
      },
    }),
    outline: css({
      backgroundColor: Theme.color.white,

      color: Theme.color.black900,
      boxShadow: `inset 0 0 0 1px ${Theme.color.black200}`,

      '&:hover:enabled': {
        backgroundColor: Theme.color.white900,
      },

      '&:focus': {
        boxShadow: `0 0 0 3px ${Theme.color.white900}`,
      },
    }),
    danger: css({
      backgroundColor: Theme.color.red800,

      color: Theme.color.white,

      '&:hover:enabled': {
        backgroundColor: Theme.color.red900,
      },

      '&:focus': {
        boxShadow: `0 0 0 3px ${Theme.color.red900}`,
      },
    }),
    default: css({
      backgroundColor: Theme.color.white,

      color: Theme.color.black900,

      '&:hover:enabled': {
        backgroundColor: Theme.color.white900,
      },

      '&:focus': {
        boxShadow: `0 0 0 3px ${Theme.color.white900}`,
      },
    }),
  };
  return style[variant];
};

export const getSizeStyling = (size: Required<ButtonStyling>['$size']) => {
  const style = {
    small: css({
      padding: '8px 12px',
    }),
    medium: css({
      padding: '12px 16px',
    }),
    large: css({
      padding: '14px 16px',
    }),
  };

  return style[size];
};

export const getButtonStyling = () =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: `${Theme.borderRadius.medium}`,
    transition: 'all .1s ease-in',
    cursor: 'pointer',

    '&:focus': {
      outlineWidth: '1px',
    },

    '&:disabled': {
      opacity: '.4',
    },
  });
