import { css } from '@emotion/react';
import { Theme } from '@/styles/Theme';

import {
  getContainerStyling,
  getWidthStyling,
  getHeightStyling,
} from './Container.styled';

export interface ContainerProps {
  /**
   * 컨테이너의 너비를 설정합니다.
   */
  $width: keyof typeof Theme.container.width;

  /**
   * 컨테이너의 높이를 설정합니다.
   */
  $height?: keyof typeof Theme.container.height;

  /**
   * 컨테이너의 스타일 변형(variant)을 지정합니다.
   * @default: 'default'
   */
  $variant?: 'default' | 'white';

  children?: React.ReactNode;
}

function Container({
  $width,
  $height,
  $variant: variant = 'default',
  children,
  ...attributes
}: ContainerProps) {
  return (
    <div
      css={css`
        ${
          variant === 'white'
            ? getContainerStyling.whiteContainer
            : getContainerStyling.container
        };
        ${getWidthStyling($width)};
        ${$height ? getHeightStyling($height) : ''};
      `}
      {...attributes}
    >
      {children}
    </div>
  );
}

export default Container;
