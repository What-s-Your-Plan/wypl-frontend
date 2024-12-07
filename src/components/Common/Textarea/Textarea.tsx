import type { ComponentPropsWithoutRef } from 'react';

import {
  getTextareaResizeStyling,
  getTextareaStyling,
} from './Textarea.styled';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  $resize: boolean;
}

function Textarea({ $resize, ...attributes }: TextareaProps) {
  return (
    <textarea
      css={[getTextareaStyling, getTextareaResizeStyling($resize)]}
      {...attributes}
    ></textarea>
  );
}

export default Textarea;
