import { useState } from 'react';

export interface TimeInputProps {}

export interface TimeDate {
  meridiem: 'AM' | 'PM';
  hour: number;
  minute: number;
}

function TimeInput() {
  const [data] = useState<TimeDate>({
    meridiem: 'AM',
    hour: 1,
    minute: 0,
  });

  console.log(data);
}

export default TimeInput;
