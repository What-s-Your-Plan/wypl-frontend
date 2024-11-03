import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Disclosure } from '@headlessui/react';

import * as S from './GroupDetailList.styled';
import GroupMemberList from '../member/GroupMemberList';
import GroupUpdateModal from '../update/GroupUpdateModal';

import { Group, GroupUpdateInfo } from '@/@types/Group';
import {
  patchPersonalGroupColor,
  PersonalGroupColorUpdatePathVariable,
  PersonalGroupColorUpdateRequest,
} from '@/api/group/patchGroupColor';
import {
  patchGroupInfo,
  GroupInfoUpdatePathVariable,
  GroupInfoUpdateRequest,
} from '@/api/group/patchGroupInfo';
import {
  postGroupInvite,
  GroupInviteRequest,
} from '@/api/group/postGroupInvite';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import Setting from '@/assets/icons/settings.svg';
import ColorCircle from '@/components/Common/ColorCircle/ColorCircle.tsx';
import { Divider } from '@/components/Common/Divider';
import PopOver from '@/components/Common/PopOver';
import PalettePanel from '@/components/PalettePanel/PalettePanel';
import Tooltip from '@/components/Tooltip/Tooltip';
import useToastStore from '@/stores/ToastStore';
import { LabelColorType } from '@/styles/Theme';

type GroupInfoProps = {
  group: Group;
  groupDeleteEvent: (groupId: number) => void;
  groupUpdateEvent: (updateGroup: GroupUpdateInfo) => void;
};

function GroupDetailList({
  group,
  groupDeleteEvent,
  groupUpdateEvent,
}: GroupInfoProps) {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { addToast } = useToastStore();
  const [color, setColor] = useState<LabelColorType>(
    group.color as LabelColorType,
  );

  const handleChangeColor = async (color: LabelColorType) => {
    const pathVariable: PersonalGroupColorUpdatePathVariable = {
      groupId: group.id,
    };
    const request: PersonalGroupColorUpdateRequest = {
      color,
    };
    const data = await patchPersonalGroupColor(pathVariable, request);
    setColor(data.body.color as LabelColorType);
  };

  const gotoGroupPage = (open: boolean) => {
    if (open || groupId === group.id.toString()) {
      return;
    }
    navigate(`/group/${group.id}`);
  };

  const [groupUpdateInit] = useState<GroupUpdateInfo>({
    id: group.id,
    name: group.name,
    color: group.color,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdateGroup = async (
    newName: string,
    newColor: LabelColorType,
    memberIds: Array<number>,
  ) => {
    if (
      newName !== group.name ||
      newColor !== (group.color as LabelColorType)
    ) {
      const pathVariable: GroupInfoUpdatePathVariable = {
        groupId: group.id,
      };
      const request: GroupInfoUpdateRequest = {
        name: newName,
        color: newColor,
      };
      const data = await patchGroupInfo(pathVariable, request);
      groupUpdateEvent(data.body);

      addToast({
        duration: 300,
        message: `그룹 수정에 성공하였습니다.`,
        type: 'NOTIFICATION',
      });
    }

    if (memberIds.length > 0) {
      const request: GroupInviteRequest = {
        member_id_list: memberIds,
      };
      await postGroupInvite({ groupId: group.id }, request);
      addToast({
        duration: 300,
        message: `그룹에 ${memberIds.length}명을 초대했습니다.`,
        type: 'NOTIFICATION',
      });
    }
  };

  const groupDetail = (isOpen: boolean) => {
    return (
      <S.GroupContainer>
        <S.GroupWrapper onClick={() => gotoGroupPage(isOpen)}>
          <S.Box className="pl-6">{group.name}</S.Box>
          <S.Box className="gap-4">
            {group.is_owner && (
              <Tooltip
                children={
                  <img
                    src={Setting}
                    alt="설정"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                    className="w-5"
                  />
                }
                text={'그룹 설정'}
              />
            )}
            <img
              src={ChevronDown}
              alt="펼치기"
              className={isOpen ? 'rotate-180 transform w-6' : 'w-6'}
            />
          </S.Box>
        </S.GroupWrapper>
      </S.GroupContainer>
    );
  };

  return (
    <S.Container>
      <GroupUpdateModal
        isOpen={isModalOpen}
        init={groupUpdateInit}
        handleClose={closeModal}
        groupUpdateEvent={handleUpdateGroup}
        groupDeleteEvent={groupDeleteEvent}
      />
      <S.PopOverWrapper>
        <PopOver
          panelPosition="bottom-8"
          button={
            <ColorCircle
              styles={{
                $color: color,
                $figure: 'circle',
                $hover: 'none',
              }}
            />
          }
          panel={<PalettePanel setColor={handleChangeColor} isRounded={true} />}
        />
      </S.PopOverWrapper>
      <div>
        <Disclosure>
          {({ open }) => (
            <S.Wrapper>
              <Disclosure.Button className="pt-2 pb-4 w-full border-none">
                {groupDetail(open)}
              </Disclosure.Button>
              <Divider />
              <Disclosure.Panel>
                <GroupMemberList
                  groupId={group.id}
                  color={color}
                  isOwner={group.is_owner}
                  groupDeleteEvent={groupDeleteEvent}
                />
              </Disclosure.Panel>
            </S.Wrapper>
          )}
        </Disclosure>
      </div>
    </S.Container>
  );
}

export default GroupDetailList;
