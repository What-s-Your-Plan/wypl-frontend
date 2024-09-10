import { axiosWithAccessToken } from '@/api/axios.ts';
import { CALENDAR } from '@/api/endpoint.ts';

export const getCalendars = async (
  type: 'DAY' | 'WEEK' | 'MONTH',
  params: string,
) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<CalendarsResponse>
  >(`${CALENDAR.V1.CALENDARS.BASE}/${type}`, { params });

  return data;
};
