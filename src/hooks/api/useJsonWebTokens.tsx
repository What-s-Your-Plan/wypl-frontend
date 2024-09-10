import { useNavigate } from 'react-router-dom';

import { deleteJsonWebTokens } from '@/api/auth/v1/logout/deleteJsonWebTokens.ts';
import {
  ReissueTokenParams,
  reissueTokens,
} from '@/api/auth/v1/reissue/reissue.ts';
import {
  issueTokens,
  IssueTokenParams,
  IssueTokenPathVariable,
} from '@/api/auth/v1/sign-in/issueTokens.ts';
import { BROWSER_PATH } from '@/constants/Path';
import useMemberStore from '@/stores/MemberStore';
import useJsonWebTokensStore from '@/stores/TokenStore';

export default function useJsonWebTokens() {
  const { refreshToken, setAccessToken, setRefreshToken, resetTokens } =
    useJsonWebTokensStore();
  const { setId, resetMember } = useMemberStore();

  const navigate = useNavigate();

  const requestIssueTokens = async (
    issueTokenPathVariable: IssueTokenPathVariable,
    issueTokenParams: IssueTokenParams,
  ) => {
    const data = await issueTokens(issueTokenPathVariable, issueTokenParams);
    const { access_token, refresh_token, member_id } = data.body;

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setId(member_id);
  };

  const requestDeleteTokens = async () => {
    await deleteJsonWebTokens().finally(() => {
      resetTokens();
      resetMember();
      navigate(BROWSER_PATH.LANDING);
    });
  };

  const requestReissueTokens = async () => {
    if (refreshToken === null) {
      return;
    }

    const params: ReissueTokenParams = {
      refresh_token: refreshToken,
    };
    const data = await reissueTokens(params);
    const { access_token, refresh_token, member_id } = data.body;

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setId(member_id);
  };

  return { requestIssueTokens, requestDeleteTokens, requestReissueTokens };
}
