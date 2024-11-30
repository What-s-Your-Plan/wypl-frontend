import React, { useEffect, useState } from 'react';

import { GroupUpdateInfo } from '@/@types/Group';
import { SearchMemberForCreateGroupData } from '@/@types/Member';
import { getMemberByEmail } from '@/api/member/getMemberbyEmail';
import noContent from '@/assets/lottie/noContent.json';
import ColorCircle from '@/components/Common/ColorCircle/ColorCircle.tsx';
import Input from '@/components/Common/Input/Input';
import PopOver from '@/components/Common/PopOver';
import * as S from '@/components/group/create/GroupCreatePanel.styled';
import PalettePanel from '@/components/PalettePanel/PalettePanel';
import { LabelColorType } from '@/styles/Theme';
import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';

type GroupUpdatePanelProps = {
  groupUpdateInfo: GroupUpdateInfo;
  groupUpdateInfoEvent: (newName: string, newColor: LabelColorType) => void;
  inviteMemberIdsEvent: (memberIds: Array<number>) => void;
};

function GroupUpdatePanel({
  groupUpdateInfo,
  groupUpdateInfoEvent,
  inviteMemberIdsEvent,
}: GroupUpdatePanelProps) {
  const [searchMember, setSearchMember] = useState<string>('');
  const [searchedMembers, setSearchMembers] = useState<
    Array<SearchMemberForCreateGroupData>
  >([]);

  const handleSearchMemberChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchMember(e.target.value);
    if (e.target.value.length >= 2) {
      const { body } = await getMemberByEmail({
        email: e.target.value,
        size: 49,
      });
      setSearchMembers(body.members);
    } else {
      setSearchMembers([]);
    }
  };

  const [selectedMembers, setSelectedMembers] = useState<
    Array<SearchMemberForCreateGroupData>
  >([]);

  const handleAddMember = async (member: SearchMemberForCreateGroupData) => {
    await setSelectedMembers((prev: Array<SearchMemberForCreateGroupData>) => {
      if (
        !prev.some(
          (memberProfile: SearchMemberForCreateGroupData) =>
            memberProfile.id === member.id,
        )
      ) {
        return [...prev, member];
      }
      return prev;
    });
  };

  const handleMemberCancel = async (memberId: number) => {
    await setSelectedMembers(
      selectedMembers.filter((member) => member.id !== memberId),
    );
  };

  useEffect(() => {
    inviteMemberIdsEvent(
      selectedMembers.map((m: SearchMemberForCreateGroupData) => {
        return m.id;
      }),
    );
  }, [selectedMembers]);

  const [color, setColor] = useState<LabelColorType>(
    groupUpdateInfo.color as LabelColorType,
  );
  const [name, setName] = useState<string>(groupUpdateInfo.name);

  useEffect(() => {
    groupUpdateInfoEvent(name, color);
  }, [color, name]);

  const renderSearchedMembers = () => {
    return searchedMembers.map((member: SearchMemberForCreateGroupData) => {
      return (
        <S.MemberContainer
          key={'memberSearchContainer' + member.id}
          onClick={() => handleAddMember(member)}
        >
          <S.MemberProfileWrapper $color={color}>
            <S.MemberProfileImg
              src={getMemberProfileImageOrDefault(member.profile_image_url)}
              alt={member.nickname}
            />
            <S.MemberProfileBox>
              <S.MemberProfileSpan>{member.email}</S.MemberProfileSpan>
              <S.MemberProfileSpan>{member.nickname}</S.MemberProfileSpan>
            </S.MemberProfileBox>
          </S.MemberProfileWrapper>
        </S.MemberContainer>
      );
    });
  };

  const renderSelectedMembers = () => {
    return selectedMembers.map((member: SearchMemberForCreateGroupData) => {
      return (
        <S.MemberContainer
          key={'memberSelectContainer' + member.id}
          onClick={() => handleMemberCancel(member.id)}
        >
          <S.SelectMemberProfileWrapper
            $color={groupUpdateInfo.color as LabelColorType}
          >
            <S.MemberProfileImg
              src={getMemberProfileImageOrDefault(member.profile_image_url)}
              alt={member.nickname}
            />
            <S.MemberProfileBox>
              <S.MemberProfileSpan>{member.email}</S.MemberProfileSpan>
              <S.MemberProfileSpan>{member.nickname}</S.MemberProfileSpan>
            </S.MemberProfileBox>
          </S.SelectMemberProfileWrapper>
        </S.MemberContainer>
      );
    });
  };

  return (
    <S.CreateGroupForm
      className="w-[580px] h-[60vh] flex flex-col justify-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <S.InputContainer>
        <S.InputWrapper>
          <S.InputLabel htmlFor="groupName">그룹 이름</S.InputLabel>
          <S.InputBox>
            <Input
              id="groupName"
              name="name"
              maxLength={10}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <PopOver
              panelPosition="top-8"
              button={
                <ColorCircle
                  styles={{
                    $color: color,
                    $figure: 'square',
                    $hover: 'none',
                  }}
                />
              }
              panel={<PalettePanel setColor={setColor} isRounded={true} />}
            />
          </S.InputBox>
        </S.InputWrapper>
        <S.MemberWrapper>
          <S.InputWrapper>
            <S.InputLabel>그룹 멤버 추가</S.InputLabel>
            <Input
              disabled={selectedMembers.length > 10}
              value={searchMember}
              onChange={handleSearchMemberChange}
              placeholder={'사용자 이메일 검색'}
            />
          </S.InputWrapper>
        </S.MemberWrapper>
      </S.InputContainer>
      {searchMember.length >= 2 && searchedMembers.length === 0 && (
        <>
          <S.Bar $color={color} />
          <S.InputLabel>
            "{searchMember}"와 일치하는 사용자가 없습니다.
          </S.InputLabel>
          <S.AnimationBox>
            <S.Animation animationData={noContent} />
          </S.AnimationBox>
        </>
      )}
      {searchedMembers.length !== 0 && (
        <>
          <S.Bar $color={color} />
          <S.InputLabel>검색된 사용자</S.InputLabel>
          {renderSearchedMembers()}
        </>
      )}
      {selectedMembers.length !== 0 && (
        <>
          <S.Bar $color={color} />
          <S.InputLabel>추가한 사용자</S.InputLabel>
          {renderSelectedMembers()}
        </>
      )}
    </S.CreateGroupForm>
  );
}

export default GroupUpdatePanel;
