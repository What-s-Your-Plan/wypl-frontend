import { css } from '@emotion/css';

export interface DividerStyling {
  $direction: 'vertical' | 'horizontal';
}

// FIXME: 해당 코드가 적용이 되지 않는 현상이 발생하여 추후 수정이 필요합니다.
export const getDirectionStyling = (
  direction: Required<DividerStyling>['$direction'],
) => {
  const style = {
    vertical: css({
      height: '100%',
      width: '1px',
      backgroundColor: '#d1d5db',
    }),
    horizontal: css({
      width: '100%',
      height: '1px',
      backgroundColor: '#d1d5db',
    }),
  };
  return style[direction];
};
