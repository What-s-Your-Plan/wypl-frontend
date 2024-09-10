import { axiosWithAccessToken } from '../axios.ts';

import {
  CalendarParams,
  CalendarPathVariable,
  CalendarsResponse,
}                   from '@/api/calendar/getCalendars.ts';
import { CALENDAR } from '@/api/endpoint.ts';

/* Request */
export type GroupCalendarPathVariable = CalendarPathVariable & {
  groupId: number;
};

export type GroupCalendarParams = CalendarParams;

/* Response */
export type GroupCalendarsResponse = CalendarsResponse;

/* API */
export const getGroupCalendars = async (
  { groupId, type }: GroupCalendarPathVariable,
  params: GroupCalendarParams,
) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GroupCalendarsResponse>
  >(`${CALENDAR.V1.CALENDARS.BASE}/${type}/${groupId}`, { params });

  return data;
};
