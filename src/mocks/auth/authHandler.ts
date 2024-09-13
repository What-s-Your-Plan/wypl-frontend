import { RequestHandler } from 'msw';

import logout from '@/mocks/auth/v1/logout/logout.ts';
import mockSignIn from '@/mocks/auth/v1/sign-in/mock/mockSignIn.ts';

export const authHandler: RequestHandler[] = [mockSignIn, logout];
