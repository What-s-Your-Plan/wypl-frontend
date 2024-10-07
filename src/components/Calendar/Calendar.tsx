import { useState } from 'react';

import CalendarIndex from '@/components/Calendar/CalendarIndex/CalendarIndex.tsx';
import DailyCalendar from '@/components/Calendar/DailyCalendar/DailyCalendar';
import DatePicker from '@/components/Calendar/DatePicker/DatePicker.tsx';
import MonthlyCalender from '@/components/Calendar/MonthlyCalendar/MonthlyCalendar';
import WeeklyCalendar      from '@/components/Calendar/WeeklyCalendar/WeeklyCalendar';
import Button              from '@/components/Common/Button';
import * as Containers     from '@/components/Common/Container';
import ScheduleDetailModal from '@/components/schedule/ScheduleDetailModal.tsx';
import ScheduleModal from '@/components/schedule/ScheduleModal';
import Todo from '@/components/Todo/Todo.tsx';
import initialSchedule from '@/constants/ScheduleFormInit';
import useDateStore from '@/stores/DateStore';
import useMemberStore from '@/stores/MemberStore';
import { dateToString } from '@/utils/DateUtils';

export interface CalendarProps {
  /** 현재 선택된 달력의 종류 */
  category: 'MEMBER' | 'GROUP';
  /** 그룹 달력이면 현재 선택된 그룹의 식별자 */
  groupId?: number;
}

function Calendar({ category, groupId }: CalendarProps) {
  const { selectedDate } = useDateStore();
  const { memberId } = useMemberStore();
  const [calendarType, setCalendarType] = useState<CalenderType>('MONTH');
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDetailOpen, setDetailOpen] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);

  /**
   * 초기 일정 데이터 생성
   */
  const initialScheduleData = {
    ...initialSchedule,
    category,
    members: [{ member_id: memberId as number }],
    groupId: groupId ?? null,
  };
  const [scheduleInit, setScheduleInit] = useState<ScheduleData & RepeatData>(
    initialScheduleData,
  );

  /**
   * 일정 생성 모달의 상태를 열거나 닫는다.
   *
   * @param isOpen 모달이 열려 있어야 하면 true, 닫혀 있어야 하면 false
   */
  const toggleCreateModal = (isOpen: boolean) => setIsCreateOpen(isOpen);

  /**
   * 일정 상세 정보 모달의 상태를 열거나 닫는다.
   *
   * @param isOpen 모달이 열려 있어야 하면 true, 닫혀 있어야 하면 false
   */
  const toggleDetailModal = (isOpen: boolean) => setDetailOpen(isOpen);

  const handleOpenCreate = () => {
    setScheduleInit({
      ...scheduleInit,
      startDate: dateToString(selectedDate),
      endDate: dateToString(selectedDate),
    });
    toggleCreateModal(true);
  };

  const handleCloseDetail = () => {
    toggleDetailModal(false);
    setNeedUpdate(true);
  };

  const renderCalendar = () => {
    const commonProps = {
      category,
      groupId,
      needUpdate,
      setUpdateFalse: () => setNeedUpdate(false),
      handleScheduleClick: (id: number) => {
        setDetailId(id);
        toggleDetailModal(true);
      },
    };

    switch (calendarType) {
      case 'MONTH':
        return (
          <MonthlyCalender
            {...commonProps}
            switchDayCalendarTypeHandler={() => setCalendarType('DAY')}
          />
        );
      case 'WEEK':
        return <WeeklyCalendar {...commonProps} />;
      default:
        return <DailyCalendar {...commonProps} />;
    }
  };

  return (
    <Containers.Container className="flex" $width="right">
      <Containers.WhiteContainer $width="1200" $height="max">
        <div className="flex p-3 h-full gap-4">
          <div className="grow min-w-[640px]">{renderCalendar()}</div>
          <div className="flex flex-col min-w-[240px]">
            <Button
              className="py-2 mb-5"
              $size="lg"
              $border={'black50'}
              onClick={handleOpenCreate}
            >
              <span>일정 등록</span>
            </Button>
            <div className="p-3 mb-4 shadow-md rounded-xl bg-default-white h-[30vh] min-h-[300px]">
              <DatePicker />
            </div>
            <Todo />
          </div>
        </div>
      </Containers.WhiteContainer>
      <CalendarIndex
        calendarType={calendarType}
        setCalendarType={setCalendarType}
      />
      <ScheduleModal
        isOpen={isCreateOpen}
        init={scheduleInit}
        handleClose={() => toggleCreateModal(false)}
        handleConfirm={() => setNeedUpdate(true)}
      />
      <ScheduleDetailModal
        isOpen={isDetailOpen}
        scheduleId={detailId as number}
        handleClose={handleCloseDetail}
        setUpdateTrue={() => setNeedUpdate(true)}
      />
    </Containers.Container>
  );
}

export default Calendar;
