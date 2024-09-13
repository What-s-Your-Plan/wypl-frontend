import { axiosWithAccessToken } from '../axios';

import {
  getScheduleRequest,
  PostScheduleRequest,
} from '@/api/schedule/postSchedule.ts';

/* Request */
export type PutScheduleRequest = PostScheduleRequest;

/* Response */
export type PutScheduleResponse = ScheduleDetailData;

/* API */
export const putSchedule = async (schedule: ScheduleData & RepeatData) => {
  const request: PutScheduleRequest = getScheduleRequest(schedule);

  const { data } = await axiosWithAccessToken.put<
    BaseResponse<PutScheduleResponse>
  >(`/schedule/v1/schedules/${schedule.scheduleId}`, request);

  return data;
};
