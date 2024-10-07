import { useEffect, useState, useCallback } from 'react';

import MonthlyDay from './MonthlyDay';
import { Chevrons } from '../DatePicker/DatePicker.styled.ts';

import {
  CalendarParams,
  CalendarPathVariable,
  getCalendars,
} from '@/api/calendar/getCalendars.ts';
import {
  getGroupCalendars,
  GroupCalendarPathVariable,
} from '@/api/calendar/getGroupCalendars.ts';
import ChevronLeft from '@/assets/icons/chevronLeft.svg';
import ChevronRight from '@/assets/icons/chevronRight.svg';
import useDateStore from '@/stores/DateStore';
import {
  isSameDay,
  isCurrentMonth,
  getDateDiff,
  dateToString,
} from '@/utils/DateUtils';
import { labelFilter } from '@/utils/FilterUtils';

export type DateSchedule = Array<Array<CalendarScheduleData>>;

export interface MonthlyProps {
  /** 선택한 달력의 카테고리 (개인 또는 그룹) */
  category: 'MEMBER' | 'GROUP';
  /** 그륩 뷰일 때 그룹 ID */
  groupId?: number;
  /** 일정 갱신이 필요한지 여부 */
  needUpdate: boolean;
  /** 일정 갱신 상태를 리셋하는 함수 */
  setUpdateFalse: () => void;
  /** 일정 클릭 시 실행되는 함수 */
  handleScheduleClick: (id: number) => void;
  /** 일별 달력으로 변경 */
  switchDayCalendarTypeHandler: () => void;
}

function MonthlyCalender({
  category,
  groupId,
  needUpdate,
  setUpdateFalse,
  handleScheduleClick,
  switchDayCalendarTypeHandler,
}: MonthlyProps) {
  const createInit = (): Array<DateSchedule> =>
    Array.from({ length: 42 }, () => [[], [], []]);

  const { selectedDate, setSelectedDate, selectedLabels } = useDateStore();
  const [originSchedule, setOriginSchedule] = useState<
    Array<CalendarScheduleData>
  >([]);
  const [monthSchedules, setMonthSchedules] =
    useState<Array<DateSchedule>>(createInit());
  const [firstDay, setFirstDay] = useState<Date | null>(null);

  const updateSelectedDate = (monthOffset: number) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + monthOffset,
      selectedDate.getDate(),
    );
    setSelectedDate(newDate);
  };

  const updateInfo = useCallback(async () => {
    const calendarPathVariable: CalendarPathVariable = { type: 'MONTH' };
    const calendarParams: CalendarParams = { date: dateToString(selectedDate) };

    const fetchData = async () => {
      if (category === 'MEMBER') {
        const data = await getCalendars(calendarPathVariable, calendarParams);
        return data.body?.schedules || [];
      } else if (category === 'GROUP' && groupId) {
        const groupCalendarPathVariable: GroupCalendarPathVariable = {
          type: 'DAY',
          groupId,
        };
        const data = await getGroupCalendars(
          groupCalendarPathVariable,
          calendarParams,
        );
        return data.body?.schedules || [];
      }
      return [];
    };

    const schedules = await fetchData();
    setOriginSchedule(schedules);
  }, [selectedDate, groupId, category]);

  useEffect(() => {
    updateInfo();
  }, [groupId, updateInfo]);

  const filteredSchedule = useCallback(() => {
    if (!firstDay) return;

    const init = createInit();

    labelFilter(originSchedule, selectedLabels).forEach((schedule) => {
      const idx = Math.max(getDateDiff(firstDay, schedule.start_date), 0);
      const period =
        getDateDiff(schedule.start_date, schedule.end_date) - Math.max(-idx, 0);

      let row: number | null = null;
      for (let p = 0; p <= period && idx + p < 42; p++) {
        if (row === null) {
          row = init[idx + p].findIndex((r) => r.length === 0);
          row = row === -1 ? 2 : row;
        }
        init[idx + p][row].push(schedule);
      }
    });

    setMonthSchedules(init);
  }, [originSchedule, selectedLabels, firstDay]);

  useEffect(() => {
    const newFirst = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    newFirst.setDate(newFirst.getDate() - newFirst.getDay());
    if (!firstDay || !isSameDay(firstDay, newFirst)) {
      setFirstDay(newFirst);
      updateInfo();
      setUpdateFalse();
    }
  }, [selectedDate, firstDay, updateInfo, setUpdateFalse]);

  useEffect(() => {
    if (needUpdate && firstDay) updateInfo();
  }, [needUpdate, firstDay, updateInfo]);

  useEffect(() => {
    filteredSchedule();
  }, [filteredSchedule]);

  const renderMonthly = useCallback(() => {
    if (!firstDay) return [];

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay.getDate() + i,
      );
      return (
        <MonthlyDay
          key={i}
          handleScheduleClick={handleScheduleClick}
          date={date}
          firstDay={firstDay}
          schedules={monthSchedules[i]}
          isCurrentMonth={isCurrentMonth(date, selectedDate.getMonth())}
          switchDayCalendarTypeHandler={switchDayCalendarTypeHandler}
        />
      );
    });
  }, [
    firstDay,
    monthSchedules,
    handleScheduleClick,
    selectedDate,
    switchDayCalendarTypeHandler,
  ]);

  return (
    /* Flex */
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between px-6 py-2">
        <h1 className="text-lg font-bold leading-6 text-default-black">
          {selectedDate.getFullYear()}.{selectedDate.getMonth() + 1}
        </h1>
        <div className="flex gap-4">
          <button onClick={() => updateSelectedDate(-1)}>
            <span className="sr-only">Prev month</span>
            <Chevrons src={ChevronLeft} alt="prev-month" aria-hidden="true" />
          </button>
          <button onClick={() => updateSelectedDate(1)}>
            <span className="sr-only">Next month</span>
            <Chevrons src={ChevronRight} alt="next-month" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="lg:flex lg:flex-auto lg:flex-col">
        {/* MonthlyCalendarHeaderGird 월간 달력에서 "일 월 화 수 목 금 토" 를 표시하는 헤더 */}
        <div className="grid grid-cols-7 gap-px text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
            <div
              key={i}
              className={`bg-transparent ${i === 0 ? 'text-label-red' : i === 6 ? 'text-label-blue' : ''}`}
            >
              <span className="sr-only sm:not-sr-only">{d}</span>
            </div>
          ))}
        </div>
        <div className="flex bg-transparent text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="w-full grid grid-cols-7 grid-rows-6">
            {renderMonthly()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyCalender;
