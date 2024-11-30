import { css } from '@emotion/react';

import type { CalendarLabelProps } from './CalendarLabel';

import { LabelColorType, Theme } from '@/styles/Theme.ts';

export const getCalendarLabelStyling = () => {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: '2.25rem',
    minWidth: '3.5rem',
    padding: '0.25rem 0.75rem',

    borderWidth: '1px',
    borderStyle: 'solid',
  });
};

export const getCalendarLabelVariantStyling = (
  variant: Required<CalendarLabelProps>['$variant'],
) => {
  const style = {
    background: css({
      color: Theme.color.white,
    }),
    border: css({
      color: Theme.color.black,

      background: 'none',
    }),
  };

  return style[variant];
};

export const getCalendarLabelBorderStyling = (
  border: Required<CalendarLabelProps>['$rounded'],
) => {
  const style = {
    small: css({
      borderRadius: Theme.borderRadius.small,
    }),
    medium: css({
      borderRadius: Theme.borderRadius.medium,
    }),
    large: css({
      borderRadius: Theme.borderRadius.large,
    }),
  };
  return style[border];
};

export const getCalendarLabelColorStyling = (color: LabelColorType) => {
  return css({
    borderColor: Theme.labelColor[color],
    backgroundColor: Theme.labelColor[color],
  });
};
