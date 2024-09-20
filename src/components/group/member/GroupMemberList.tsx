import { useEffect, useState } from 'react';

import styled from 'styled-components';

import * as S from './GroupMemberList.styled';

import { GroupMemberData } from '@/@types/Group';
import {
  deleteGroupMemberForceOut,
  DeleteGroupMemberForceOutPathVariable,
  DeleteGroupMemberForceOutRequest,
} from '@/api/group/deleteGroupMemberForceOut';
import { deleteGroupWithdraw } from '@/api/group/deleteGroupWithdraw';
import {
  getGroupMember,
  GetGroupMembersResponse,
} from '@/api/group/getGroupMember';
import X                   from '@/assets/icons/x.svg';
import { LabelColorsType } from '@/styles/colorThemes.ts';
import Tooltip             from '@/components/tooltip/Tooltip';
import useMemberStore from '@/stores/MemberStore';
import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';

type GroupMemberProps = {
  groupId: number;
  color: LabelColorsType;
  isOwner: boolean;
  groupDeleteEvent: (groupId: number) => void;
};

function GroupMemberList({
  groupId,
  color,
  isOwner,
  groupDeleteEvent,
}: GroupMemberProps) {
  const { memberId } = useMemberStore();

  const [groupMembers, setGroupMembers] = useState<GetGroupMembersResponse>({
    color,
    member_count: 0,
    members: [],
  });

  const fetchGroupMember = async () => {
    const data = await getGroupMember({ groupId });
    setGroupMembers(data.body);
  };

  useEffect(() => {
    fetchGroupMember();
  }, []);

  const requestDeleteMember = async (deleteMemberId: number) => {
    const request: DeleteGroupMemberForceOutRequest = {
      member_id: deleteMemberId,
    };
    const pathVariable: DeleteGroupMemberForceOutPathVariable = {
      groupId,
    };
    const data = await deleteGroupMemberForceOut(pathVariable, request);
    setGroupMembers((prev) => {
      const updatedGroupMembers = prev.members.filter(
        (member) => member.id !== data.body.member_id,
      );
      return {
        ...prev,
        member_count: updatedGroupMembers.length,
        members: updatedGroupMembers,
      };
    });
  };

  const requestWithdraw = async () => {
    const pathVariable: DeleteGroupMemberForceOutPathVariable = {
      groupId,
    };
    await deleteGroupWithdraw(pathVariable).then(() => {
      groupDeleteEvent(groupId);
    });
  };

  return (
    <S.Container>
      {groupMembers.members.map((member: GroupMemberData) => {
        return (
          <S.Wrapper key={groupId + ' ' + member.id}>
            <S.Box>
              <S.ProfileImg
                src={getMemberProfileImageOrDefault(member.profile_image)}
                alt={member.nickname}
              />
              <S.Text>{member.nickname}</S.Text>
            </S.Box>
            <S.Box>
              {isOwner && member.id !== memberId && (
                <Tooltip
                  children={
                    <ForceOutImg
                      src={X}
                      onClick={() => requestDeleteMember(member.id)}
                    />
                  }
                  text={'회원 추방'}
                />
              )}
              {!isOwner && member.id === memberId && (
                <Tooltip
                  children={
                    <ForceOutImg src={X} onClick={() => requestWithdraw()} />
                  }
                  text={'그룹 탈퇴'}
                />
              )}
              <S.Check
                $isAccepted={member.is_accepted}
                $color={color}
              ></S.Check>
            </S.Box>
          </S.Wrapper>
        );
      })}
    </S.Container>
  );
}

const ForceOutImg = styled.img`
  filter: brightness(0) saturate(100%) invert(58%) sepia(92%) saturate(4683%)
    hue-rotate(335deg) brightness(109%) contrast(90%);
  cursor: pointer;
`;

export default GroupMemberList;
