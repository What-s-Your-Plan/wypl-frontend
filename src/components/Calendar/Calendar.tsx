import { useState } from 'react';

import CalendarAddIcon from '@/assets/icons/calendarAdd.svg';
import CalendarIndex from '@/components/Calendar/CalendarIndex/CalendarIndex.tsx';
import DailyCalendar from '@/components/Calendar/Daily/DailyCalendar';
import DatePicker from '@/components/Calendar/DatePicker/DatePicker.tsx';
import MonthlyCalender from '@/components/Calendar/Monthly/MonthlyCalendar';
import Todo from '@/components/Calendar/Todo';
import WeeklyCalendar from '@/components/Calendar/Weekly/WeeklyCalendar';
import Button from '@/components/common/Button';
import * as Containers from '@/components/common/Container';
import ScheduleDetailModal from '@/components/schedule/ScheduleDetailModal.tsx';
import ScheduleModal from '@/components/schedule/ScheduleModal';
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
            goDay={() => setCalendarType('DAY')}
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
      <Containers.WhiteContainer $width="1300" $height="max">
        <div className="flex p-3 h-full gap-4">
          <div className="grow">{renderCalendar()}</div>
          <div className="flex flex-col w-300">
            <Containers.WhiteContainer $width="1300" $height="one">
              <DatePicker />
            </Containers.WhiteContainer>
            <Todo />
            <Button className="py-2" $size="lg" onClick={handleOpenCreate}>
              <img src={CalendarAddIcon} alt="calendar-add" />
              <span>일정 등록</span>
            </Button>
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
