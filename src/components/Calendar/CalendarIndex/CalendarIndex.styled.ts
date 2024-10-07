import styled from '@emotion/styled';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
  flex 
  flex-col
  `}
`;

const Wrapper = styled.div`
  ${tw`
     invisible
     h-6
    `}
`;

const Button = styled.button<{ $isActive: boolean }>`
    writing-mode: vertical-rl;
    ${tw`
    flex 
    h-20
    justify-center 
    border-t
    border-r
    border-b
    border-label-brown 
    items-end 
    font-bold text-lg
    rounded-r-xl 
    cursor-pointer
    transition-all
    hover:w-12
  `}
    ${(props) => (props.$isActive ? tw`w-12` : tw`w-9`)}
    ${(props) => (props.$isActive ? tw`bg-default-white` : tw`bg-label-brown`)}
    ${(props) =>
            props.$isActive ? tw`text-label-brown` : tw`text-default-white`}
`;

export { Container, Wrapper, Button };
