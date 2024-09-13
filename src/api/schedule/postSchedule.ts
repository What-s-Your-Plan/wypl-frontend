import { axiosWithAccessToken } from '@/api/axios';
import { dateTimeToString, getHour } from '@/utils/DateUtils';

/* Request */
export type PostScheduleRequest = {
  title: string;
  description: string;
  category: ScheduleCategory;
  group_id: number | null;
  label_id: number | null;
  start_date: string;
  end_date: string;
  repetition: RepetitionData;
  members: {
    member_id: number;
  }[];
};

/* Response */
export type PostScheduleResponse = ScheduleDetailData;

/* API */
export const postSchedule = async (schedule: ScheduleData & RepeatData) => {
  const request: PostScheduleRequest = getScheduleRequest(schedule);

  const { data } = await axiosWithAccessToken.post<
    BaseResponse<PostScheduleResponse>
  >('/schedule/v1/schedules', request);

  return data;
};

export function getScheduleRequest(schedule: ScheduleData & RepeatData) {
  const {
    title,
    description,
    category,
    groupId,
    label,
    startDate,
    endDate,
    isAllDay,
    startHour,
    endHour,
    startAMPM,
    endAMPM,
    startMinute,
    endMinute,
    members,
  } = schedule;

  const formattedDescription = description.length > 0 ? description : '';
  const group_id = category === 'GROUP' ? groupId : null;
  const label_id = category === 'MEMBER' && label ? label.id : null;

  const scheduleStartDate = new Date(startDate);
  const scheduleEndDate = new Date(endDate);
  if (isAllDay) {
    scheduleStartDate.setHours(0, 0); // 자정으로 설정
    scheduleEndDate.setHours(23, 59); // 하루의 끝 시간으로 설정
  } else {
    const adjustedStartHour =
      getHour(startHour) + (startAMPM === 'PM' ? 12 : 0);
    const adjustedEndHour = getHour(endHour) + (endAMPM === 'PM' ? 12 : 0);

    scheduleStartDate.setHours(adjustedStartHour, startMinute);
    scheduleEndDate.setHours(adjustedEndHour, endMinute);
  }
  const start_date = dateTimeToString(scheduleStartDate);
  const end_date = dateTimeToString(scheduleEndDate);

  const memberIds = members.map(({ member_id }) => ({ member_id }));
  const repetition = getRepetition(schedule);

  const request: PostScheduleRequest = {
    title,
    category,
    repetition,
    group_id,
    label_id,
    members: memberIds,
    description: formattedDescription,
    start_date,
    end_date,
  };
  return request;
}

/**
 * 입력한 데이터에서 반복 주기 정보를 가져옵니다.
 *  TODO: PutMapping 에서도 사용되므로 어떤 패키지로 옮기면 좋을지 고민해봅니다.
 *
 * @param schedule  사용자가 입력한 일정 정보
 */
export function getRepetition(
  schedule: ScheduleData & RepeatData,
): RepetitionData {
  const endRepetitionDate =
    schedule.period === '종료 날짜' ? schedule.endRDate : null;

  const baseRepetitionData: RepetitionData = {
    repetition_cycle: 'YEAR',
    repetition_start_date: schedule.startDate,
    repetition_end_date: endRepetitionDate,
    day_of_week: 0,
    week: null,
  };

  switch (schedule.repetitionCycle) {
    case '매일':
      return {
        ...baseRepetitionData,
        repetition_cycle: 'WEEK',
        day_of_week: 2 ** 7 - 1, // 모든 요일
        week: 1,
      };
    case '매 주':
      return {
        ...baseRepetitionData,
        repetition_cycle: 'WEEK',
        day_of_week: schedule.dayOfWeek,
        week: schedule.week,
      };
    case '매 월':
      return {
        ...baseRepetitionData,
        repetition_cycle: 'MONTH',
      };
    default:
      return baseRepetitionData; // 'YEAR'에 해당
  }
}
