import type { ComponentPropsWithRef } from 'react';

import { getInputStyling, getVariantStyling } from './Input.styled';

import type { InputStyling } from './Input.styled';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  /** Input 스타일 옵션 */
  styles: InputStyling;
}

function Input({ styles, ...attributes }: InputProps) {
  return (
    <input
      css={[getInputStyling, getVariantStyling(styles.$variant)]}
      {...attributes}
    />
  );
}

export default Input;
