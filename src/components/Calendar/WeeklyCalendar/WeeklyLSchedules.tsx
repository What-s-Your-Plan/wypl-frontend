import { LongSchedule } from './WeeklyCalendar';
import * as S from './WeeklyCalendar.styled';

import useMemberStore from '@/stores/MemberStore';
import { LabelColorType } from '@/styles/Theme';

type LSchedulesProps = {
  lSchedules: Array<LongSchedule>;
  row: number;
  handleScheduleClick: (id: number) => void;
};

function WeeklyLSchedules({
  lSchedules,
  row,
  handleScheduleClick,
}: LSchedulesProps) {
  const gridRow = Math.max(2, row);
  const { mainColor } = useMemberStore();

  const renderSchedules = () => {
    return lSchedules.map((schedule, index) => {
      const bgColor =
        schedule.schedule.label?.color ||
        schedule.schedule.group?.color ||
        mainColor;

      return (
        <S.LScheduleButton
          key={index}
          $bgColor={bgColor as LabelColorType}
          $startDay={schedule.startDay}
          $row={schedule.row}
          $period={schedule.period}
          onClick={() => {
            handleScheduleClick(schedule.schedule.schedule_id);
          }}
        >
          {schedule.schedule.title}
        </S.LScheduleButton>
      );
    });
  };

  return <S.LScheduleGrid $row={gridRow}>{renderSchedules()}</S.LScheduleGrid>;
}

export default WeeklyLSchedules;
