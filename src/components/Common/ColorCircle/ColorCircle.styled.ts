import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { LabelColorType, Theme } from '@/styles/Theme.ts';

export interface ColorCircleStyling {
  $figure: 'circle' | 'square';
  $hover: 'hover' | 'none';
  $color: LabelColorType;

  $size?: string;
  $cursor?: string;
  $hoverPrev?: boolean;
  $isRounded?: boolean;
}

export const getFigureStyling = (
  figure: Required<ColorCircleStyling>['$figure'],
) => {
  const style = {
    circle: css({
      borderRadius: '50%',
    }),
    square: css({}),
  };
  return style[figure];
};

export const getColorStyling = (color: LabelColorType) => {
  return css({
    backgroundColor: Theme.labelColor[color],
  });
};

export const getHoverStyling = (
  isHover: Required<ColorCircleStyling>['$hover'],
) => {
  const style = {
    hover: css({
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    }),
    none: css({}),
  };
  return style[isHover];
};

export const getColorCircleStyling = () => {
  return css({
    cursor: 'pointer',
    width: '1.5rem',
    height: '1.5rem',
  });
};

const ColorCirclePrev = styled.div<ColorCircleStyling>`
  ${tw`
    rounded-full
  `}
  ${(props) => (props.$size ? `width: ${props.$size};` : tw`size-6`)}
    ${(props) => (props.$cursor ? `cursor: ${props.$cursor};` : '')}
    ${(props) => (props.$hoverPrev ? tw`hover:scale-110` : '')}
`;

export default ColorCirclePrev;
