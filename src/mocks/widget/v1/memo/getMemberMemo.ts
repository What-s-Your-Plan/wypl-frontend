import { http, HttpResponse, RequestHandler } from 'msw';

import { SIDE } from '@/api/endpoint.ts';
import { GetMemberMemoResponse } from '@/api/widget/getMemberMemo.ts';

const response: BaseResponse<GetMemberMemoResponse> = {
  message: '메모를 조회했습니다.',
  body: {
    memo: 'MSW: 와플을 개발하여 출시를 목표로!'
  },
};

const getMemberMemo: RequestHandler = http.get(
  `http://localhost:8080${SIDE.V1.MEMO}/1`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getMemberMemo;
