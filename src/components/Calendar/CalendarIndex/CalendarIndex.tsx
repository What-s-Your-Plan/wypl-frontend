import { Dispatch, SetStateAction } from 'react';

import * as S from './CalendarIndex.styled.ts';

export interface IndexGroupProps {
  /** 현재 선택한 달력의 종류 */
  calendarType: CalenderType;
  /** 달력의 종류를 변경하는 함수 */
  setCalendarType: Dispatch<SetStateAction<CalenderType>>;
}

function CalendarIndex({ calendarType, setCalendarType }: IndexGroupProps) {
  // TODO:  추후 YEAR 타입도 추가 예정
  const calendarTypes: CalenderType[] = ['MONTH', 'WEEK', 'DAY'] as const;

  const handleClick = (type: (typeof calendarTypes)[number]) => () => {
    setCalendarType(type);
  };

  return (
    <S.Container>
      <S.Wrapper />
      {calendarTypes.map((type) => (
        <S.Button
          key={type}
          $isActive={calendarType === type}
          onClick={handleClick(type)}
        >
          {type.charAt(0) + type.slice(1).toLowerCase()}
        </S.Button>
      ))}
    </S.Container>
  );
}

export default CalendarIndex;
