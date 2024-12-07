import { ComponentPropsWithRef, ElementType } from 'react';

import { getLabelButtonColorStyling } from './LabelButton.styled';

import { LabelColorType } from '@/styles/Theme';

export interface LabelButtonProps extends ComponentPropsWithRef<'button'> {
  /**
   * LabelButton 컴포넌트가 사용할 HTML 태그
   *
   * @default: 'button'
   */
  tag?: ElementType;
  /**
   * 라벨에 표시될 텍스트를 지정합니다.
   */
  text: string;
  /**
   *
   * 버튼 색상이 있어야 하므로 기본값은 true입니다.
   *
   * @default: true
   */
  $isSelected?: boolean;
  /**
   *
   */
  $labelColor: LabelColorType;
}

function LabelButton({
  tag = 'button',
  text,
  $labelColor = 'brown',
  $isSelected = true,
  ...attributes
}: LabelButtonProps) {
  const Tag = tag;

  return (
    <Tag
      css={[getLabelButtonColorStyling($isSelected, $labelColor)]}
      aria-pressed={$isSelected}
      {...attributes}
    >
      {text}
    </Tag>
  );
}

export default LabelButton;
