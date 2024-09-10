import * as S from './MemberEmail.styled';

import useMemberStore from '@/stores/MemberStore';


function MemberEmail() {
  const { email } = useMemberStore();

  return (
    <S.Container>
      <S.Email>{email}</S.Email>
    </S.Container>
  );
}

export default MemberEmail;
