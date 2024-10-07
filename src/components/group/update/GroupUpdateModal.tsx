import { useState } from 'react';

import * as S from './GroupUpdateModal.styled';
import GroupUpdatePanel from './GroupUpdatePanel';

import { GroupUpdateInfo } from '@/@types/Group';
import { deleteGroup, DeleteGroupParams } from '@/api/group/deleteGroup';
import { LabelColorsType }                from '@/styles/colorThemes.ts';
import Button                             from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import useToastStore from '@/stores/ToastStore';

type GroupUpdateModalProps = {
  isOpen: boolean;
  init: GroupUpdateInfo;
  groupUpdateEvent: (
    newName: string,
    newColor: LabelColorsType,
    memberIds: Array<number>,
  ) => void;
  groupDeleteEvent: (groupId: number) => void;
  handleClose: (() => void) | (() => Promise<void>);
};

function GroupUpdateModal({
  isOpen,
  init,
  handleClose,
  groupUpdateEvent,
  groupDeleteEvent,
}: GroupUpdateModalProps) {
  const { addToast } = useToastStore();
  const [groupUpdateInfo, setGroupUpdateInfo] = useState<GroupUpdateInfo>(init);
  const handleGroupUpdateInfo = (newName: string, newColor: LabelColorsType) => {
    setGroupUpdateInfo((prev) => {
      return {
        ...prev,
        name: newName,
        color: newColor,
      };
    });
  };

  const [inviteMemberIds, setInviteMemberIds] = useState<Array<number>>([]);
  const handleInviteMemberIds = (newMemberIds: Array<number>) => {
    setInviteMemberIds(newMemberIds);
  };

  const handleConfirmClick = async () => {
    groupUpdateEvent(
      groupUpdateInfo.name,
      groupUpdateInfo.color as LabelColorsType,
      inviteMemberIds,
    );
  };

  const handleDeleteGroup = async () => {
    confirm('그룹 삭제할 시 복구할 수 없습니다.');
    const deleteGroupParams: DeleteGroupParams = {
      groupId: groupUpdateInfo.id,
    };
    await deleteGroup(deleteGroupParams);
    groupDeleteEvent(groupUpdateInfo.id);
    handleClose();
    addToast({
      duration: 300,
      message: '그룹을 삭제하였습니다.',
      type: 'NOTIFICATION',
    });
  };

  const CreateGroupHeader = () => {
    return (
      <S.Container>
        <S.Wrapper>
          <S.Title>그룹을 수정해보세요!</S.Title>
          <Button
            $size={'none'}
            $bgColor={'labelRed'}
            $textColor={'white'}
            $width={'100px'}
            className={'mb-4'}
            onClick={handleDeleteGroup}
          >
            그룹 삭제
          </Button>
        </S.Wrapper>
        <S.Bar $color={groupUpdateInfo.color as LabelColorsType} />
      </S.Container>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm={{
        content: '저장',
        handleConfirm: handleConfirmClick,
      }}
      title={CreateGroupHeader()}
      contents={
        <GroupUpdatePanel
          groupUpdateInfo={groupUpdateInfo}
          groupUpdateInfoEvent={handleGroupUpdateInfo}
          inviteMemberIdsEvent={handleInviteMemberIds}
        />
      }
      handleClose={handleClose}
    />
  );
}

export default GroupUpdateModal;
