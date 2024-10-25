import { http, HttpResponse, RequestHandler } from 'msw';

import { GROUP } from '@/api/endpoint.ts';
import { GetGroupMembersResponse } from '@/api/group/getGroupMember.ts';

const response: BaseResponse<GetGroupMembersResponse> = {
  body: {
    color: 'brown',
    member_count: 3,
    members: [
      {
        email: 'jiwons0803@naver.com',
        id: 1,
        is_accepted: false,
        nickname: '지롱이',
        profile_image: undefined,
      },
      {
        email: 'workju1124@gmail.com',
        id: 2,
        is_accepted: false,
        nickname: '김세이',
        profile_image: undefined,
      },
      {
        email: 'thdus981005@naver.com',
        id: 3,
        is_accepted: true,
        nickname: '좌랑둥이',
        profile_image: undefined,
      },
    ],
  },
  message: '그룹 조회에 성공했습니다.',
};

const getMemberGroup: RequestHandler = http.get(
  new RegExp(`http://localhost:8080${GROUP.V1.GROUPS.BASE}/\\d`),
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getMemberGroup;
