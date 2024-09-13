import { useEffect, useState } from 'react';

import ScheduleDetailPanel from './ScheduleDetailPanel.tsx';
import Modal from '../common/Modal';

import getScheduleDetail from '@/api/schedule/getScheduleDetail';
import { putSchedule } from '@/api/schedule/putSchedule';
import initialSchedule from '@/constants/ScheduleFormInit';
import useForm from '@/hooks/useForm';
import { padding0, stringToDate } from '@/utils/DateUtils';
import { isAllDay } from '@/utils/DateUtils';

type DetailModalProps = {
  handleClose: (() => void) | (() => Promise<void>);
  isOpen: boolean;
  scheduleId: number;
  setUpdateTrue: () => void;
};

function createInit(schedule: ScheduleDetailData) {
  const startDate = stringToDate(schedule.start_date);
  const endDate = stringToDate(schedule.end_date);

  const newInit: any = {
    ...initialSchedule,
    scheduleId: schedule.schedule_id,
    title: schedule.title,
    category: schedule.category as 'MEMBER' | 'GROUP',
    description: schedule.description || '',
    startDate: `${startDate.getFullYear()}-${padding0(startDate.getMonth() + 1)}-${padding0(startDate.getDate())}`,
    endDate: `${endDate.getFullYear()}-${padding0(endDate.getMonth() + 1)}-${padding0(endDate.getDate())}`,
    startHour: startDate.getHours(),
    startMinute: startDate.getMinutes(),
    endHour: endDate.getHours(),
    endMinute: endDate.getMinutes(),
    startAMPM: startDate.getHours() >= 12 ? 'PM' : 'AM',
    endAMPM: endDate.getHours() >= 12 ? 'PM' : 'AM',
    isAllDay: isAllDay(startDate, endDate),
    groupId: schedule.group_id,
    members: schedule.members.map(({ member_id }) => ({ member_id })),
    repetition: !!schedule.repetition,
  };

  if (schedule.repetition) {
    Object.assign(newInit, {
      week: schedule.repetition.week,
      repetitionCycle: schedule.repetition.repetition_cycle,
      startDate: schedule.repetition.repetition_start_date,
      endDate: schedule.repetition.repetition_end_date,
      dayOfWeek: schedule.repetition.day_of_week,
    });
  }

  if (schedule.label) {
    newInit.label = {
      category: 'MEMBER',
      id: schedule.label.label_id,
      title: schedule.label.title,
      color: schedule.label.color,
    } as Label;
  }

  return newInit;
}

function ScheduleDetailModal({
  isOpen,
  scheduleId,
  handleClose,
  setUpdateTrue,
}: DetailModalProps) {
  const handlePut = async (state: ScheduleData & RepeatData) => {
    await putSchedule(state);
  };
  const [isModify, setIsModify] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<ScheduleDetailData | null>(null);
  const { form, setForm, handleChange, handleSubmit } = useForm<
    ScheduleData & RepeatData,
    void
  >(initialSchedule, handlePut);

  const handelConfirm = async () => {
    await handleSubmit();
    setUpdateTrue();
  };

  const setModifyTrue = () => {
    setIsModify(true);
  };

  const getSchedule = async () => {
    const { body } = await getScheduleDetail({ scheduleId });
    setSchedule(body);
  };

  useEffect(() => {
    if (scheduleId) {
      getSchedule();
    }
  }, [scheduleId]);

  useEffect(() => {
    if (schedule) {
      setForm(createInit(schedule));
    }
  }, [schedule]);

  useEffect(() => {}, [form]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => {
        setIsModify(false);
        handleClose();
      }}
      confirm={
        isModify ? { content: '저장', handleConfirm: handelConfirm } : undefined
      }
      title={<></>}
      contents={
        <ScheduleDetailPanel
          isModify={isModify}
          setModifyTrue={setModifyTrue}
          states={form}
          handleChange={handleChange}
          setStates={setForm}
          schedule={schedule}
          handleClose={handleClose}
        />
      }
    />
  );
}

export default ScheduleDetailModal;
