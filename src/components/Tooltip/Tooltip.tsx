import React from 'react';

import * as S from './Tooltip.styled.ts';

type TooltipProps = {
  /* 툴팁에 표시할 텍스트 */
  text: string;
  /* 툴팁을 감싸고 있는 자식 요소 */
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <S.Container>
      {children}
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default Tooltip;
