import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './GoogleOAuth.styled';

import GoogleLoadingAnimation from '@/components/animation/GoogleLoading';
import OAUTH_PROVIDER from '@/constants/OAuth';
import { BROWSER_PATH } from '@/constants/Path';
import useJsonWebTokens from '@/hooks/api/useJsonWebTokens';
import useQueryParams from '@/hooks/useSearchParams';

function GoogleOAuth() {
  const navigate = useNavigate();

  const { code } = useQueryParams();
  const { requestIssueTokens } = useJsonWebTokens();

  const fetchJsonWebTokens = async () => {
    const param: IssueTokenParams = { code };
    const body = await requestIssueTokens(param, OAUTH_PROVIDER.GOOGLE);
    if (body === null) {
      navigate(BROWSER_PATH.LANDING);
      return;
    }
    navigate(BROWSER_PATH.CALENDAR);
  };

  useEffect(() => {
    if (code !== undefined) {
      fetchJsonWebTokens();
    }
  }, [code]);

  return (
    <S.Container>
      <GoogleLoadingAnimation />
    </S.Container>
  );
}

export default GoogleOAuth;
