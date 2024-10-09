import { css } from '@emotion/react';

import { Theme } from '@/styles/Theme.ts';

export const getSwitchStyling = (isEnabled: boolean) =>
  css({
    display: 'inline-flex',
    height: '24px',
    width: '44px',
    cursor: 'pointer',
    borderRadius: Theme.borderRadius.large,
    borderWidth: '2px',
    borderColor: 'transparent',
    position: 'relative',

    backgroundColor: isEnabled ? Theme.color.brown : Theme.color.white800,
    transition: 'background-color 200ms ease-in-out',
  });

export const getKnobStyling = (isEnabled: boolean) =>
  css({
    display: 'inline-block',
    height: '20px',
    width: '20px',
    borderRadius: '9999px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    pointerEvents: 'none',
    transition: 'transform 200ms ease-in-out',

    transform: isEnabled ? 'translateX(20px)' : 'translateX(0)',
    ring: '0',
  });
