import styled from 'styled-components';
import tw from 'twin.macro';

import { LabelColorsType, BgTheme } from '@/styles/colorThemes.ts';

const Container = styled.div`
  ${tw`
  
  `}
`;

const Wrapper = styled.div`
  ${tw`
    flex
    justify-between
    items-center
  `}
`;

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

export { Container, Wrapper, Title, Bar };
