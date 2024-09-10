import { axiosWithAccessToken } from '../../../axios.ts';

import { CALENDAR } from '@/api/endpoint.ts';

export const getGroupCalendars = async (
  type: string,
  groupId: number,
  date: string,
) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<CalendarsResponse>
  >(`${CALENDAR.V1.CALENDARS.BASE}/${type}/${groupId}?date=${date}`);

  return data;
};
