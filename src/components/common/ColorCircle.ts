import styled from '@emotion/styled';
import tw from 'twin.macro';

import { LabelColorsType, LabelTheme } from '@/assets/styles/colorThemes';

type CircleProps = {
  $labelColor: LabelColorsType;
  $size?: string;
  $cursor?: string;
  $hover?: boolean;
  $isRounded?: boolean;
};

const ColorCircle = styled.div<CircleProps>`
  ${tw`
    rounded-full
    aspect-square
  `}
  ${(props) => LabelTheme[props.$labelColor]}
    ${(props) => (props.$size ? `width: ${props.$size};` : tw`size-6`)}
    ${(props) => (props.$cursor ? `cursor: ${props.$cursor};` : '')}
    ${(props) => (props.$hover ? tw`hover:scale-110` : '')}
`;

export default ColorCircle;
