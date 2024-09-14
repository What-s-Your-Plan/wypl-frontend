import { setupWorker } from 'msw/browser';

import { authHandler } from '@/mocks/auth/authHandler.ts';
import { calendarHandler } from '@/mocks/calendar/calendarHandler.ts';
import { groupHandler } from '@/mocks/group/groupHandler.ts';
import { memberHandler } from '@/mocks/member/memberHandler.ts';
import { notificationHandler } from '@/mocks/notification/notificationHandler.ts';
import { todoHandler } from '@/mocks/todo/todoHandler.ts';
import { widgetHandler } from '@/mocks/widget/widgetHandler.ts';

export const worker = setupWorker(
  ...authHandler,
  ...calendarHandler,
  ...groupHandler,
  ...memberHandler,
  ...notificationHandler,
  ...todoHandler,
  ...widgetHandler,
);
