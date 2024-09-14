import { http, HttpResponse, RequestHandler } from 'msw';

import { MEMBER } from '@/api/endpoint.ts';
import { FindMemberByEmailResponse } from '@/api/member/getMemberbyEmail.ts';

const response: BaseResponse<FindMemberByEmailResponse> = {
  message: '사용자들을 조회했습니다.',
  body: {
    member_count: 6,
    members: [
      {
        id: 1,
        email: 'workju1124@gmail.com',
        nickname: '김세이',
        profile_image_url: undefined,
      },
      {
        id: 2,
        email: 'jdm080620@gmail.com',
        nickname: '댬니',
        profile_image_url: undefined,
      },
      {
        id: 3,
        email: 'thdus981005@naver.com',
        nickname: '좌랑둥이',
        profile_image_url: undefined,
      },
      {
        id: 4,
        email: 'hitobi1014@gmail.com',
        nickname: '모코코',
        profile_image_url: undefined,
      },
      {
        id: 5,
        email: 'leeji7031@gmail.com',
        nickname: '뚱이',
        profile_image_url: undefined,
      },
      {
        id: 6,
        email: 'jiwons0803@naver.com',
        nickname: '지롱이',
        profile_image_url: undefined,
      },
    ],
  },
};

const getMemberByEmail: RequestHandler = http.get(
  `http://localhost:8080${MEMBER.V1.MEMBERS.BASE}`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getMemberByEmail;
