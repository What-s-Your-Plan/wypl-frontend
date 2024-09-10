import { axiosWithAccessToken } from '@/api/axios.ts';
import { CALENDAR }             from '@/api/endpoint.ts';

/* Request */
export type CalendarPathVariable = {
  type: CalenderType;
};

export type CalendarParams = {
  date: string;
};

/* Response */
export type CalendarsResponse = {
  schedule_count: number;
  schedules: Array<CalendarSchedule>;
};

export const getCalendars = async (
  { type }: CalendarPathVariable,
  params: CalendarParams,
) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<CalendarsResponse>
  >(`${CALENDAR.V1.CALENDARS.BASE}/${type}`, { params });

  return data;
};
