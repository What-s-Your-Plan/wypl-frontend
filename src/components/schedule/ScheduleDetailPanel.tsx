import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import ScheduleModify from './ScheduleModify.tsx';
import * as Items from './ScheduleDetailItems.tsx';
import Modal from '@/components/Common/Modal/Modal.tsx';

import deleteSchedule from '@/api/schedule/deleteSchedule';
import EditIcon from '@/assets/icons/editPaper.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import useMemberStore from '@/stores/MemberStore';

type DetailProps = {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleClose: (() => void) | (() => Promise<void>);
  isModify: boolean;
  schedule: ScheduleDetailData | null;
  setModifyTrue: () => void;
  setStates: Dispatch<SetStateAction<ScheduleData & RepeatData>>;
  states: ScheduleData & RepeatData;
};

function ScheduleDetailPanel({
  isModify,
  setModifyTrue,
  schedule,
  states,
  handleChange,
  setStates,
  handleClose,
}: DetailProps) {
  const navigator = useNavigate();
  const [canModify, setCanModify] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [modificationType, setModificationType] = useState<string>('NOW');
  const { memberId } = useMemberStore();

  const clickDeleteBtn = async () => {
    if (schedule?.repetition !== null) {
      setDeleteOpen(true);
    } else {
      deleteAllSchedule();
    }
  };

  const deleteAllSchedule = async () => {
    if (schedule) {
      await deleteSchedule({
        scheduleId: schedule?.schedule_id,
        modificationType,
      });
      setDeleteOpen(false);
      handleClose();
    }
  };

  useEffect(() => {
    //스케줄에 포함된 멤버인지 확인
    schedule?.members.map((member: MemberData) => {
      if (member.member_id === memberId) {
        setCanModify(true);
        return;
      }
    });
  }, [schedule]);

  return (
    <div className="w-[580px] flex flex-col justify-center">
      {schedule &&
        (isModify ? (
          <ScheduleModify
            states={states}
            handleChange={handleChange}
            setStates={setStates}
          />
        ) : (
          <>
            {canModify && (
              <div className="flex flex-row-reverse gap-2">
                <button onClick={clickDeleteBtn}>
                  <img src={TrashIcon} alt="trash" />
                </button>
                <button
                  onClick={() => {
                    setModifyTrue();
                  }}
                >
                  <img src={EditIcon} alt="edit" />
                </button>
              </div>
            )}
            {
              <Modal
                isOpen={deleteOpen}
                title=""
                contents={
                  <div>
                    <Items.Title title="반복 일정 삭제"></Items.Title>
                    <div>
                      <div className="!p-1">
                        <input
                          type="radio"
                          name="modificationType"
                          id="NOW"
                          onClick={() => setModificationType('NOW')}
                        ></input>
                        <label htmlFor="NOW">현재 일정</label>
                      </div>
                      <div className="!p-1">
                        <input
                          type="radio"
                          name="modificationType"
                          id="AFTER"
                          onClick={() => setModificationType('AFTER')}
                        ></input>
                        <label htmlFor="AFTER">현재 일정 및 향후 일정</label>
                      </div>
                      <div className="!p-1">
                        <input
                          type="radio"
                          name="modificationType"
                          id="ALL"
                          onClick={() => setModificationType('ALL')}
                        ></input>
                        <label htmlFor="ALL">모든 일정</label>
                      </div>
                    </div>
                  </div>
                }
                confirm={{ content: '삭제', handleConfirm: deleteAllSchedule }}
                handleClose={() => {
                  setDeleteOpen(false);
                }}
              ></Modal>
            }
            <Items.Title title={schedule.title} />
            <Items.Time
              startDate={schedule.start_date}
              endDate={schedule.end_date}
            />
            {schedule.description && (
              <Items.Description content={schedule.description} />
            )}
            {schedule.category === 'MEMBER' ? (
              <Items.Label label={schedule.label} />
            ) : (
              <Items.Member member={schedule.members} />
            )}
            {schedule.repetition && (
              <Items.Repeat repeat={schedule.repetition} />
            )}
            <Items.WriteReview
              handleClick={() => {
                navigator(`/review/write/${schedule.schedule_id}`);
              }}
            />
          </>
        ))}
    </div>
  );
}

export default ScheduleDetailPanel;
