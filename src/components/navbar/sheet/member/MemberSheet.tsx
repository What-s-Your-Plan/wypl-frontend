import MemberEmail from './MemberEmail';
import MemberNickname from './MemberNickname';
import MemberPalette from './MemberPalette';
import MemberProfileImage from './MemberProfileImage';
import * as S from './MemberSheet.styled';

import Button from '@/components/Common/Button/Button.tsx';
import useJsonWebTokens from '@/hooks/api/useJsonWebTokens';

function MemberSheet() {
  const { requestDeleteTokens } = useJsonWebTokens();

  return (
    <S.Container>
      <MemberEmail />
      <MemberProfileImage />
      <MemberNickname />
      <MemberPalette />
      <S.LogoutButtonWrapper>
        <Button
          styles={{ $size: 'small', $variant: 'danger' }}
          onClick={requestDeleteTokens}
          children={'로그아웃'}
        />
      </S.LogoutButtonWrapper>
    </S.Container>
  );
}

export default MemberSheet;
