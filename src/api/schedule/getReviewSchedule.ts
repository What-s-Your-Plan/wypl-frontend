import { axiosWithAccessToken } from '../axios.ts';

import { SCHEDULE } from '@/api/endpoint.ts';

/* Request */
export type GetReviewSchedulePathVariable = {
  scheduleId: number;
};

/* Response */
export type GetReviewScheduleResponse = ScheduleInfoData;

/* API */
export const getReviewSchedule = async ({
  scheduleId,
}: GetReviewSchedulePathVariable) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetReviewScheduleResponse>
  >(`${SCHEDULE.V1.SCHEDULES.BASE}/${scheduleId}`);

  return data;
};

export default getReviewSchedule;
