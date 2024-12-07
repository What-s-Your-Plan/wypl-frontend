import { css } from '@emotion/react';

import { Theme } from '@/styles/Theme';

export const getContainerStyling = {
  container: css`
    padding: 16px;
    margin-left: 28px;
    border-radius: ${Theme.borderRadius.medium};
    background-color: ${Theme.color.white};
    box-shadow: ${Theme.container.shadows.md};
    overflow: hidden;
  `,
  whiteContainer: css`
    padding: 12px;
    margin-bottom: 16px;
    border-radius: ${Theme.borderRadius.medium};
    background-color: ${Theme.color.white};
    box-shadow: ${Theme.container.shadows.md};
  `,
};

export const getWidthStyling = (
  widthKey: keyof typeof Theme.container.width,
) => css`
  ${Theme.container.width[widthKey]}
`;

export const getHeightStyling = (
  heightKey?: keyof typeof Theme.container.height,
) => (heightKey ? css`${Theme.container.height[heightKey]}` : '');
