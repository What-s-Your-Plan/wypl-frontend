import styled from 'styled-components';
import tw from 'twin.macro';

import {
  BgColors,
  TextColors,
  BorderColors,
  BgTheme,
  TextTheme,
  BorderTheme,
} from '@/assets/styles/colorThemes';
import { ButtonSize, ButtonSizeTheme } from '@/assets/styles/sizeThemes';

type StyleProps = {
  $size: ButtonSize;
  $width?: string;
  $bgColor?: BgColors;
  $textColor?: TextColors;
  $border?: BorderColors;
  $hover?: boolean;
};

const Button = styled.button<StyleProps>`
    ${tw`
      flex
      flex-row
      justify-center
      content-center
      items-center
      font-medium
      rounded-xl
      cursor-pointer
      transition
      duration-200
    `}
    ${(props) => ButtonSizeTheme[props.$size]}
    ${(props) => props.$width && `width: ${props.$width};`}
    ${(props) => (props.$bgColor ? BgTheme[props.$bgColor] : BgTheme['white'])}
    ${(props) =>
            props.$textColor ? TextTheme[props.$textColor] : TextTheme['black']}
    ${(props) => (props.$border ? tw`border` : '')}
    ${(props) => (props.$border ? BorderTheme[props.$border] : '')}
    ${(props) => (props.$hover ? tw`hover:scale-110 ` : null)}
`;

export default Button;
