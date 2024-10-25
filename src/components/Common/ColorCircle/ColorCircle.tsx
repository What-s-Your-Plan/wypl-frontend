import { ComponentPropsWithRef, ElementType } from 'react';

import {
  ColorCircleStyling,
  getColorCircleStyling,
  getColorStyling,
  getFigureStyling,
  getHoverStyling,
} from './ColorCircle.styled';

export interface ColorCircleProps extends ComponentPropsWithRef<'div'> {
  /**
   *
   * ColorCircle 컴포넌트가 사용할 HTML 태그
   *
   * @default 'div'
   */
  tag?: ElementType;

  /** ColorCircle 스타일 옵션 */
  styles: ColorCircleStyling;
}

function ColorCircle({ tag = 'div', styles, ...attributes }: ColorCircleProps) {
  const Tag = tag;

  return (
    <Tag
      css={[
        getColorCircleStyling(),
        getColorStyling(styles.$color),
        getFigureStyling(styles.$figure),
        getHoverStyling(styles.$hover),
      ]}
      {...attributes}
    />
  );
}

export default ColorCircle;
