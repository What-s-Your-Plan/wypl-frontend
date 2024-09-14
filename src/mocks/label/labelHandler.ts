import { RequestHandler } from 'msw';

import getLabelList from '@/mocks/label/v1/labels/main/getLabelList.ts';

export const labelHandler: RequestHandler[] = [getLabelList];
