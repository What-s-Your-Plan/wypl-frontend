import { useState } from 'react';

import { GroupInfoData, GroupSummaryData } from '@/@types/Group';
import {
  postGroupRegister,
  GroupResponse as CreateGroup,
}                          from '@/api/group/postGroupRegister';
import { LabelColorsType } from '@/styles/colorThemes.ts';
import Modal               from '@/components/common/Modal';
import * as S from '@/components/group/create/GroupCreateModal.styled';
import GroupCreatePanel from '@/components/group/create/GroupCreatePanel';
import useForm from '@/hooks/useForm';

type GroupCreateModalProps = {
  isOpen: boolean;
  init: GroupInfoData;
  handleClose: (() => void) | (() => Promise<void>);
  handleConfirm: (memberGroup: GroupSummaryData) => void;
};

function GroupCreateModal({
  isOpen,
  init,
  handleClose,
  handleConfirm,
}: GroupCreateModalProps) {
  const { form, setForm, handleChange, handleSubmit } = useForm<
    GroupInfoData,
    CreateGroup
  >(init, postGroupRegister);
  const handleConfirmClick = async () => {
    const response = await handleSubmit();
    if (response === null) {
      return;
    }
    const memberGroup: GroupSummaryData = {
      id: response.id,
      color: response.color,
      name: response.name,
      is_owner: true,
    };
    handleConfirm(memberGroup);
    setForm(init);
  };

  const [color, setColor] = useState<LabelColorsType>('labelRed');
  const CreateGroupHeader = () => {
    return (
      <S.TitleContainer>
        <S.Title>새로운 그룹을 생성해보세요!</S.Title>
        <S.Bar $color={color} />
      </S.TitleContainer>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm={{ content: '저장', handleConfirm: handleConfirmClick }}
      title={CreateGroupHeader()}
      contents={
        <GroupCreatePanel
          color={color}
          setColor={setColor}
          states={form}
          handleChange={handleChange}
          setStates={setForm}
        />
      }
      handleClose={handleClose}
    />
  );
}

export default GroupCreateModal;
