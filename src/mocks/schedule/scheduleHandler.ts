import { RequestHandler } from 'msw';

import getScheduleDetail from '@/mocks/schedule/v1/schedules/detail/getScheduleDetail.ts';
import getSchedule from '@/mocks/schedule/v1/schedules/getSchedule.ts';

export const scheduleHandler: RequestHandler[] = [
  getScheduleDetail,
  getSchedule,
];
