import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './GoogleOAuth.styled';

import {
  IssueTokenParams,
  IssueTokenPathVariable,
}                             from '@/api/auth/issueTokens.ts';
import GoogleLoadingAnimation from '@/components/Animation/GoogleLoading';
import OAUTH_PROVIDER         from '@/constants/OAuth';
import { BROWSER_PATH } from '@/constants/Path';
import useJsonWebTokens from '@/hooks/api/useJsonWebTokens';
import useQueryParams from '@/hooks/useSearchParams';

function GoogleOAuth() {
  const navigate = useNavigate();

  const { code } = useQueryParams();
  const { requestIssueTokens } = useJsonWebTokens();

  const fetchJsonWebTokens = () => {
    const issueTokenPathVariable: IssueTokenPathVariable = {
      provider: OAUTH_PROVIDER.GOOGLE,
    };
    const param: IssueTokenParams = { code };
    const body = requestIssueTokens(issueTokenPathVariable, param);
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
