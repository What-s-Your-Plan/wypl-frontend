import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  postSchedule,
  PostScheduleResponse,
} from '@/api/schedule/postSchedule';
import Modal from '@/components/common/Modal';
import SchedulePanel from '@/components/schedule/SchedulePanel';
import useForm from '@/hooks/useForm';

type ScheduleModalProps = {
  isOpen: boolean;
  init: ScheduleData & RepeatData;
  handleClose: (() => void) | (() => Promise<void>);
  handleConfirm: (() => void) | (() => Promise<void>);
};

function ScheduleModal({
  isOpen,
  init,
  handleClose,
  handleConfirm,
}: ScheduleModalProps) {
  const { form, setForm, handleChange, handleSubmit } = useForm<
    ScheduleData & RepeatData,
    PostScheduleResponse
  >(init, postSchedule);

  const { groupId } = useParams();

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        groupId: Number(groupId),
      };
    });
  }, [isOpen]);

  const handleConfirmClick = async () => {
    await handleSubmit();
    handleConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm={{ content: '저장', handleConfirm: handleConfirmClick }}
      title={<></>}
      contents={
        <SchedulePanel
          states={form}
          handleChange={handleChange}
          setStates={setForm}
        />
      }
      handleClose={handleClose}
    />
  );
}

export default ScheduleModal;
