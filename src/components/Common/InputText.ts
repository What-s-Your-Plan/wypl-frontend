import styled from 'styled-components';
import tw from 'twin.macro';

type InputTextProps = {
  $width?: string;
  $isValid?: boolean;
  $void?: boolean;
  $resize?: boolean;
};

const InputDefault = styled.input<InputTextProps>`
  ${tw`
    h-8
    px-2
    transition

    placeholder:text-gray-300
    hover:outline-gray-400
    focus:!outline-none

    rounded-md
    focus:ring
    focus:ring-main
    `}
  ${(props) => (props.$void ? '' : tw`outline outline-1`)}
  ${(props) =>
    props.$isValid === false
      ? tw`outline-label-red text-label-red`
      : tw`outline-gray-300`}
  ${(props) => (props.$width ? `width:${props.$width};` : tw`grow`)}
`;

const InputTextArea = styled.textarea<InputTextProps>`
  ${tw`
    rounded-md
    px-2
    transition

    placeholder:text-gray-300
    hover:outline-gray-400
    focus:!outline-none
    focus:ring
    focus:ring-main
    `}
  ${(props) => (props.$void ? '' : tw`outline outline-1`)}
  ${(props) =>
    props.$isValid === false
      ? tw`outline-label-red text-label-red`
      : tw`outline-gray-300`}
  ${(props) => (props.$width ? `width:${props.$width};` : tw`grow`)}
  ${(props) => (props.$resize === false ? tw`resize-none` : '')}
`;

export { InputDefault, InputTextArea };
