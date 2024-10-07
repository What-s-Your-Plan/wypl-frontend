import MemberEmail from './MemberEmail';
import MemberNickname from './MemberNickname';
import MemberPalette from './MemberPalette';
import MemberProfileImage from './MemberProfileImage';
import * as S from './MemberSheet.styled';

import Button           from '@/components/Common/Button';
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
          $size={'sm'}
          $width={'200px'}
          $bgColor={'labelRed'}
          $textColor={'white'}
          onClick={requestDeleteTokens}
        >
          로그아웃
        </Button>
      </S.LogoutButtonWrapper>
    </S.Container>
  );
}

export default MemberSheet;
