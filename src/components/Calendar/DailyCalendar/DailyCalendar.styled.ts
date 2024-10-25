import styled from '@emotion/styled';
import tw from 'twin.macro';

import { LabelColorType, Theme } from '@/styles/Theme';

const VerticalLine = styled.span`
  ${tw`
    border-t
    border-b
    h-10
    w-1 
    bg-default-coolgray
  `}
`;

const ScheduleContainer = styled.div`
  ${tw`
    flex
    gap-4
    content-center
    cursor-pointer
  `}
`;

const LabelDiv = styled.div<{ $bgColor: LabelColorType }>`
  ${tw`
    rounded-xl
    w-[32px]
  `}

  background-color: ${(props) => Theme.labelColor[props.$bgColor]};
`;

const ScheduleContents = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;

export { VerticalLine, LabelDiv, ScheduleContainer, ScheduleContents };
