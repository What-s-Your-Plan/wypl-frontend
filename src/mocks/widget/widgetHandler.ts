import { RequestHandler } from 'msw';

import getMemberDDay from '@/mocks/widget/v1/d-day/getMemberDDay.ts';
import getMemberGoal from '@/mocks/widget/v1/goal/getMemberGoal.ts';
import getMemberMemo from '@/mocks/widget/v1/memo/getMemberMemo.ts';
import getWeathers from '@/mocks/widget/v1/weathers/getWeathers.ts';

export const widgetHandler: RequestHandler[] = [
  getMemberDDay,
  getMemberGoal,
  getMemberMemo,
  getWeathers,
];
