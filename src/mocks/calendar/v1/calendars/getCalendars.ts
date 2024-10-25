import { http, HttpResponse, RequestHandler } from 'msw';

import { CalendarsResponse } from '@/api/calendar/getCalendars.ts';
import { CALENDAR } from '@/api/endpoint.ts';
import { dateTimeToString } from '@/utils/DateUtils.ts';

const createDate = (date: Date, day: number, hours: number): string => {
  date.setDate(date.getDate() + day);
  date.setHours(date.getHours() + hours);
  return dateTimeToString(date);
};

const response: BaseResponse<CalendarsResponse> = {
  message: '개인 페이지 달력 조회 성공',
  body: {
    schedule_count: 2,
    schedules: [
      {
        schedule_id: 1,
        start_date: createDate(new Date(), 0, 0),
        end_date: createDate(new Date(), 1, 0),
        title: 'MSW: 테니스 가기',
        description: '장소 : 신촌 테니스',
        category: 'MEMBER',
        label: null,
        group: null,
      },
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
          color: 'blue',
          title: 'study group',
        },
      },
      {
        schedule_id: 3,
        start_date: createDate(new Date(), 0, 0),
        end_date: createDate(new Date(), 0, 1),
        title: 'MSW: CS 스터디',
        description: 'CS 스터디',
        category: 'MEMBER',
        label: null,
        group: null,
      },
      {
        schedule_id: 4,
        start_date: createDate(new Date(), 0, 0),
        end_date: createDate(new Date(), 0, 1),
        title: 'MSW: 자기소개서 스터디',
        description: 'CS 스터디',
        category: 'MEMBER',
        label: null,
        group: null,
      },
    ],
  },
};

const getCalendars: RequestHandler = http.get(
  new RegExp(
    `http://localhost:8080${CALENDAR.V1.CALENDARS.BASE}/(DAY|WEEK|MONTH)`,
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

export default getCalendars;
