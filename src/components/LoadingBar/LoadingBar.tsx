import { useState, useEffect } from 'react';

import * as S from '@/components/LoadingBar/LoadingBar.styled.ts';

export interface LoadingBarProps {
  /** 초기 로딩바 시간 */
  initialTime: number;
}

function LoadingBar({ initialTime }: LoadingBarProps) {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) =>
        Math.max(prevWidth - 100 / (initialTime * 10), 0),
      );
    }, 100);

    return () => clearInterval(interval);
  }, [initialTime]);

  return (
    <S.LoadingBarContainer>
      <S.LoadingBarProgress width={width} />
    </S.LoadingBarContainer>
  );
}

export default LoadingBar;
