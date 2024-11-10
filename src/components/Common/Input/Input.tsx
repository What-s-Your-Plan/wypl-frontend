import type { ComponentPropsWithRef } from 'react';

import {
  getInputStyling,
  getVariantStyling,
  getSizeStyling,
  getFlexStyling,
} from './Input.styled';

import Flex from '@/components/Common/Flex/Flex';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  /** Input 종류 */
  $variant?: 'default' | 'title';
  /** Input 크기 */
  $size?: 'small' | 'medium' | 'large';

  $disable?: boolean;
}

function Input({
  $variant = 'default',
  $size = 'medium',
  ...attributes
}: InputProps) {
  return (
    <Flex css={[getFlexStyling($size)]}>
      <input
        css={[
          getInputStyling,
          getVariantStyling($variant),
          getSizeStyling($size),
        ]}
        {...attributes}
      />
    </Flex>
  );
}

export default Input;
