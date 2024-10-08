import { useState, useEffect } from 'react';

import * as S from './DatePicker.styled.ts';

import ChevronLeft from '@/assets/icons/chevronLeft.svg';
import ChevronRight from '@/assets/icons/chevronRight.svg';
import Button from '@/components/Common/Button/Button.tsx';
import Tooltip from '@/components/Tooltip/Tooltip.tsx';
import useDateStore from '@/stores/DateStore.ts';
import {
  padding0,
  isSameDay,
  isCurrentMonth,
  dateToString,
  todayToString,
} from '@/utils/DateUtils.ts';

function DatePicker() {
  const { today, selectedDate, setSelectedDate } = useDateStore();
  const [currCalendar, setCurrCalendar] = useState<Date>(selectedDate);

  /**
   * 선택한 날짜의 월이 바뀌면 currentCalendar 업데이트
   */
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
    <S.Container>
      <S.Header>
        {currCalendar.getFullYear()}.{padding0(currCalendar.getMonth() + 1)}
      </S.Header>
      <S.ButtonFlex>
        <Tooltip
          text={todayToString()}
          children={<S.TodayButton onClick={goToday}>오늘</S.TodayButton>}
        />
        <S.ChevronButtonFlex>
          <Tooltip
            text={'전 달'}
            children={
              <Button
                styles={{ $size: 'circle', $variant: 'default' }}
                onClick={() => handleMonthChange(-1)}
                children={
                  <S.Chevrons
                    src={ChevronLeft}
                    alt="prev-month"
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                }
              />
            }
          />
          <Tooltip
            text={'다음 달'}
            children={
              <Button
                styles={{ $size: 'circle', $variant: 'default' }}
                onClick={() => handleMonthChange(1)}
                children={
                  <S.Chevrons
                    src={ChevronRight}
                    alt="next-month"
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                }
              />
            }
          />
        </S.ChevronButtonFlex>
      </S.ButtonFlex>
      <S.WeekHeader>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </S.WeekHeader>
      <S.CalendarGrid>{renderCalendar()}</S.CalendarGrid>
    </S.Container>
  );
}

export default DatePicker;
