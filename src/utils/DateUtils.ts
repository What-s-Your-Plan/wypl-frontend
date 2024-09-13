function isCurrentMonth(date: Date, currMonth: number): boolean {
  return date.getMonth() === currMonth;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function dateToString(date: Date): string {
  return `${date.getFullYear()}-${padding0(date.getMonth() + 1)}-${padding0(date.getDate())}`;
}

function dateTimeToString(date: Date): string {
  return `${date.getFullYear()}-${padding0(date.getMonth() + 1)}-${padding0(date.getDate())}T${padding0(date.getHours())}:${padding0(date.getMinutes())}`;
}

function getHour(hour: number): number {
  return hour === 12 ? 0 : Number(hour);
}

function stringToDate(str: string): Date {
  return new Date(str);
}

function padding0(num: number) {
  return num.toString().padStart(2, '0');
}

function getDateDiff(d1: Date | string, d2: Date | string) {
  if (typeof d1 === 'string') {
    const sToD1 = stringToDate(d1);
    d1 = new Date(sToD1.getFullYear(), sToD1.getMonth(), sToD1.getDate());
  } else {
    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  }

  if (typeof d2 === 'string') {
    const sToD2 = stringToDate(d2);
    d2 = new Date(sToD2.getFullYear(), sToD2.getMonth(), sToD2.getDate());
  } else {
    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  }
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
}

function splitTTime(date: string) {
  if (date) {
    const result = date.split('T');
    return result[0] + ' ' + result[1].slice(0, result[1].length - 3);
  }
}

function isAllDay(start: Date, end: Date): boolean {
  return (
    start.getHours() === 0 &&
    start.getMinutes() === 0 &&
    end.getHours() === 23 &&
    end.getMinutes() === 59
  );
}

function getTime(date: string) {
  const time = date.split('T')[1].split(':');
  let hour = time[0];
  const minute = time[1];
  const ampm = Number(hour) >= 12 ? 'PM' : 'AM';
  hour = Number(hour) ? hour : '12';

  return `${ampm} ${hour}:${minute}`;
}

export {
  isCurrentMonth,
  isSameDay,
  dateToString,
  dateTimeToString,
  stringToDate,
  getHour,
  padding0,
  getDateDiff,
  splitTTime,
  isAllDay,
  getTime,
};
