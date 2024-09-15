import { http, HttpResponse, RequestHandler } from 'msw';

import { GROUP } from '@/api/endpoint.ts';
import { MemberGroupsResponse } from '@/api/group/getMemberGroupList.ts';

const response: BaseResponse<MemberGroupsResponse> = {
  message: '회원의 그룹 전체 조회에 성공했습니다.',
  body: {
    group_count: 1,
    invited_group_count: 1,
    invited_groups: [
      {
        id: 1,
        name: 'work group',
        color: 'labelBlue',
        is_owner: false,
      },
    ],
    groups: [
      {
        id: 2,
        name: 'study group',
        color: 'labelYellow',
        is_owner: false,
      },
      {
        id: 3,
        name: 'project group',
        color: 'labelCharcoal',
        is_owner: true,
      },
    ],
  },
};

const getMemberGroupList: RequestHandler = http.get(
  `http://localhost:8080${GROUP.V1.GROUPS.MEMBER.BASE}`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getMemberGroupList;
