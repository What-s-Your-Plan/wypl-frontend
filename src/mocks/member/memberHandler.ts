import { RequestHandler } from 'msw';

import getMemberProfile from '@/mocks/member/v1/members/getMemberProfile.ts';
import getMemberByEmail from '@/mocks/member/v1/members/getMemberByEmail.ts';

export const memberHandler: RequestHandler[] = [
  getMemberProfile,
  getMemberByEmail,
];
