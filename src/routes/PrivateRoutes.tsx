import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { BROWSER_PATH } from '@/constants/Path';
import useJsonWebTokensStore from '@/stores/TokenStore';

function PrivateWrapper() {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useJsonWebTokensStore();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    if (!accessToken || !refreshToken) {
      navigate(BROWSER_PATH.LANDING);
    }

    isMounted.current = true; // 플래그 설정
  }, [accessToken, refreshToken, navigate]); // 의존성 배열을 안전하게 추가

  return <Outlet />;
}

export default PrivateWrapper;
