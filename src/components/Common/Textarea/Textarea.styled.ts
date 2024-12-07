import { css } from '@emotion/react';

import { Theme } from '@/styles/Theme.ts';

export const getTextareaResizeStyling = (canResize: boolean) => {
  return css({
    resize: canResize ? 'both' : 'none',
  });
};

export const getTextareaStyling = () => {
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

    borderRadius: '0.375rem',
    border: `1px solid ${Theme.color.black200}`,

    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${Theme.color.brown600}`,
    },
  });
};
