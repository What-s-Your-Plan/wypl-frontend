import { http, HttpResponse, RequestHandler } from 'msw';

import { SIDE } from '@/api/endpoint.ts';
import { GetMemberDDayResponse } from '@/api/widget/getMemberDDay.ts';
import { dateTimeToString } from '@/utils/DateUtils.ts';

const date = new Date();
date.setDate(date.getDate() + 30);
const dateAsString = dateTimeToString(date);

const response: BaseResponse<GetMemberDDayResponse> = {
  message: '디데이를 조회했습니다.',
  body: {
    title: 'MSW: 30일',
    d_day: 'D-30',
    date: dateAsString,
    local_date: dateAsString,
  },
};

const getMemberDDay: RequestHandler = http.get(
  `http://localhost:8080${SIDE.V1.D_DAY}/1`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getMemberDDay;
