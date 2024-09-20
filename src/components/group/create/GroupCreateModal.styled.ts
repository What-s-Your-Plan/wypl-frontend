import styled from 'styled-components';
import tw from 'twin.macro';

import { LabelColorsType, BgTheme } from '@/assets/styles/colorThemes';

const TitleContainer = styled.div``;

const Title = styled.p`
  ${tw`
      mb-4
  `}
`;

type BarProps = {
  $color: LabelColorsType;
};

const Bar = styled.div<BarProps>`
  ${tw`
    h-[0.5px]
    mb-5
  `}
  ${(props) => BgTheme[props.$color]}
`;

export { TitleContainer, Title, Bar };
