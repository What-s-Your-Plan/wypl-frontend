import { http, HttpResponse, RequestHandler } from 'msw';

import { AUTH } from '@/api/endpoint.ts';

const response: BaseResponse<void> = {
  message: 'mock',
  body: undefined,
};

const logout: RequestHandler = http.delete(
  `http://localhost:8080${AUTH.V1.LOGOUT}`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default logout;
