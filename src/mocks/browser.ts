import { setupWorker } from 'msw/browser';

import { authHandler } from '@/mocks/auth/authHandler.ts';

export const worker = setupWorker(...authHandler);
