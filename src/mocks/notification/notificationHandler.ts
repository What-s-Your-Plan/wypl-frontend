import { RequestHandler } from 'msw';

import getNotification from '@/mocks/notification/v1/notifications/getNotification.ts';

export const notificationHandler: RequestHandler[] = [getNotification];
