import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import {
  BgTheme,
  TextColors,
  TextTheme,
  BgColorsType,
} from '@/styles/colorThemes.ts';

const show = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
`;

export interface ContainerProps {
  $bgColor: BgColorsType;
  $textColor: TextColors;
}

const Container = styled.div<ContainerProps>`
  ${tw`
        flex
        items-center
        justify-between
        flex-col
        w-[300px]
        h-[60px]
        mt-4
    `}
  ${(props) => BgTheme[props.$bgColor]}
    ${(props) => TextTheme[props.$textColor]}
    animation: ${show} 500ms ease-in-out;
`;

const CloseButtonWrapper = styled.div`
  ${tw`
        flex
        justify-end
        items-start

        w-full
        h-3
    `}
`;

const Icon = styled.img`
  ${tw` 
        scale-75
        cursor-pointer
    `}
`;

const MessageWrapper = styled.div`
  ${tw`
        flex
        items-center
        w-[90%]
    `}
`;

const Message = styled.span``;

export { Container, CloseButtonWrapper, Icon, MessageWrapper, Message };
