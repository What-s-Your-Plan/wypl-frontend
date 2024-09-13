/**
 * TODO: 추후 다른 패키지로 이동 가능성이 있어 보입니다. 상수들을 모아두는 곳 인데 로직이 들어있습니다.
 *
 * @param date  현재 시간
 */
const getRoundedHour = (date: Date) => {
  const minutes = date.getMinutes();
  let hour = date.getHours();

  // 30분 이상일 경우 한 시간 올림
  if (minutes > 0) {
    hour += 1;
  }

  // 24시간을 넘지 않도록 조정
  if (hour >= 24) {
    hour = 0;
  }

  return hour;
};

const now = new Date();
const startHour = getRoundedHour(now);
const endHour = (startHour + 1) % 24;

const initialSchedule: ScheduleData & RepeatData = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  isAllDay: true,
  startAMPM: startHour >= 12 ? 'PM' : 'AM',
  endAMPM: endHour >= 12 ? 'PM' : 'AM',
  startHour: startHour % 12 === 0 ? 12 : startHour % 12,
  endHour: endHour % 12 === 0 ? 12 : endHour % 12,
  startMinute: 0,
  endMinute: 0,
  category: 'MEMBER',
  groupId: null,
  label: null,
  members: [],
  isRepetition: false,
  repetitionCycle: '매일',
  week: 1,
  dayOfWeek: 0,
  day: 1,
  month: 1,
  period: '계속 반복',
  endRDate: '',
};

export default initialSchedule;
