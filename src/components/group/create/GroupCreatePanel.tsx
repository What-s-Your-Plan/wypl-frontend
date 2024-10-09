import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import PalettePanel     from '@/components/PalettePanel/PalettePanel';
import ColorCircle      from '@/components/Common/ColorCircle';
import { InputDefault } from '@/components/Common/InputText';
import PopOver          from '@/components/Common/PopOver';

import { GroupInfoData } from '@/@types/Group';
import { SearchMemberForCreateGroupData } from '@/@types/Member';
import { getMemberByEmail } from '@/api/member/getMemberbyEmail';
import noContent           from '@/assets/lottie/noContent.json';
import { LabelColorsType } from '@/styles/colorThemes.ts';
import * as S              from '@/components/group/create/GroupCreatePanel.styled';
import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';

type GroupCreatePanelProps = {
  states: GroupInfoData;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setStates: Dispatch<SetStateAction<GroupInfoData>>;
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
};

function GroupCreatePanel({
  states,
  handleChange,
  setStates,
  color,
  setColor,
}: GroupCreatePanelProps) {
  const [selectedMembers, setSelectedMembers] = useState<
    SearchMemberForCreateGroupData[]
  >([]);
  const [searchMember, setSearchMember] = useState<string>('');
  const [searchedMemberList, setSearchMemberList] = useState<
    SearchMemberForCreateGroupData[]
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
      setSearchMemberList(body.members);
    } else {
      setSearchMemberList([]);
    }
  };

  const handleMemberCancel = (member_id: number) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== member_id),
    );
  };

  useEffect(() => {
    setStates((prev) => {
      return {
        ...prev,
        color: color,
      };
    });
  }, [color]);

  useEffect(() => {
    const newMemberList = selectedMembers.map((member) => {
      return member.id;
    });
    setStates((prev) => {
      return {
        ...prev,
        member_id_list: newMemberList,
      };
    });
  }, [selectedMembers]);

  const renderSearchedMembers = () => {
    return searchedMemberList.map((member: SearchMemberForCreateGroupData) => {
      return (
        <S.MemberContainer
          key={'memberSearchContainer' + member.id}
          onClick={() => {
            setSelectedMembers((prev) => {
              if (!prev.some((x) => x.id === member.id)) {
                return [...prev, member];
              }
              return prev;
            });
          }}
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
    return selectedMembers.map((member) => {
      return (
        <S.MemberContainer
          key={'memberSelectContainer' + member.id}
          onClick={() => handleMemberCancel(member.id)}
        >
          <S.SelectMemberProfileWrapper $color={color}>
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
      className="w-[580px] h-[60vh] flex flex-col justify-center scrollBar"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <S.InputContainer>
        <S.InputWrapper>
          <S.InputLabel htmlFor="groupName">그룹 이름</S.InputLabel>
          <S.InputBox>
            <InputDefault
              id="groupName"
              name="name"
              maxLength={10}
              value={states.name}
              onChange={handleChange}
            />
            <PopOver
              panelPosition="top-8"
              button={
                <ColorCircle
                  as="button"
                  $labelColor={color as LabelColorsType}
                  $cursor="pointer"
                  className="!rounded-md"
                />
              }
              panel={<PalettePanel setColor={setColor} isRounded={true} />}
            />
          </S.InputBox>
        </S.InputWrapper>
        <S.MemberWrapper>
          <S.InputWrapper>
            <S.InputLabel>그룹 멤버 추가</S.InputLabel>
            <InputDefault
              disabled={selectedMembers.length > 10}
              value={searchMember}
              onChange={handleSearchMemberChange}
              placeholder={'사용자 이메일 검색'}
            />
          </S.InputWrapper>
        </S.MemberWrapper>
      </S.InputContainer>
      {searchMember.length >= 2 && searchedMemberList.length === 0 && (
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
      {searchedMemberList.length !== 0 && (
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

export default GroupCreatePanel;
