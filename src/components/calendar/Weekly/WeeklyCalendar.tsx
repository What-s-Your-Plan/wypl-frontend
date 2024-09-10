import { useCallback, useEffect, useState } from 'react';

import { LScheduleContainer } from './WeeklyCalendar.styled';
import WeeklyDays from './WeeklyDays';
import WeeklyHorizontal from './WeeklyHorizontal';
import WeeklyLSchedules from './WeeklyLSchedules';
import WeeklySchedules from './WeeklySchedules';
import WeeklyVertical from './WeeklyVertical';
import { Chevrons } from '../DatePicker.styled';

import {
  CalendarParams,
  CalendarPathVariable,
  CalendarsResponse,
  getCalendars,
}                  from '@/api/calendar/getCalendars.ts';
import {
  getGroupCalendars,
  GroupCalendarPathVariable,
}                  from '@/api/calendar/getGroupCalendars.ts';
import ChevronLeft from '@/assets/icons/chevronLeft.svg';
import ChevronRight from '@/assets/icons/chevronRight.svg';
import useDateStore from '@/stores/DateStore';
import {
  dateToString,
  getDateDiff,
  isSameDay,
  stringToDate,
  isAllday,
} from '@/utils/DateUtils';
import { labelFilter } from '@/utils/FilterUtils';

export type LongSchedule = {
  schedule: CalendarScheduleData;
  startDay: number;
  row: number;
  period: number;
};

type WeeklyProps = {
  category: 'MEMBER' | 'GROUP';
  groupId?: number;
  needUpdate: boolean;
  setUpdateFalse: () => void;
  handleSkedClick: (id: number) => void;
};

function WeeklyCalendar({
  category,
  groupId,
  needUpdate,
  setUpdateFalse,
  handleSkedClick,
}: WeeklyProps) {
  const { selectedDate, setSelectedDate, selectedLabels } = useDateStore();
  const [firstDay, setFirstDay] = useState<Date | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [originSked, setOriginSked] = useState<Array<CalendarScheduleData>>([]);
  const [longSchedules, setLongSchedules] = useState<Array<LongSchedule>>([]);
  const [schedules, setSchedules] = useState<Array<CalendarScheduleData>>([]);

  const handleNextWeek = () => {
    const nextWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 7,
    );

    setSelectedDate(nextWeek);
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - 7,
    );

    setSelectedDate(prevWeek);
  };

  const updateInfo = useCallback(async () => {
    const calendarPathVariable: CalendarPathVariable = {
      type: 'WEEK',
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
    if (firstDay) {
      const bitArray = [0, 0, 0, 0, 0, 0, 0];
      const newLong: Array<LongSchedule> = [];
      const newSchedule: Array<CalendarScheduleData> = [];
      let maxIdx: number = 0;

      for (const sked of labelFilter(originSked, selectedLabels)) {
        const startDate = stringToDate(sked.start_date);
        const endDate = stringToDate(sked.end_date);
        const period = getDateDiff(
          firstDay > startDate ? firstDay : startDate,
          sked.end_date,
        );
        const startDay = startDate < firstDay ? 0 : startDate.getDay();

        if (period > 0 || isAllday(startDate, endDate)) {
          const maxPeriod = Math.min(6 - startDay, period);
          let row: number | null = null;
          let i = 0;
          for (let p = 0; p <= maxPeriod; p++) {
            while (row === null) {
              if (!(bitArray[startDay + p] & (1 << i))) {
                row = i;
                break;
              }
              i += 1;
            }

            maxIdx = Math.max(maxIdx, row!);
            bitArray[startDay + p] = bitArray[startDay + p] | (1 << i);
          }
          newLong.push({
            schedule: sked,
            startDay,
            row: row as number,
            period: maxPeriod,
          });
        } else if (period === 0) {
          newSchedule.push(sked);
        }
      }
      setLongSchedules(newLong);
      setSchedules(newSchedule);
      setHeight(maxIdx);
    }
  }, [originSked, selectedLabels]);

  useEffect(() => {
    const newFirst = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - selectedDate.getDay(),
    );
    if (firstDay === null || !isSameDay(firstDay, newFirst)) {
      setFirstDay(newFirst);

      updateInfo();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (needUpdate && firstDay) {
      updateInfo();
      setUpdateFalse();
    }
  }, [needUpdate]);

  useEffect(() => {
    filteredSked();
  }, [filteredSked]);

  const renderHeader = () => {
    if (firstDay) {
      const lastDay: Date = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay?.getDate() + 6,
      );

      const pre = `${firstDay.getFullYear()}.${firstDay.getMonth() + 1}`;
      const suf = () => {
        if (firstDay.getFullYear() !== lastDay.getFullYear()) {
          return ` ~ ${lastDay.getFullYear()}.1`;
        } else if (firstDay.getMonth() !== lastDay.getMonth()) {
          return ` ~ ${lastDay.getMonth() + 1}`;
        }
        return '';
      };
      return `${pre}${suf()}`;
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-2">
        <h1 className="text-lg font-bold leading-6 text-default-black">
          <time dateTime={dateToString(selectedDate)}>{renderHeader()}</time>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              handlePrevWeek();
            }}
          >
            <span className="sr-only">Prev week</span>
            <Chevrons src={ChevronLeft} alt="prev-week" aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              handleNextWeek();
            }}
          >
            <span className="sr-only">Next week</span>
            <Chevrons src={ChevronRight} alt="next-week" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="isolate flex flex-auto flex-col scrollBar overflow-auto bg-white">
        <div
          style={{ width: '165%' }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div className="sticky top-0 z-30">
            <WeeklyDays firstDay={firstDay} />
            <LScheduleContainer $height={height + 1}>
              <WeeklyVertical />
              <WeeklyLSchedules
                lSchedules={longSchedules}
                row={height + 1}
                handleSkedClick={handleSkedClick}
              />
            </LScheduleContainer>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white border-r border-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Vertical lines */}
              <WeeklyVertical />

              {/* Horizontal lines */}
              <WeeklyHorizontal />

              {/* Schedules */}
              <WeeklySchedules
                schedules={schedules}
                handleSkedClick={handleSkedClick}
              />

              {/* LongSchedules */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyCalendar;
