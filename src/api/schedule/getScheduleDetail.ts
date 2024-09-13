import { axiosWithAccessToken } from '../axios';

import { SCHEDULE } from '@/api/endpoint.ts';

/* Request */
export type GetScheduleDetailPathVariable = {
  scheduleId: number;
};

/* Response */
export type GetScheduleDetailResponse = ScheduleDetailData;

/* API */
export const getScheduleDetail = async ({
  scheduleId,
}: GetScheduleDetailPathVariable) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetScheduleDetailResponse>
  >(`${SCHEDULE.V1.SCHEDULES.DETAIL}/${scheduleId}`);

  return data;
};

export default getScheduleDetail;
