import React, { ComponentPropsWithoutRef, ElementType } from 'react';

import type { ButtonStyling } from '@/components/Common/Button/Button.styled.ts';

import {
  getButtonStyling,
  getSizeStyling,
  getVariantStyling,
} from '@/components/Common/Button/Button.styled.ts';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Button 컴포넌트가 사용할 HTML 태그
   *
   * @default 'button'
   */
  tag?: ElementType;
  /** Button 스타일 옵션 */
  styles: ButtonStyling;
  /** Button 하위 컴포넌트 */
  children: React.ReactNode;
}

function Button({
  tag = 'button',
  styles,
  children,
  ...attributes
}: ButtonProps) {
  const Tag = tag;

  return (
    <Tag
      css={[
        getButtonStyling(),
        getSizeStyling(styles.$size),
        getVariantStyling(styles.$variant),
      ]}
      {...attributes}
    >
      {children}
    </Tag>
  );
}

export default Button;
