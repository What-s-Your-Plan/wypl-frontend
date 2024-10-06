import { useState, useEffect, useCallback, Fragment } from 'react';

import * as S from './DailyCalendar.styled';

import { CalendarParams, getCalendars } from '@/api/calendar/getCalendars.ts';
import {
  getGroupCalendars,
  GroupCalendarPathVariable,
} from '@/api/calendar/getGroupCalendars.ts';
import NoContentAnimation from '@/components/Animation/NoContent';
import useDateStore from '@/stores/DateStore';
import useMemberStore from '@/stores/MemberStore';
import { LabelColorsType } from '@/styles/colorThemes.ts';
import { dateToString, getTime } from '@/utils/DateUtils';
import { labelFilter } from '@/utils/FilterUtils';

export interface DailyCalendarProps {
  /** 선택한 달력의 카테고리 (개인 또는 그룹) */
  category: 'MEMBER' | 'GROUP';
  /** 그룹 뷰일 때 그룹 ID */
  groupId?: number;
  /** 일정 갱신이 필요한지 여부 */
  needUpdate: boolean;
  /** 일정 갱신 상태를 리셋하는 함수 */
  setUpdateFalse: () => void;
  /** 일정 클릭 시 실행되는 함수 */
  handleScheduleClick: (id: number) => void;
}

function DailyCalendar({
  category,
  groupId,
  needUpdate,
  setUpdateFalse,
  handleScheduleClick,
}: DailyCalendarProps) {
  const { selectedDate, selectedLabels } = useDateStore();
  const [originSchedule, setOriginSchedule] = useState<
    Array<CalendarScheduleData>
  >([]);
  const [schedules, setSchedules] = useState<Array<CalendarScheduleData>>([]);
  const { mainColor } = useMemberStore();

  /**
   * 일별 달력 데이터를 서버에서 가져오는 함수
   */
  const updateInfo = useCallback(async () => {
    const calendarParams: CalendarParams = { date: dateToString(selectedDate) };

    if (category === 'MEMBER') {
      const { body } = await getCalendars({ type: 'DAY' }, calendarParams);
      if (body) setOriginSchedule(body.schedules);
    }

    if (category === 'GROUP' && groupId) {
      const groupCalendarPathVariable: GroupCalendarPathVariable = {
        type: 'DAY',
        groupId,
      };
      const groupData = await getGroupCalendars(
        groupCalendarPathVariable,
        calendarParams,
      );
      if (groupData.body) setOriginSchedule(groupData.body.schedules);
    }
  }, [selectedDate, groupId, category]);

  /**
   * 그룹 ID가 변경되면 데이터를 새로 가져옴
   */
  useEffect(() => {
    if (groupId || category === 'MEMBER') {
      updateInfo();
    }
  }, [groupId, category, updateInfo]);

  /**
   * 필터된 일정 데이터를 갱신
   */
  useEffect(() => {
    setSchedules(labelFilter(originSchedule, selectedLabels));
  }, [originSchedule, selectedLabels]);

  /**
   * 필요할 때 일정 데이터를 갱신
   */
  useEffect(() => {
    if (needUpdate) {
      updateInfo();
      setUpdateFalse();
    }
  }, [needUpdate, updateInfo, setUpdateFalse]);

  const renderSchedule = () =>
    schedules.map((schedule, idx) => (
      <Fragment key={schedule.schedule_id}>
        {idx !== 0 && (
          <div className="w-8 h-10 flex justify-center">
            <S.VerticalLine />
          </div>
        )}
        <S.ScheduleContainer
          onClick={() => handleScheduleClick(schedule.schedule_id)}
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
    ));

  return schedules.length === 0 ? (
    <NoContentAnimation />
  ) : (
    <div className="overflow-y-auto h-full scrollBar flex">
      <div className="w-full h-fit p-4 m-auto">{renderSchedule()}</div>
    </div>
  );
}

export default DailyCalendar;
