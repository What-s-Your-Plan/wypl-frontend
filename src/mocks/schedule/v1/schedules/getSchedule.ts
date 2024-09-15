import { http, HttpResponse, RequestHandler } from 'msw';

import { SCHEDULE } from '@/api/endpoint.ts';
import { GetReviewScheduleResponse } from '@/api/schedule/getReviewSchedule.ts';

const response: BaseResponse<GetReviewScheduleResponse> = {
  message: '간략 일정 조회 성공',
  body: {
    schedule_id: 0,
    start_date: '2024-04-26T11:00:00',
    end_date: '2024-04-27T12:00:00',
    group_id: 1,
    label: {
      id: 1,
      category: 'MEMBER',
      title: '알고리즘 스터디',
      color: 'labelCharcoal',
    },
    member_count: 2,
    title: '알고리즘 스터디',
    category: 'GROUP',
    members: [
      {
        member_id: 1,
        profile_image: null,
        nickname: '좌랑둥이',
      },
      {
        member_id: 2,
        profile_image: null,
        nickname: '댬니',
      },
    ],
  },
};

const getSchedule: RequestHandler = http.get(
  new RegExp(`http://localhost:8080${SCHEDULE.V1.SCHEDULES.BASE}/\\d`),
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getSchedule;
