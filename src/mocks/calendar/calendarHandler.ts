import { RequestHandler } from 'msw';

import getCalendars from '@/mocks/calendar/v1/calendars/getCalendars.ts';
import getGroupCalendars from '@/mocks/calendar/v1/calendars/getGroupCalednars.ts';

export const calendarHandler: RequestHandler[] = [
  getCalendars,
  getGroupCalendars,
];
