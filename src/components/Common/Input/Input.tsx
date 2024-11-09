import { ComponentPropsWithRef } from 'react';

import type { InputStyling } from './Input.styled';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  styles: InputStyling;
}

function Input({ styles }: InputProps) {
  const Tag = 'input';

  return (
    <div>
      <Tag />
    </div>
  );
}

export default Input;
