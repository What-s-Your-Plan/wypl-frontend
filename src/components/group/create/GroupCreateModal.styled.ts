import styled from 'styled-components';
import tw from 'twin.macro';

import { LabelColorType, Theme } from '@/styles/Theme';

const TitleContainer = styled.div``;

const Title = styled.p`
  ${tw`
      mb-4
  `}
`;

type BarProps = {
  $color: LabelColorType;
};

const Bar = styled.div<BarProps>`
  ${tw`
    h-[0.5px]
    mb-5
  `}
  background-color: ${(props) => Theme.labelColor[props.$color]}
`;

export { TitleContainer, Title, Bar };
