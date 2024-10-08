import { css } from '@emotion/react';

export const GlobalStyle = css({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },

  'ul, ol, li': {
    listStyleType: 'none',
  },

  a: {
    textDecoration: 'none',
  },
});
