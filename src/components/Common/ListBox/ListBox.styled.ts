import { css } from '@emotion/react';

import type { ListBoxProps } from './ListBox';

import { Theme } from '@/styles/Theme';

export const getListBoxSizeStyling = (
  size: Required<ListBoxProps>['$size'],
  width: number,
) => {
  const style = {
    small: css({
      width: `${width}px`,
      height: '32px',
    }),
    medium: css({
      width: `${width}px`,
      height: '40px',
    }),
    large: css({
      width: `${width}px`,
      height: '48px',
    }),
  };

  return style[size];
};

export const getListBoxButtonStyling = () => {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    height: '100%',
    paddingRight: '0.5rem',
    paddingLeft: '0.5rem',

    cursor: 'pointer',

    borderRadius: Theme.borderRadius.medium,
    border: `1px solid ${Theme.color.black300}`,

    '&:hover': {
      borderColor: Theme.color.black400,
    },
  });
};

export const getListBoxOptionContainerStyling = (width: number) => {
  return css({
    position: 'relative',
    zIndex: 20,

    width: `${width}px`,
    marginTop: '0.25rem',
    maxHeight: '15rem',
    padding: '0px',

    listStyle: 'none',
    borderRadius: Theme.borderRadius.small,
    backgroundColor: Theme.color.white,

    boxShadow: `0px 10px 15px ${Theme.color.black200}, 0px 4px 6px ${Theme.color.black100}`,
  });
};

export const getListBoxSelectOptionStyling = () => {
  return css({
    position: 'relative',
    padding: '0.5rem',
    borderRadius: Theme.borderRadius.small,

    cursor: 'pointer',
    color: Theme.color.black900,

    '&:hover': {
      backgroundColor: Theme.color.brown300,
    },
  });
};
