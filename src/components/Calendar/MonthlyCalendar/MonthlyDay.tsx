import { DateSchedule } from './MonthlyCalendar';
import * as S from './MonthlyCalendar.styled';

import useDateStore from '@/stores/DateStore';
import useMemberStore from '@/stores/MemberStore';
import { LabelColorType } from '@/styles/Theme';
import { isSameDay, stringToDate, getDateDiff } from '@/utils/DateUtils';

interface MDayProps {
  /** */
  date: Date;
  /** */
  firstDay: Date;
  /** */
  schedules: DateSchedule;
  /** 해당 일자가 현재 월인지 */
  isCurrentMonth: boolean;
  /** 일정 클릭 시 수행되는 함수 */
  handleScheduleClick: (id: number) => void;
  /** 일별 달력으로 변경 */
  switchDayCalendarTypeHandler: () => void;
}

function MonthlyDay({
  date,
  firstDay,
  schedules,
  isCurrentMonth,
  handleScheduleClick,
  switchDayCalendarTypeHandler,
}: MDayProps) {
  const { selectedDate, setSelectedDate } = useDateStore();
  const { mainColor } = useMemberStore();

  const renderSchedule = () => {
    return schedules.map((schedule, scheduleIdx) => {
      if (scheduleIdx < 2 && schedule.length > 0) {
        const start = stringToDate(schedule[0].start_date);
        const end = stringToDate(schedule[0].end_date);
        if (
          isSameDay(firstDay, date) ||
          isSameDay(start, date) ||
          date.getDay() === 0
        ) {
          const scheduleWidth = Math.min(
            7 - date.getDay(),
            getDateDiff(date, end) + 1,
          );
          const scheduleLabelColor =
            schedule[0].label?.color || schedule[0].group?.color || mainColor;
          return (
            <S.ScheduleButton
              key={scheduleIdx}
              $color={scheduleLabelColor as LabelColorType}
              $top={scheduleIdx}
              $width={scheduleWidth}
              onClick={() => {
                handleScheduleClick(schedule[0].schedule_id);
              }}
            >
              <span className="truncate">{schedule[0].title}</span>
            </S.ScheduleButton>
          );
        }
      }
      /* 남은 일정의 개수를 알려주기 */
      if (scheduleIdx === 2 && schedule.length > 0) {
        return (
          <button
            key={scheduleIdx}
            className="flex items-center h-4 absolute top-8 pl-1 hover:bg-default-coolgray w-full transition-all"
            onClick={() => {
              switchDayCalendarTypeHandler();
              setSelectedDate(date);
            }}
          >
            <span className="truncate">+ {schedule.length}</span>
          </button>
        );
      }
    });
  };

  return (
    <S.DateContainer>
      <S.DateSpan
        $isCurrentMonth={isCurrentMonth}
        $day={date.getDay()}
        $isSelected={isSameDay(date, selectedDate)}
      >
        {date.getDate()}
      </S.DateSpan>
      <div className="relative">{renderSchedule()}</div>
    </S.DateContainer>
  );
}

export default MonthlyDay;
