import { setupWorker } from 'msw/browser';

import { authHandler } from '@/mocks/auth/authHandler.ts';
import { memberHandler } from '@/mocks/member/memberHandler.ts';
import { todoHandler } from '@/mocks/todo/todoHandler.ts';
import { widgetHandler } from '@/mocks/widget/widgetHandler.ts';

export const worker = setupWorker(
  ...authHandler,
  ...memberHandler,
  ...todoHandler,
  ...widgetHandler,
);
