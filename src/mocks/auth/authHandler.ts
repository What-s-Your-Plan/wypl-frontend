import { RequestHandler } from 'msw';

import mockSignIn from '@/mocks/auth/v1/sign-in/mock/mockSignIn.ts';

export const authHandler: RequestHandler[] = [mockSignIn];
