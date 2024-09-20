import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Disclosure } from '@headlessui/react';

import * as S from './GroupDetailList.styled';
import ColorCircle from '../../common/ColorCircle';
import { Divider } from '../../common/Divider';
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
import Setting             from '@/assets/icons/settings.svg';
import { LabelColorsType } from '@/styles/colorThemes.ts';
import PalettePanel        from '@/components/PalettePanel/PalettePanel';
import PopOver             from '@/components/common/PopOver';
import Tooltip from '@/components/tooltip/Tooltip';
import useToastStore from '@/stores/ToastStore';

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
  const [color, setColor] = useState<LabelColorsType>(
    group.color as LabelColorsType,
  );

  const handleChangeColor = async (color: LabelColorsType) => {
    const pathVariable: PersonalGroupColorUpdatePathVariable = {
      groupId: group.id,
    };
    const request: PersonalGroupColorUpdateRequest = {
      color,
    };
    const data = await patchPersonalGroupColor(pathVariable, request);
    setColor(data.body.color as LabelColorsType);
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
    newColor: LabelColorsType,
    memberIds: Array<number>,
  ) => {
    if (newName !== group.name || newColor !== (group.color as LabelColorsType)) {
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
              as="button"
              $labelColor={color as LabelColorsType}
              $cursor="pointer"
              className="!rounded-md"
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
