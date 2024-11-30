import { css } from '@emotion/react';

import { LabelColorType, Theme } from '@/styles/Theme.ts';

export const getLabelButtonColorStyling = (
  isSelected: boolean,
  color: LabelColorType,
) => {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: '2.25rem', // Tailwind's h-9
    minWidth: '3.5rem', // Tailwind's min-w-14
    padding: '0.25rem 0.75rem', // Tailwind's px-3 py-1
    borderRadius: '9999px', // Tailwind's rounded-full

    fontWeight: 600, // Tailwind's font-semibold

    color: Theme.color.white,
    cursor: 'pointer',

    border: '1px solid',

    borderColor: !isSelected ? Theme.labelColor[color] : undefined,
    backgroundColor: isSelected ? Theme.labelColor[color] : undefined,
  });
};
