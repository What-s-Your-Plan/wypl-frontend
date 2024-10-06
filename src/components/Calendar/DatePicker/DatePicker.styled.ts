import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    relative
    flex
    flex-col
    min-h-[20px]
    justify-center
    `}
`;

const Header = styled.h2`
  ${tw`
text-lg
font-semibold
text-gray-900
`}
`;

const DateWrapper = styled.div<{ $idx: number }>`
  ${tw`py-1`}
  ${(props) => props.$idx > 6 && tw`border-t border-gray-200`}
`;

export interface DateButtonProps {
  $isSelected: boolean;
  $isToday: boolean;
  $isCurrentMonth: boolean;
}

const DateButton = styled.button<DateButtonProps>`
  ${tw`
    cursor-pointer
    rounded-full
    mx-auto
    flex
    size-5
    items-center
    justify-center
    text-xs
  `}
  ${(props) => props.$isSelected && tw`text-default-white`}
    ${(props) =>
    !props.$isSelected &&
    props.$isToday &&
    tw`text-indigo-600 border border-indigo-600`}
    ${(props) =>
    !props.$isSelected &&
    props.$isToday &&
    !props.$isCurrentMonth &&
    tw`text-indigo-400`}
    ${(props) =>
    !props.$isSelected &&
    !props.$isToday &&
    props.$isCurrentMonth &&
    tw`text-default-black`}
    ${(props) =>
    !props.$isSelected &&
    !props.$isToday &&
    !props.$isCurrentMonth &&
    tw`text-gray-400`}
    ${(props) => props.$isSelected && tw`bg-label-brown`}
    ${(props) => !props.$isSelected && tw`hover:bg-gray-200`}
    ${(props) => (!props.$isSelected || props.$isToday) && tw`font-semibold`}
`;

const ButtonFlex = styled.div`
  ${tw`
  flex
  mt-1
  justify-between
  `}
`;

const TodayButton = styled.div`
  ${tw`
    text-xs
    w-fit
    h-fit
    p-1
    rounded-md
    border
    font-medium
    border-gray-500
    `}
`;

const Chevrons = styled.img`
  filter: invert(30%) sepia(8%) saturate(1109%) hue-rotate(176deg)
    brightness(96%) contrast(83%);

  &:hover {
    filter: none;
  }
`;

const ChevronButtonFlex = styled.div`
  ${tw`
    flex
    `}
`;

const ChevronsButton = styled.button`
  ${tw`
  flex
  flex-none
  items-center
  justify-center
  p-1
  `}
`;

const WeekHeader = styled.div`
  ${tw`
    mt-2
    grid
    grid-cols-7
    text-center
    text-xs
    leading-6
    text-gray-500
    `}
`;

const CalendarGrid = styled.div`
  ${tw`
    grid
    grid-cols-7
    mt-1 
    text-sm
    `}
`;

export {
  Container,
  Header,
  ButtonFlex,
  DateWrapper,
  DateButton,
  Chevrons,
  TodayButton,
  ChevronButtonFlex,
  ChevronsButton,
  WeekHeader,
  CalendarGrid,
};
