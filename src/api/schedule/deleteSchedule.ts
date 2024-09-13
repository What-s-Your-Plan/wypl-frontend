import { axiosWithAccessToken } from '../axios';

import { SCHEDULE } from '@/api/endpoint.ts';

/* Request */
export type DeleteSchedulePathVariable = {
  scheduleId: number;
  modificationType: string;
};

/* Response */
export type DeleteScheduleResponse = {
  schedule_count: number;
  schedules: {
    schedule_id: number;
  };
};

/* API */
export const deleteSchedule = async ({
  scheduleId,
  modificationType,
}: DeleteSchedulePathVariable) => {
  const { data } = await axiosWithAccessToken.delete<
    BaseResponse<DeleteScheduleResponse>
  >(`${SCHEDULE.V1.SCHEDULES.BASE}/${scheduleId}/${modificationType}`);

  return data;
};

export default deleteSchedule;
