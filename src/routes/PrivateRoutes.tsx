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

    isMounted.current = true;
  }, [accessToken, refreshToken, navigate]);

  return <Outlet />;
}

export default PrivateWrapper;
