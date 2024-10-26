import styled from 'styled-components';
import tw from 'twin.macro';

import { LabelColorType, Theme } from '@/styles/Theme';

type LabelProps = {
  $isSelected?: boolean;
  $labelColor: LabelColorType;
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

  border: 1px solid;

  border-color: ${(props) =>
    !props.$isSelected && Theme.labelColor[props.$labelColor]};

  background-color: ${(props) =>
    (props.$isSelected || props.$isSelected === undefined) &&
    Theme.labelColor[props.$labelColor]};
`;

export default LabelButton;
