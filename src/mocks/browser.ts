import { setupWorker } from 'msw/browser';

import { authHandler } from '@/mocks/auth/authHandler.ts';
import { widgetHandler } from '@/mocks/widget/widgetHandler.ts';

export const worker = setupWorker(...authHandler, ...widgetHandler);
