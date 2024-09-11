import React, { useRef, useState } from 'react';

import * as S from './MemberNickname.styled';

import { patchNickname } from '@/api/member/patchNickname';
import CheckIcon from '@/assets/icons/check.svg';
import XIcon from '@/assets/icons/x.svg';
import { InputDefault } from '@/components/common/InputText';
import useMemberStore from '@/stores/MemberStore';

function MemberNickname() {
  const { nickname, setNickname } = useMemberStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputNickname, setInputNickname] = useState<string>(nickname!);
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
  };

  const [edit, setEdit] = useState<boolean>(false);
  const toggleEdit = async () => {
    await setEdit(!edit);
    if (inputRef.current !== null) {
      inputRef.current.focus;
    }
  };
  const resetEdit = () => {
    setInputNickname(nickname!);
    setEdit(false);
  };

  const requestUpdateNickname = async () => {
    if (
      nickname === inputNickname ||
      inputNickname.length > 12 ||
      inputNickname.length === 0
    ) {
      setInputNickname(nickname!);
      setEdit(false);
      return;
    }

    const { body } = await patchNickname({ nickname: inputNickname });
    setNickname(body.nickname);
    setEdit(false);
  };

  return (
    <S.Container>
      {edit ? (
        <S.NicknameUpdateWrapper>
          <InputDefault
            value={inputNickname}
            onChange={handleNickname}
            maxLength={12}
            ref={inputRef}
            $width={'170px'}
          />
          <S.IconWrapper>
            <S.IconBox>
              <S.Icon
                src={CheckIcon}
                alt={'o'}
                onClick={requestUpdateNickname}
              />
            </S.IconBox>
            <S.IconBox>
              <S.Icon src={XIcon} alt={'x'} onClick={resetEdit} />
            </S.IconBox>
          </S.IconWrapper>
        </S.NicknameUpdateWrapper>
      ) : (
        <S.Nickname>
          안녕하세요,&nbsp;
          <S.NicknameUpdateBox onClick={toggleEdit}>
            {nickname}
          </S.NicknameUpdateBox>
          님
        </S.Nickname>
      )}
    </S.Container>
  );
}

export default MemberNickname;
