import { useState, useEffect } from 'react';

import * as S from './DatePicker.styled.ts';

import ChevronLeft from '@/assets/icons/chevronLeft.svg';
import ChevronRight from '@/assets/icons/chevronRight.svg';
import useDateStore from '@/stores/DateStore.ts';
import {
  padding0,
  isSameDay,
  isCurrentMonth,
  dateToString,
} from '@/utils/DateUtils.ts';

function DatePicker() {
  const { today, selectedDate, setSelectedDate } = useDateStore();
  const [currCalendar, setCurrCalendar] = useState<Date>(selectedDate);

  // 선택한 날짜의 월이 바뀌면 currCalendar 업데이트
  useEffect(() => {
    if (currCalendar.getMonth() !== selectedDate.getMonth()) {
      setCurrCalendar(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
      );
    }
  }, [selectedDate]);

  /**
   * 이전/다음 달 이동
   */
  const handleMonthChange = (months: number) => {
    setCurrCalendar(
      new Date(currCalendar.getFullYear(), currCalendar.getMonth() + months, 1),
    );
  };

  /**
   * 오늘로 이동
   */
  const goToday = () => {
    setSelectedDate(today);
    setCurrCalendar(today);
  };

  const renderCalendar = () => {
    const firstDay = new Date(
      currCalendar.getFullYear(),
      currCalendar.getMonth(),
      1,
    );
    firstDay.setDate(firstDay.getDate() - firstDay.getDay()); // 달력 시작일을 해당 월의 첫 번째 요일로 맞춤

    const calendar: Array<JSX.Element> = [];
    for (let gridIndex = 0; gridIndex < 42; gridIndex++) {
      const date = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay.getDate() + gridIndex,
      );
      const dateString = dateToString(date);

      calendar.push(
        <S.DateWrapper key={dateString} $idx={gridIndex}>
          <S.DateButton
            $isToday={isSameDay(date, today)}
            $isSelected={isSameDay(date, selectedDate)}
            $isCurrentMonth={isCurrentMonth(date, currCalendar.getMonth())}
            onClick={() => setSelectedDate(date)}
          >
            <time dateTime={dateString}>{date.getDate()}</time>
          </S.DateButton>
        </S.DateWrapper>,
      );
    }

    return calendar;
  };

  return (
    <div className="flex flex-col h-full justify-center">
      <S.Header>
        {currCalendar.getFullYear()}.{padding0(currCalendar.getMonth() + 1)}
      </S.Header>
      <div className="flex items-center justify-between mt-1">
        <button
          className="text-xs w-fit h-fit p-1 rounded-md border font-medium border-gray-500"
          onClick={goToday}
        >
          {/* TODO: `오늘`이 좋은지, `Today`가 좋은지 */}
          오늘
        </button>
        <div className="flex">
          <button
            type="button"
            className="flex flex-none items-center justify-center p-1"
            onClick={() => handleMonthChange(-1)}
          >
            <span className="sr-only">Previous month</span>
            <S.Chevrons
              src={ChevronLeft}
              alt="prev-month"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="flex flex-none items-center justify-center p-1"
            onClick={() => handleMonthChange(1)}
          >
            <span className="sr-only">Next month</span>
            <S.Chevrons
              src={ChevronRight}
              alt="next-month"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 text-sm">{renderCalendar()}</div>
    </div>
  );
}

export default DatePicker;
