import { http, HttpResponse, RequestHandler } from 'msw';

import { GroupCalendarsResponse } from '@/api/calendar/getGroupCalendars.ts';
import { CALENDAR } from '@/api/endpoint.ts';
import { dateTimeToString } from '@/utils/DateUtils.ts';

const createDate = (date: Date, day: number, hours: number): string => {
  date.setDate(date.getDate() + day);
  date.setHours(date.getHours() + hours);
  return dateTimeToString(date);
};

const response: BaseResponse<GroupCalendarsResponse> = {
  message: '개인 페이지 달력 조회 성공',
  body: {
    schedule_count: 1,
    schedules: [
      {
        schedule_id: 2,
        start_date: createDate(new Date(), 0, 0),
        end_date: createDate(new Date(), 0, 1),
        title: 'MSW: 알고리즘 스터디',
        description: '하루에 한문제씩 풀기',
        category: 'GROUP',
        label: null,
        group: {
          group_id: 1,
          color: 'labelBlue',
          title: 'study group',
        },
      },
    ],
  },
};

const getGroupCalendars: RequestHandler = http.get(
  new RegExp(
    `http://localhost:8080${CALENDAR.V1.CALENDARS.BASE}/(DAY|WEEK|MONTH)/1`,
  ),
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getGroupCalendars;
