import { css } from '@emotion/react';

export interface InputStyling {
  $variant: 'default' | 'title';

  $width?: string;
  $isValid?: boolean;
  $void?: boolean;
  $resize?: boolean;
}

export const getVariantStyling = (
  variant: Required<InputStyling>['$variant'],
) => {
  const style = {
    title: css({
      fontWeight: 'bold',
      backgroundColor: 'transparent',

      '&:focus': {
        borderColor: '#008080',
      },
    }),
    default: css({
      borderRadius: '0.375rem',

      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(0, 128, 128, 0.5)',
      },
    }),
  };
  return style[variant];
};

export const getInputStyling = () => {
  return css({
    height: '2rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    transition: 'all 0.2s ease',

    '::placeholder': {
      color: '#D1D5DB',
    },

    '&:hover': {
      borderColor: '#9CA3AF',
    },

    '&:focus': {
      outline: 'none',
    },
  });
};
