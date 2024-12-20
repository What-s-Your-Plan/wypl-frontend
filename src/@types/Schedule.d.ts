import { LabelColorType } from '@/styles/Theme';

type RepetitionCycle = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
type ScheduleCategory = 'MEMBER' | 'GROUP';

// FIXME: Label 인터페이스로 수정하기
type Label = {
  category: string;
  id: number;
  title: string;
  color: string;
};

type LabelResponse = {
  label_id: number;
  title: string;
  color: string;
};

export interface MemberData {
  member_id: number;
  nickname: string;
  profile_image: string;
}

type GroupResponse = {
  group_id: number; // 그룹의 인덱스
  color: string; // 헥사 코드(개인화된 그룹 색상)
  title: string; // 그룹 이름
};

export interface ScheduleData {
  scheduleId?: number;
  title: string; // 필수
  description: string; // 선택
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  startAMPM: string;
  endAMPM: string;
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  category: 'MEMBER' | 'GROUP'; // 개인: Member, 그룹: Group, 필수
  groupId: number | null;
  label: Label | null;
  members: Array<{ member_id: number }>; // 개인 일정은 한명만
  isRepetition: boolean; // 선택
}

type CalendarsResponse = {
  schedule_count: number; // 개인 일정의 총 개수
  schedules: Array<CalendarScheduleData>;
};

type ScheduleSimpleResponse = {
  schedule_id: number;
  title: string;
  start_date: string; //ex) "2024-04-16T15:00:00"
  end_date: string; //ex) "2024-04-16T17:00:00",
  category: string; //ex) "group"이거나 "member"
  group_id: number | null;
  label: Label | null;
  member_count: number;
  members: Member[]; //개인 일정일 경우 1명의 정보만 들어있다.
};

type FilterResponse = {
  category: string;
  id: number;
  title: string;
  color: string;
};

/* Data */
interface CalendarScheduleData {
  schedule_id: number; // 일정의 인덱스
  title: string;
  description: string;
  category: string;
  start_date: string; //ex) "2024-04-16T10:57:00"
  end_date: string; //ex) "2024-04-16T10:57:00"
  label: LabelResponse | null;
  group: GroupResponse | null;
}

interface LabelFilterData {
  category: string;
  id: number;
  title: string;
  color: LabelColorType;
}

interface ScheduleSummaryData {
  schedule_id: number;
  title: string;
  start_date: string; //ex) "2024-04-16T15:00:00"
  end_date: string; //ex) "2024-04-16T17:00:00",
  category: string; //ex) "group"이거나 "member"
  group_id: number | null;
  label: Label | null;
  member_count: number;
  members: Member[]; //개인 일정일 경우 1명의 정보만 들어있다.
}

interface ScheduleDetailData {
  schedule_id: number;
  title: string;
  start_date: string; //ex) "2024-04-16T15:00:00"
  end_date: string; //ex) "2024-04-16T17:00:00",
  category: string;
  description: string | null;
  group_id: number | null;
  repetition: RepetitionDetailData | null;
  label: LabelResponse | null;
  member_count: number;
  members: Member[]; //개인 일정일 경우 1명의 정보만 들어
}

export interface RepeatData {
  repetitionCycle: string; // 필수
  week: number; // week일 경우 몇 주에 한번 반복할지, 선택
  dayOfWeek: number; // bit로 0100010와 같은 형태로, 선택
  day: number; //월 년도 반복일 경우, 선택
  month: number; // 년도 반복일 경우, 선택
  period: string; // 앤드 데이트 여부 필수
  endRDate: string; // 선택
}

interface RepetitionData {
  repetition_cycle: RepetitionCycle;
  repetition_start_date: string;
  repetition_end_date: string | null;
  day_of_week: number;
  week: number | null;
}

interface RepetitionDetailData extends RepetitionData {
  repetition_id: number;
}
