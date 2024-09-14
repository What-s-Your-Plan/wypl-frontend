import { http, HttpResponse, RequestHandler } from 'msw';

import { MEMBER } from '@/api/endpoint.ts';
import { GetMemberProfileResponse } from '@/api/member/getMemberProfile.ts';

const response: BaseResponse<GetMemberProfileResponse> = {
  body: {
    email: 'wypl602@gmail.com',
    id: 1,
    main_color: 'labelBrown',
    nickname: '와플',
    profile_image_url: undefined,
  },
  message: '',
};

const getMemberProfile: RequestHandler = http.get(
  `http://localhost:8080${MEMBER.V1.MEMBERS.BASE}/1`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getMemberProfile;
