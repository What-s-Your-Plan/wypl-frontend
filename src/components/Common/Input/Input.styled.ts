import { css } from '@emotion/react';

import type { InputProps } from './Input';

import { Theme } from '@/styles/Theme.ts';

export const getVariantStyling = (
  variant: Required<InputProps>['$variant'],
) => {
  const style = {
    title: css({
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: `2px solid ${Theme.color.black200}`,
      '&:focus': {
        borderColor: Theme.color.brown600,
      },
    }),
    default: css({
      borderRadius: '0.375rem',
      border: `1px solid ${Theme.color.black200}`,

      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${Theme.color.brown600}`,
      },
    }),
  };
  return style[variant];
};

export const getFlexStyling = (size: Required<InputProps>['$size']) => {
  const style = {
    small: css({
      margin: '6px 10px',
    }),
    medium: css({
      margin: '10px 14px',
    }),
    large: css({
      margin: '12px 16px',
    }),
  };
  return style[size];
};

export const getSizeStyling = (size: Required<InputProps>['$size']) => {
  const style = {
    small: css({
      padding: '6px 10px',
    }),
    medium: css({
      padding: '8px 12px',
    }),
    large: css({
      padding: '12px 16px',
    }),
  };
  return style[size];
};

export const getInputStyling = () => {
  return css({
    width: '100%',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    transition: 'all 0.2s ease',

    '::placeholder': {
      color: Theme.color.black400,
    },

    '&:hover': {
      borderColor: Theme.color.black200,
    },

    '&:focus': {
      outline: 'none',
    },
  });
};
