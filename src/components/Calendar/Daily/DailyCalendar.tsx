import { useState, useEffect, useCallback, Fragment } from 'react';

import * as S from './DailyCalendar.styled';

import {
  CalendarParams,
  CalendarPathVariable,
  CalendarsResponse,
  getCalendars,
} from '@/api/calendar/getCalendars.ts';
import {
  getGroupCalendars,
  GroupCalendarPathVariable,
} from '@/api/calendar/getGroupCalendars.ts';
import { LabelColorsType } from '@/assets/styles/colorThemes.ts';
import NoContentAnimation  from '@/components/Animation/NoContent';
import useDateStore        from '@/stores/DateStore';
import useMemberStore from '@/stores/MemberStore';
import { dateToString, getTime } from '@/utils/DateUtils';
import { labelFilter } from '@/utils/FilterUtils';

type DailyProps = {
  category: 'MEMBER' | 'GROUP';
  groupId?: number;
  needUpdate: boolean;
  setUpdateFalse: () => void;
  handleScheduleClick: (id: number) => void;
};

function DailyCalendar({
  category,
  groupId,
  needUpdate,
  setUpdateFalse,
  handleScheduleClick,
}: DailyProps) {
  const { selectedDate, selectedLabels } = useDateStore();
  const [originSked, setOriginSked] = useState<Array<CalendarScheduleData>>([]);
  const [schedules, setSchedules] = useState<Array<CalendarScheduleData>>([]);
  const { mainColor } = useMemberStore();

  /**
   * 일별 달력을 조회한다.
   */
  const updateInfo = useCallback(async () => {
    const calendarPathVariable: CalendarPathVariable = {
      type: 'DAY',
    };
    const calendarParams: CalendarParams = {
      date: dateToString(selectedDate),
    };

    if (category === 'MEMBER') {
      const data = await getCalendars(calendarPathVariable, calendarParams);
      if (data.body) {
        setOriginSked(data.body.schedules);
      }
    }

    if (category === 'GROUP' && groupId) {
      const groupCalendarPathVariable: GroupCalendarPathVariable = {
        type: 'DAY',
        groupId,
      };
      const data: BaseResponse<CalendarsResponse> = await getGroupCalendars(
        groupCalendarPathVariable,
        calendarParams,
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
              handleScheduleClick(schedule.schedule_id);
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
