import { http, HttpResponse, RequestHandler } from 'msw';

import { SIDE } from '@/api/endpoint.ts';
import { GetMemberGoalResponse } from '@/api/widget/getMemberGoal.ts';

const response: BaseResponse<GetMemberGoalResponse> = {
  message: '목표를 조회했습니다.',
  body: {
    goal_id: 1,
    content: 'MSW: 와플을 개발하여 출시를 목표로!',
  },
};

const getMemberGoal: RequestHandler = http.get(
  `http://localhost:8080${SIDE.V1.GOAL}/1`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getMemberGoal;
