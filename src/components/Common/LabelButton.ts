import styled from 'styled-components';
import tw from 'twin.macro';

import { LabelColorsType, LabelTheme } from '@/styles/colorThemes.ts';

type LabelProps = {
  $labelColor: LabelColorsType;
};

const LabelButton = styled.button<LabelProps>`
  ${tw`rounded-full
    flex
    justify-center
    items-center
    w-fit
    h-9
    min-w-14
    px-3
    py-1
    text-default-white
    font-semibold
  `}
  ${(props) => LabelTheme[props.$labelColor]}
`;

export default LabelButton;
