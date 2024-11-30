import { ComponentPropsWithRef, ElementType } from 'react';

import {
  getCalendarLabelBorderStyling,
  getCalendarLabelColorStyling,
  getCalendarLabelStyling,
  getCalendarLabelVariantStyling,
} from './CalendarLabel.styled';

import { LabelColorType } from '@/styles/Theme';

export interface CalendarLabelProps extends ComponentPropsWithRef<'div'> {
  /**
   * 사용할 HTML 태그 유형을 지정합니다.
   *
   * @default: 'div'
   */
  tag?: ElementType;
  /**
   * 라벨에 표시될 텍스트를 지정합니다.
   */
  text: string;
  /**
   * 라벨의 모서리 스타일을 지정합니다.
   *
   * @default: 'medium'
   */
  $rounded?: 'small' | 'medium' | 'large';
  /**
   * 라벨의 스타일 변형을 지정합니다.
   *
   * @default: 'background'
   */
  $variant?: 'background' | 'border';
  /**
   * 라벨의 색상을 지정합니다.
   */
  $color: LabelColorType;
}

function CalendarLabel({
  tag = 'div',
  $rounded = 'medium',
  $variant = 'background',
  $color,
  text,
  ...attributes
}: CalendarLabelProps) {
  const Tag: ElementType = tag;

  return (
    <Tag
      css={[
        getCalendarLabelStyling,
        getCalendarLabelBorderStyling($rounded),
        getCalendarLabelColorStyling($color),
        getCalendarLabelVariantStyling($variant),
      ]}
      {...attributes}
    >
      {text}
    </Tag>
  );
}

export default CalendarLabel;
