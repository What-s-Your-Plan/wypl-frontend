import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`

`;

const Wrapper = styled.div`
  ${tw`
    absolute

    flex
    flex-col

    items-center
    mr-20

    shadow-md
    bg-default-white

    w-[80px]

    h-[100%]
    `}
`;

const Logo = styled.img`
  ${tw`
    mt-5

    w-[60px]

    cursor-pointer
  `}
`;

const ContentWrapper = styled.div`
  ${tw`
    flex
    flex-col

    items-center
    justify-between

    h-full
  `}
`;

export { Container, Wrapper, Logo, ContentWrapper };
