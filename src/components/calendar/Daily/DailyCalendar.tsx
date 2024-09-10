import { useState, useEffect, useCallback, Fragment } from 'react';

import * as S from './DailyCalendar.styled';

import { getCalendars } from '@/api/calendar/v1/calendars/getCalendars.ts';
import { getGroupCalendars } from '@/api/calendar/v1/calendars/getGroupCalendars.ts';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import NoContentAnimation from '@/components/animation/NoContent';
import useDateStore from '@/stores/DateStore';
import useMemberStore from '@/stores/MemberStore';
import { dateToString, getTime } from '@/utils/DateUtils';
import { labelFilter } from '@/utils/FilterUtils';

type DailyProps = {
  category: 'MEMBER' | 'GROUP';
  groupId?: number;
  needUpdate: boolean;
  setUpdateFalse: () => void;
  handleSkedClick: (id: number) => void;
};

function DailyCalendar({
  category,
  groupId,
  needUpdate,
  setUpdateFalse,
  handleSkedClick,
}: DailyProps) {
  const { selectedDate, selectedLabels } = useDateStore();
  const [originSked, setOriginSked] = useState<Array<CalendarSchedule>>([]);
  const [schedules, setSchedules] = useState<Array<CalendarSchedule>>([]);
  const { mainColor } = useMemberStore();

  const updateInfo = useCallback(async () => {
    if (category === 'MEMBER') {
      const data = await getCalendars('DAY', dateToString(selectedDate));
      if (data.body) {
        setOriginSked(data.body.schedules);
      }
    } else if (category === 'GROUP' && groupId) {
      const data = await getGroupCalendars(
        'DAY',
        groupId,
        dateToString(selectedDate),
      );
      if (data.body) {
        setOriginSked(data.body.schedules);
      }
    }
  }, [selectedDate, groupId]);

  useEffect(() => {
    updateInfo();
  }, [groupId]);

  const filteredSked = useCallback(() => {
    setSchedules(labelFilter(originSked, selectedLabels));
  }, [originSked, selectedLabels]);

  useEffect(() => {
    updateInfo();
    setUpdateFalse();
  }, [selectedDate, needUpdate]);

  useEffect(() => {
    filteredSked();
  }, [filteredSked]);

  const renderSchedule = () => {
    return schedules.map((schedule, idx) => {
      return (
        <Fragment key={idx}>
          {idx !== 0 && (
            <>
              <div className="w-8 h-10 flex justify-center" key={`line${idx}`}>
                <S.VerticalLine />
              </div>
            </>
          )}
          <S.ScheduleContainer
            key={schedule.schedule_id}
            onClick={() => {
              handleSkedClick(schedule.schedule_id);
            }}
          >
            <S.LabelDiv
              $bgColor={
                (schedule.label?.color ||
                  schedule.group?.color ||
                  mainColor) as LabelColorsType
              }
            />
            <S.ScheduleContents>
              <span className="text-sm text-zinc-500">
                {getTime(schedule.start_date)} ~ {getTime(schedule.end_date)}
              </span>
              <span className="text-xl font-bold">{schedule.title}</span>
              <p className="flex">{schedule.description}</p>
            </S.ScheduleContents>
          </S.ScheduleContainer>
        </Fragment>
      );
    });
  };

  return (
    <>
      {schedules.length === 0 ? (
        <NoContentAnimation />
      ) : (
        <div className="overflow-y-auto h-full scrollBar flex">
          <div className="w-full h-fit p-4 m-auto">{renderSchedule()}</div>
        </div>
      )}
    </>
  );
}

export default DailyCalendar;
