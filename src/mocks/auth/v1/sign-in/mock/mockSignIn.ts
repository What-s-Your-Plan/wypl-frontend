import { http, HttpResponse, RequestHandler } from 'msw';

import { IssueTokenResponse } from '@/api/auth/issueTokens.ts';
import { AUTH }               from '@/api/endpoint.ts';

const response: BaseResponse<IssueTokenResponse> = {
  message: 'mock',
  body: {
    member_id: 1,
    access_token: 'at',
    refresh_token: 'rt',
  },
};

const mockSingIn: RequestHandler = http.post(
  `http://localhost:8080${AUTH.V1.SIGN_IN.MOCK}`,
  () => {
    return HttpResponse.json(response, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default mockSingIn;
