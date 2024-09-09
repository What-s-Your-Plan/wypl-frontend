import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as DS from './DummyOAuthButton.styled';
import * as S from './GoogleOAuthButton.styled';

import { mockIssueTokens } from '@/api/auth/v1/sign-in/mock/mockIssueTokens.ts';
import { BROWSER_PATH } from '@/constants/Path';
import useMemberStore from '@/stores/MemberStore';
import useJsonWebTokensStore from '@/stores/TokenStore';

function DummyOAuthButton() {
  const navigate = useNavigate();

  const [dummyEmail, setDummyEmail] = useState<string>('');
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDummyEmail(e.target.value);
  };

  const { setAccessToken, setRefreshToken } = useJsonWebTokensStore();
  const { setId: setMemberId } = useMemberStore();

  const fetchMockJsonWebTokens = async () => {
    if (dummyEmail.length < 8 || dummyEmail.length > 16) {
      console.warn(
        `이메일(${dummyEmail}, ${dummyEmail.length})의 길이가 8자 미만, 16자 이상입니다.`,
      );
      return;
    }

    const params: MockIssueTokenParams = { email: dummyEmail };
    const data = await mockIssueTokens(params);
    if (data === null) {
      navigate(BROWSER_PATH.LANDING);
      return;
    }
    updateStores(data.body);
    navigate(BROWSER_PATH.CALENDAR);
  };

  const updateStores = ({
    access_token,
    refresh_token,
    member_id,
  }: IssueTokenResponse) => {
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setMemberId(member_id);
  };

  return (
    <DS.Container>
      <DS.Wrapper>
        <DS.Input
          type="email"
          name="email"
          id="email"
          placeholder="아이디 8자 이상 16자 이하"
          onChange={changeEmail}
        />
      </DS.Wrapper>
      <S.GoogleButton onClick={() => fetchMockJsonWebTokens()}>
        Sign in with Dummy
      </S.GoogleButton>
    </DS.Container>
  );
}

export default DummyOAuthButton;
