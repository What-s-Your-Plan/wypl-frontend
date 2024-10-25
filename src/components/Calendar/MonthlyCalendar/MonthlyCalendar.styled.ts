import styled from 'styled-components';
import tw from 'twin.macro';

import { LabelColorType, Theme } from '@/styles/Theme';

const DateContainer = styled.div`
  ${tw`
    flex
    flex-col
    border-t-2
    border-t-main
    min-h-[100px]
  `}
`;

const ScheduleButton = styled.button<{
  $color: LabelColorType;
  $top: number;
  $width: number;
}>`
  ${tw`
    flex 
    cursor-pointer 
    border-x 
    border-b 
    p-1 
    rounded 
    absolute 
    left-0 
    justify-center 
    items-center 
    z-[5] 
    text-xs 
    h-4 
    text-default-white
    transition-all
    `}
  background-color: ${(props) => Theme.labelColor[props.$color]};
  ${(props) => `top: ${props.$top}rem;`}
  ${(props) => `width: ${props.$width}00%;`}
    &:hover {
    scale: 103%;
    z-index: 10;
  }
`;

const DateSpan = styled.span<{
  $isCurrentMonth: boolean;
  $day: number;
  $isSelected: boolean;
}>`
  ${tw`pl-1`}
  ${(props) => {
    if (props.$day === 0) {
      return tw`text-label-red`;
    } else if (props.$day) {
      return tw`text-label-blue`;
    }
    return '';
  }}
    ${(props) =>
    props.$isCurrentMonth ? tw`text-default-black` : tw`text-gray-400`}
    ${(props) =>
    props.$isSelected ? tw`bg-label-brown text-default-white` : ''}
`;

const NoSchedule = styled.div<{ $top: number }>`
  ${tw`invisible h-4 absolute`}
  ${(props) => `top: ${props.$top}rem;`}
`;

export { DateContainer, ScheduleButton, DateSpan, NoSchedule };
