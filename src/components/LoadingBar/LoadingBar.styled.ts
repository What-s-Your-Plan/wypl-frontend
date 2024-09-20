import styled from 'styled-components';
import tw from 'twin.macro';

const LoadingBarContainer = styled.div`
  ${tw`
    h-[5px]
    mt-2
    w-full
    overflow-hidden
  `}
`;

const LoadingBarProgress = styled.div<{ width: number }>`
  ${tw`
    h-5
    bg-default-coolgray
  `}
  width: ${(props) => props.width}%;
  transition: width 0.1s linear;
`;

export { LoadingBarContainer, LoadingBarProgress };
