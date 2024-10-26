import { http, HttpResponse, RequestHandler } from 'msw';

import { SCHEDULE } from '@/api/endpoint.ts';
import { GetScheduleDetailResponse } from '@/api/schedule/getScheduleDetail.ts';

const response: BaseResponse<GetScheduleDetailResponse> = {
  body: {
    category: 'MEMBER',
    description: null,
    end_date: '2024-04-25T12:00:00',
    group_id: null,
    label: {
      label_id: 1,
      title: '알고리즘 스터디',
      color: 'blue',
    },
    member_count: 1,
    members: [
      {
        member_id: 1,
        profile_image: null,
        nickname: '좌랑둥이',
      },
    ],
    repetition: {
      repetition_id: 0,
      repetition_cycle: 'WEEK',
      repetition_start_date: '2024-04-25',
      repetition_end_date: '2025-04-25',
      day_of_week: 2,
      week: 1,
    },
    schedule_id: 0,
    start_date: '2024-04-25T11:00:00',
    title: '헬스장 가기',
  },
  message: '상세 일정 조회 성공',
};

const getScheduleDetail: RequestHandler = http.get(
  new RegExp(`http://localhost:8080${SCHEDULE.V1.SCHEDULES.DETAIL}/\\d`),
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getScheduleDetail;
