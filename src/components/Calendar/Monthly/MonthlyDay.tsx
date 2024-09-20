import { DateSchedule } from './MonthlyCalendar';
import * as S from './MonthlyCalendar.styled';

import { LabelColorsType } from '@/styles/colorThemes.ts';
import useDateStore        from '@/stores/DateStore';
import useMemberStore from '@/stores/MemberStore';
import { isSameDay, stringToDate, getDateDiff } from '@/utils/DateUtils';

type MDayProps = {
  date: Date;
  firstDay: Date;
  schedules: DateSchedule;
  isCurrentMonth: boolean;
  handleScheduleClick: (id: number) => void;
  goDay: () => void;
};

function MonthlyDay({
  date,
  firstDay,
  schedules,
  isCurrentMonth,
  handleScheduleClick,
  goDay,
}: MDayProps) {
  const { selectedDate, setSelectedDate } = useDateStore();
  const { mainColor } = useMemberStore();

  const renderSchedule = () => {
    return schedules.map((schedule, idx) => {
      if (idx < 2) {
        if (schedule.length > 0) {
          const start = stringToDate(schedule[0].start_date);
          const end = stringToDate(schedule[0].end_date);

          if (
            isSameDay(firstDay, date) ||
            isSameDay(start, date) ||
            date.getDay() === 0
          ) {
            const width = Math.min(
              7 - date.getDay(),
              getDateDiff(date, end) + 1,
            );
            const color =
              schedule[0].label?.color || schedule[0].group?.color || mainColor;

            return (
              <S.ScheduleButton
                key={idx}
                $color={color as LabelColorsType}
                $top={idx}
                $width={width}
                onClick={() => {
                  handleScheduleClick(schedule[0].schedule_id);
                }}
              >
                <span className="truncate">{schedule[0].title}</span>
              </S.ScheduleButton>
            );
          }
        } else {
          return (
            <S.NoSchedule key={idx} $top={idx} aria-hidden="true">
              no schedule
            </S.NoSchedule>
          );
        }
      } else if (idx === 2) {
        if (schedule.length === 0) {
          return (
            <S.NoSchedule key={idx} $top={idx} aria-hidden="true">
              no schedule
            </S.NoSchedule>
          );
        } else if (schedule.length > 0) {
          return (
            <button
              key={idx}
              className="flex items-center h-4 absolute top-8 pl-1 hover:bg-default-coolgray w-full transition-all"
              onClick={() => {
                goDay();
                setSelectedDate(date);
              }}
            >
              <span className="truncate">+ {schedule.length}</span>
            </button>
          );
        }
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
